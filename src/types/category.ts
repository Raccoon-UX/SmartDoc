export type CategoryId = 
  | 'all' 
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
  | 'schemes';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count?: number;
}
