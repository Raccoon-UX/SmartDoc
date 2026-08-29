export type VaultCategory =
  | 'identity'
  | 'financial'
  | 'insurance'
  | 'investments'
  | 'transport'
  | 'property'
  | 'education'
  | 'employment'
  | 'health'
  | 'travel'
  | 'civic'
  | 'certificates'
  | 'business'
  | 'schemes'
  | 'other';

export interface VaultDocument {
  id: string;
  userId: string;
  name: string;
  category: VaultCategory | string;
  documentType: string;
  description?: string;
  filePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadDocumentPayload {
  name: string;
  category: VaultCategory | string;
  description?: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  notes?: string;
  file: File;
}

export interface VaultStats {
  totalDocuments: number;
  categoriesCount: number;
  totalStorageBytes: number;
  recentUploadsCount: number;
}

export type VaultSortOption = 'recent' | 'name-asc' | 'name-desc' | 'updated';

export interface VaultFilterState {
  query: string;
  category: string; // 'all' or specific VaultCategory
  sort: VaultSortOption;
}
