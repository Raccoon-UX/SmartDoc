import { Category } from '../types/category';

export const categories: Category[] = [
  {
    id: 'all',
    name: 'All Documents',
    slug: 'all',
    description: 'Browse all government and institutional document services available on SmartDoc.',
    iconName: 'LayoutGrid',
  },
  {
    id: 'identity',
    name: 'Identity',
    slug: 'identity',
    description: 'Primary national and state identification documents for residents and citizens.',
    iconName: 'Fingerprint',
  },
  {
    id: 'financial',
    name: 'Financial',
    slug: 'financial',
    description: 'Taxation, banking, and financial identity records required for economic activities.',
    iconName: 'CreditCard',
  },
  {
    id: 'travel',
    name: 'Travel',
    slug: 'travel',
    description: 'International travel passports, clearances, and consular verification documents.',
    iconName: 'Plane',
  },
  {
    id: 'transport',
    name: 'Transport',
    slug: 'transport',
    description: 'Motor vehicle driving licences, permits, and road transport certifications.',
    iconName: 'Car',
  },
  {
    id: 'civic',
    name: 'Civic',
    slug: 'civic',
    description: 'Electoral registration, voter cards, and civic participation credentials.',
    iconName: 'Vote',
  },
  {
    id: 'certificates',
    name: 'Certificates',
    slug: 'certificates',
    description: 'Vital records including birth, marriage, and statutory municipal certificates.',
    iconName: 'Award',
  },
];
