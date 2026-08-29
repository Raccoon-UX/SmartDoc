import { CategoryId } from './category';
import { ServiceType } from './service';

export interface DocumentOfficialPlatform {
  name: string;
  portalName: string;
  authorityName: string;
  url: string;
  isVerified: boolean;
  isStateSpecific?: boolean;
  stateNote?: string;
  securityNote?: string;
}

export interface Document {
  id: string;
  name: string;
  code: string;
  category: CategoryId;
  badgeText?: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Lucide icon identifier
  isPopular: boolean;
  issuingAuthority: string;
  estimatedProcessingTime: string;
  feeRange: string;
  eligibility: string[];
  keyUses: string[];
  availableServiceIds: string[];
  relatedDocumentIds: string[];
  officialPlatform: DocumentOfficialPlatform;
  validityPeriod?: string;
  acceptanceLevel?: 'National' | 'State' | 'International';
  keywords?: string[];
  serviceTypes?: ServiceType[];
  supportsStateSpecific?: boolean;
}
