import { useMemo } from 'react';
import { SearchSuggestion } from '../types/filter';
import { getAllDocuments, getAllServices, getAllCategories } from '../lib/utils';

export function useAutocomplete(query: string, maxResults: number = 8) {
  const allDocs = getAllDocuments();
  const allServices = getAllServices();
  const allCategories = getAllCategories().filter((c) => c.id !== 'all');

  const suggestions: SearchSuggestion[] = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || trimmed.length < 2) {
      return [];
    }

    const docMatches: SearchSuggestion[] = [];
    const orgMatches: SearchSuggestion[] = [];
    const schemeMatches: SearchSuggestion[] = [];
    const serviceMatches: SearchSuggestion[] = [];
    const categoryMatches: SearchSuggestion[] = [];

    // 1. Check Categories
    for (const cat of allCategories) {
      if (
        cat.name.toLowerCase().includes(trimmed) ||
        cat.slug.toLowerCase().includes(trimmed) ||
        cat.description.toLowerCase().includes(trimmed)
      ) {
        categoryMatches.push({
          id: `cat-${cat.id}`,
          title: cat.name,
          subtitle: `Category • ${cat.count || 0} public services`,
          type: 'category',
          url: `/documents?category=${cat.id}`,
          iconName: cat.iconName,
        });
      }
    }

    // 2. Check Documents, Organizations, and Schemes
    for (const doc of allDocs) {
      const nameMatch = doc.name.toLowerCase().includes(trimmed);
      const codeMatch = doc.code.toLowerCase().includes(trimmed);
      const descMatch = doc.shortDescription.toLowerCase().includes(trimmed);
      const authMatch = doc.issuingAuthority.toLowerCase().includes(trimmed);
      const kwMatch = doc.keywords?.some((k) => k.toLowerCase().includes(trimmed));

      if (nameMatch || codeMatch || descMatch || authMatch || kwMatch) {
        if (doc.itemType === 'organization') {
          orgMatches.push({
            id: `org-${doc.id}`,
            title: doc.name,
            subtitle: `${doc.issuingAuthority} • ${doc.availableServiceIds.length} Services`,
            type: 'organization',
            url: `/documents/${doc.id}`,
            badge: doc.category,
            iconName: doc.iconName,
          });
        } else if (doc.itemType === 'scheme') {
          schemeMatches.push({
            id: `sch-${doc.id}`,
            title: doc.name,
            subtitle: `${doc.issuingAuthority} • Scheme & Benefits`,
            type: 'scheme',
            url: `/documents/${doc.id}`,
            badge: doc.badgeText || doc.category,
            iconName: doc.iconName,
          });
        } else {
          docMatches.push({
            id: `doc-${doc.id}`,
            title: doc.name,
            subtitle: `${doc.issuingAuthority} • ${doc.availableServiceIds.length} Services`,
            type: 'document',
            url: `/documents/${doc.id}`,
            badge: doc.category,
            iconName: doc.iconName,
          });
        }
      }
    }

    // 3. Check Services
    for (const srv of allServices) {
      const nameMatch = srv.name.toLowerCase().includes(trimmed);
      const descMatch = srv.shortDescription.toLowerCase().includes(trimmed);
      const kwMatch = srv.keywords?.some((k) => k.toLowerCase().includes(trimmed));
      const parentDoc = allDocs.find((d) => d.id === srv.documentId);

      if (nameMatch || descMatch || kwMatch) {
        serviceMatches.push({
          id: `srv-${srv.id}`,
          title: srv.name,
          subtitle: `${parentDoc ? parentDoc.name + ' • ' : ''}${srv.fee.amount}`,
          type: 'service',
          url: `/services/${srv.id}`,
          badge: srv.serviceType,
          iconName: parentDoc?.iconName || 'FileText',
        });
      }
    }

    // Combine results prioritizing relevant categories
    const combined = [
      ...docMatches.slice(0, 3),
      ...orgMatches.slice(0, 2),
      ...schemeMatches.slice(0, 2),
      ...serviceMatches.slice(0, 3),
      ...categoryMatches.slice(0, 2),
    ];

    return combined.slice(0, maxResults);
  }, [query, allDocs, allServices, allCategories, maxResults]);

  return {
    suggestions,
    hasSuggestions: suggestions.length > 0,
  };
}
