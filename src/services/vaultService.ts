import { supabase } from '../lib/supabase';
import { VaultDocument, UploadDocumentPayload, VaultFilterState, VaultStats } from '../types/vault';
import { validateDocumentFile, buildStorageFilePath } from '../lib/fileValidation';

const STORAGE_BUCKET = 'user-documents';

/**
 * Fetch all documents belonging to the authenticated user.
 */
export async function fetchUserDocuments(
  userId: string,
  filters?: Partial<VaultFilterState>
): Promise<VaultDocument[]> {
  let query = supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId);

  // Category filter
  if (filters?.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }

  // Sorting
  if (filters?.sort) {
    switch (filters.sort) {
      case 'name-asc':
        query = query.order('name', { ascending: true });
        break;
      case 'name-desc':
        query = query.order('name', { ascending: false });
        break;
      case 'updated':
        query = query.order('updated_at', { ascending: false });
        break;
      case 'recent':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching vault documents:', error.message);
    throw new Error(error.message);
  }

  let docs: VaultDocument[] = (data || []).map(mapDbRecordToVaultDoc);

  // Client-side text search (matches name, description, notes, issuingAuthority)
  if (filters?.query && filters.query.trim()) {
    const q = filters.query.trim().toLowerCase();
    docs = docs.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.issuingAuthority?.toLowerCase().includes(q) ||
        d.notes?.toLowerCase().includes(q)
    );
  }

  return docs;
}

/**
 * Securely uploads a document file to private storage and writes metadata to database.
 */
export async function uploadVaultDocument(
  userId: string,
  payload: UploadDocumentPayload
): Promise<VaultDocument> {
  // 1. Validate File
  const validation = validateDocumentFile(payload.file);
  if (!validation.isValid || !validation.sanitizedName) {
    throw new Error(validation.error || 'Invalid file.');
  }

  const docId = crypto.randomUUID();
  const filePath = buildStorageFilePath(userId, docId, validation.sanitizedName);

  // 2. Upload file to private storage bucket
  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, payload.file, {
      cacheControl: '3600',
      upsert: false,
      contentType: validation.mimeType,
    });

  if (uploadError) {
    console.error('Storage upload failed:', uploadError.message);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // 3. Determine documentType
  const mime = validation.mimeType || payload.file.type;
  const docType = mime.includes('pdf') ? 'pdf' : mime.includes('image') ? 'image' : 'other';

  // 4. Insert metadata row in PostgreSQL database
  const insertData = {
    id: docId,
    user_id: userId,
    name: payload.name.trim() || validation.sanitizedName,
    category: payload.category || 'other',
    document_type: docType,
    description: payload.description?.trim() || null,
    file_path: filePath,
    file_name: validation.sanitizedName,
    file_size: payload.file.size,
    mime_type: mime,
    issue_date: payload.issueDate || null,
    expiry_date: payload.expiryDate || null,
    issuing_authority: payload.issuingAuthority?.trim() || null,
    notes: payload.notes?.trim() || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data: dbData, error: dbError } = await supabase
    .from('documents')
    .insert(insertData)
    .select()
    .single();

  if (dbError) {
    console.error('Database record creation failed, rolling back uploaded file:', dbError.message);
    // Cleanup uploaded storage object to prevent orphans
    await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
    throw new Error(`Failed to save document metadata: ${dbError.message}`);
  }

  return mapDbRecordToVaultDoc(dbData);
}

/**
 * Generates a short-lived temporary signed URL (e.g. 5 minutes) for secure viewing.
 */
export async function getSignedDocumentUrl(
  filePath: string,
  expiresInSeconds: number = 300
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error) {
    console.error('Failed to create signed URL:', error.message);
    throw new Error(error.message);
  }

  return data.signedUrl;
}

/**
 * Downloads document data as a Blob directly via authenticated storage API.
 */
export async function downloadVaultDocumentBlob(filePath: string): Promise<Blob> {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .download(filePath);

  if (error) {
    console.error('Failed to download document:', error.message);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Renames a document's display name in database metadata.
 */
export async function renameVaultDocument(
  documentId: string,
  userId: string,
  newName: string
): Promise<void> {
  const trimmed = newName.trim();
  if (!trimmed) {
    throw new Error('Document name cannot be empty.');
  }

  const { error } = await supabase
    .from('documents')
    .update({
      name: trimmed,
      updated_at: new Date().toISOString(),
    })
    .eq('id', documentId)
    .eq('user_id', userId);

  if (error) {
    console.error('Failed to rename document:', error.message);
    throw new Error(error.message);
  }
}

/**
 * Deletes a document from both the PostgreSQL database and private Storage bucket.
 */
export async function deleteVaultDocument(
  documentId: string,
  userId: string,
  filePath: string
): Promise<void> {
  // 1. Delete database record
  const { error: dbError } = await supabase
    .from('documents')
    .delete()
    .eq('id', documentId)
    .eq('user_id', userId);

  if (dbError) {
    console.error('Failed to delete document from database:', dbError.message);
    throw new Error(dbError.message);
  }

  // 2. Delete storage file
  const { error: storageError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([filePath]);

  if (storageError) {
    console.warn('Storage file deletion warning:', storageError.message);
  }
}

/**
 * Calculates aggregate stats for user dashboard.
 */
export async function getUserVaultStats(userId: string): Promise<VaultStats> {
  const { data, error } = await supabase
    .from('documents')
    .select('id, category, file_size, created_at')
    .eq('user_id', userId);

  if (error || !data) {
    return {
      totalDocuments: 0,
      categoriesCount: 0,
      totalStorageBytes: 0,
      recentUploadsCount: 0,
    };
  }

  const totalDocuments = data.length;
  const categoriesSet = new Set(data.map((d) => d.category));
  const totalStorageBytes = data.reduce((acc, curr) => acc + (Number(curr.file_size) || 0), 0);

  // Recent uploads in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentUploadsCount = data.filter(
    (d) => new Date(d.created_at) >= thirtyDaysAgo
  ).length;

  return {
    totalDocuments,
    categoriesCount: categoriesSet.size,
    totalStorageBytes,
    recentUploadsCount,
  };
}

/**
 * Helper to map snake_case database records to camelCase VaultDocument.
 */
function mapDbRecordToVaultDoc(r: any): VaultDocument {
  return {
    id: r.id,
    userId: r.user_id,
    name: r.name,
    category: r.category,
    documentType: r.document_type,
    description: r.description || undefined,
    filePath: r.file_path,
    fileName: r.file_name,
    fileSize: Number(r.file_size) || 0,
    mimeType: r.mime_type,
    issueDate: r.issue_date || undefined,
    expiryDate: r.expiry_date || undefined,
    issuingAuthority: r.issuing_authority || undefined,
    notes: r.notes || undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}
