export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_FILE_SIZE_MB = 10;

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/jpg',
];

export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

export const BLOCKED_EXTENSIONS = [
  '.exe',
  '.bat',
  '.cmd',
  '.msi',
  '.sh',
  '.js',
  '.vbs',
  '.ps1',
  '.php',
  '.py',
  '.html',
  '.htm',
  '.scr',
  '.dll',
];

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedName?: string;
  mimeType?: string;
}

/**
 * Validates file type, size, and security constraints.
 */
export function validateDocumentFile(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'No file selected.' };
  }

  // 1. File Size Check
  if (file.size <= 0) {
    return { isValid: false, error: 'The selected file is empty (0 bytes).' };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `File size exceeds the ${MAX_FILE_SIZE_MB}MB limit (Selected: ${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
    };
  }

  // 2. Extension Check
  const lowerName = file.name.toLowerCase();
  const hasBlockedExt = BLOCKED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  if (hasBlockedExt) {
    return {
      isValid: false,
      error: 'Executable and script files are strictly prohibited for security reasons.',
    };
  }

  const hasAllowedExt = ALLOWED_FILE_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  if (!hasAllowedExt) {
    return {
      isValid: false,
      error: 'Unsupported file format. Please upload a PDF, JPG, or PNG document.',
    };
  }

  // 3. MIME Type Check
  const effectiveMime = file.type || getFallbackMimeType(file.name);
  if (!ALLOWED_MIME_TYPES.includes(effectiveMime)) {
    return {
      isValid: false,
      error: `Unsupported MIME type (${effectiveMime}). Only PDF and Image documents are allowed.`,
    };
  }

  const sanitizedName = sanitizeFileName(file.name);

  return {
    isValid: true,
    sanitizedName,
    mimeType: effectiveMime,
  };
}

/**
 * Strips path traversal characters, unsafe symbols, and normalizes file name.
 */
export function sanitizeFileName(fileName: string): string {
  // Extract basename, eliminate any directory separators or path traversal
  const cleanBase = fileName
    .replace(/^.*[\\\/]/, '')
    .replace(/\.\./g, '')
    .trim();

  // Replace special characters except dots, hyphens, and underscores
  const safeName = cleanBase.replace(/[^a-zA-Z0-9.\-_]/g, '_');

  // Truncate to reasonable length (max 80 chars)
  if (safeName.length > 80) {
    const ext = safeName.substring(safeName.lastIndexOf('.'));
    return safeName.substring(0, 80 - ext.length) + ext;
  }

  return safeName || 'document';
}

/**
 * Builds isolated user storage path: <user_id>/<doc_id>/<filename>
 */
export function buildStorageFilePath(userId: string, docId: string, sanitizedFileName: string): string {
  return `${userId}/${docId}/${sanitizedFileName}`;
}

/**
 * Fallback MIME type deduction from file extension.
 */
function getFallbackMimeType(fileName: string): string {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.pdf')) return 'application/pdf';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  if (lower.endsWith('.png')) return 'image/png';
  return 'application/octet-stream';
}

/**
 * Formats byte count into human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
