export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  joinedDate: string;
  avatarUrl?: string;
  documentCount?: number;
}

export interface UserDocumentPreview {
  id: string;
  name: string;
  documentType: string;
  category: string;
  fileSize: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'expired' | 'active';
}
