import { CategoryId } from './category';
import { ServiceType } from './service';

export type AvailabilityFilter = 'all' | 'online' | 'physical';
export type FeeFilter = 'all' | 'free' | 'paid' | 'varies';
export type SpeedFilter = 'all' | 'instant' | 'standard' | 'extended';

export interface FilterState {
  query: string;
  category: CategoryId;
  serviceType: 'all' | ServiceType;
  availability: AvailabilityFilter;
  feeType: FeeFilter;
  speed: SpeedFilter;
  stateCode?: string;
}

export interface FacetCount {
  id: string;
  label: string;
  count: number;
}

export interface SearchSuggestion {
  id: string;
  title: string;
  subtitle: string;
  type: 'document' | 'service' | 'category';
  url: string;
  badge?: string;
  iconName?: string;
}
