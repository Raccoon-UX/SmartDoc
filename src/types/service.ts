export type ServiceType = 'creation' | 'updation' | 'renewal' | 'download' | 'verification' | 'replacement';

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
    isStateSpecific?: boolean;
    note?: string;
  };
  serviceType: ServiceType;
  fee: {
    amount: string;
    details?: string;
  };
  estimatedTime: string;
  isOnlineAvailable: boolean;
  relatedServiceIds?: string[];
}
