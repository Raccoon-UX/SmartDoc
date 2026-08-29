import { SourceTier, VerificationStatus } from './document';

export type ServiceType = 
  | 'creation' 
  | 'updation' 
  | 'renewal' 
  | 'download' 
  | 'verification' 
  | 'replacement';

export type ServiceFeeType = 'free' | 'paid' | 'varies';
export type ServiceSpeedBracket = 'instant' | 'standard' | 'extended';

export interface ServiceRequirement {
  id: string;
  title: string;
  description?: string;
  isMandatory: boolean;
  type: 'document' | 'biometric' | 'fee' | 'eligibility' | 'info';
}

export interface Service {
  id: string;
  documentId: string;
  name: string;
  shortDescription: string;
  purpose: string;
  detailedProcess: string[];
  requirements: ServiceRequirement[];
  requiredDocuments: string[];
  officialPlatform: {
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
    note?: string;
    securityNote?: string;
  };
  serviceType: ServiceType;
  fee: {
    amount: string;
    details?: string;
    feeType?: ServiceFeeType;
  };
  estimatedTime: string;
  speedBracket?: ServiceSpeedBracket;
  isOnlineAvailable: boolean;
  relatedServiceIds?: string[];
  keywords?: string[];
  applicableStates?: string[];
}
