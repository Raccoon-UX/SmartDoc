import { CategoryId } from './category';
import { ServiceType } from './service';

export type SourceTier = 'government' | 'statutory' | 'regulated_org' | 'private_provider';
export type ItemType = 'document' | 'service' | 'organization' | 'scheme' | 'utility';
export type VerificationStatus = 'verified' | 'pending' | 'unsupported';

export interface DocumentOfficialPlatform {
  name: string;
  portalName: string;
  authorityName: string;
  url: string;
  isVerified: boolean;
  sourceTier?: SourceTier;
  verificationStatus?: VerificationStatus;
  lastVerified?: string;
  isStateSpecific?: boolean;
  stateNote?: string;
  securityNote?: string;
  disclaimerType?: 'general' | 'financial' | 'health' | 'state_dependent';
}

export interface Document {
  id: string;
  name: string;
  code: string;
  category: CategoryId;
  itemType?: ItemType;
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
  organizationName?: string;
  financialDisclaimer?: string;
}
