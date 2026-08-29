export type CategoryId = 
  | 'all' 
  | 'identity' 
  | 'financial' 
  | 'travel' 
  | 'transport' 
  | 'civic' 
  | 'certificates';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count?: number;
}
