import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState, AvailabilityFilter, FeeFilter, SpeedFilter, FacetCount } from '../types/filter';
import { CategoryId } from '../types/category';
import { ServiceType } from '../types/service';
import { getAllDocuments, getServicesForDocument } from '../lib/utils';

export function useAdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allDocuments = getAllDocuments();

  // Extract filter parameters from URL
  const filters: FilterState = useMemo(() => {
    return {
      query: searchParams.get('q') || searchParams.get('search') || '',
      category: (searchParams.get('category') as CategoryId) || 'all',
      serviceType: (searchParams.get('type') as 'all' | ServiceType) || 'all',
      availability: (searchParams.get('avail') as AvailabilityFilter) || 'all',
      feeType: (searchParams.get('fee') as FeeFilter) || 'all',
      speed: (searchParams.get('speed') as SpeedFilter) || 'all',
      stateCode: searchParams.get('state') || undefined,
    };
  }, [searchParams]);

  // Set individual filter & update URL
  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const next = new URLSearchParams(searchParams);
    
    // Normalize query key to 'q'
    if (next.has('search')) {
      next.delete('search');
    }

    if (!value || value === 'all') {
      const paramMap: Record<string, string> = {
        query: 'q',
        category: 'category',
        serviceType: 'type',
        availability: 'avail',
        feeType: 'fee',
        speed: 'speed',
        stateCode: 'state',
      };
      next.delete(paramMap[key] || (key as string));
    } else {
      const paramMap: Record<string, string> = {
        query: 'q',
        category: 'category',
        serviceType: 'type',
        availability: 'avail',
        feeType: 'fee',
        speed: 'speed',
        stateCode: 'state',
      };
      next.set(paramMap[key] || (key as string), String(value));
    }

    setSearchParams(next, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const removeFilter = (key: keyof FilterState) => {
    setFilter(key, (key === 'category' ? 'all' : key === 'query' ? '' : 'all') as any);
  };

  // Perform multi-facet filtering on documents
  const filteredDocuments = useMemo(() => {
    const trimmedQuery = filters.query.trim().toLowerCase();

    return allDocuments.filter((doc) => {
      // 1. Category Facet
      if (filters.category !== 'all' && doc.category !== filters.category) {
        return false;
      }

      // 2. Services of this document
      const docServices = getServicesForDocument(doc.id);

      // 3. Service Type Facet
      if (filters.serviceType !== 'all') {
        const matchesServiceType = docServices.some(
          (s) => s.serviceType === filters.serviceType
        );
        if (!matchesServiceType) return false;
      }

      // 4. Availability Facet (online vs physical)
      if (filters.availability !== 'all') {
        const matchesAvail = docServices.some((s) =>
          filters.availability === 'online' ? s.isOnlineAvailable : !s.isOnlineAvailable
        );
        if (!matchesAvail) return false;
      }

      // 5. Fee Type Facet
      if (filters.feeType !== 'all') {
        const matchesFee = docServices.some(
          (s) => s.fee.feeType === filters.feeType || (filters.feeType === 'free' && s.fee.amount.toLowerCase().includes('free'))
        );
        if (!matchesFee) return false;
      }

      // 6. Speed Facet
      if (filters.speed !== 'all') {
        const matchesSpeed = docServices.some((s) => s.speedBracket === filters.speed);
        if (!matchesSpeed) return false;
      }

      // 7. Full-text / Keyword Search
      if (trimmedQuery) {
        const nameMatch = doc.name.toLowerCase().includes(trimmedQuery);
        const codeMatch = doc.code.toLowerCase().includes(trimmedQuery);
        const descMatch = doc.shortDescription.toLowerCase().includes(trimmedQuery);
        const fullMatch = doc.fullDescription.toLowerCase().includes(trimmedQuery);
        const authMatch = doc.issuingAuthority.toLowerCase().includes(trimmedQuery);
        const kwMatch = doc.keywords?.some((k) => k.toLowerCase().includes(trimmedQuery));
        const usesMatch = doc.keyUses.some((use) => use.toLowerCase().includes(trimmedQuery));

        // Check if any service name, purpose, or service keywords match
        const serviceMatch = docServices.some(
          (s) =>
            s.name.toLowerCase().includes(trimmedQuery) ||
            s.shortDescription.toLowerCase().includes(trimmedQuery) ||
            s.purpose.toLowerCase().includes(trimmedQuery) ||
            s.keywords?.some((k) => k.toLowerCase().includes(trimmedQuery))
        );

        if (!(nameMatch || codeMatch || descMatch || fullMatch || authMatch || kwMatch || usesMatch || serviceMatch)) {
          return false;
        }
      }

      return true;
    });
  }, [allDocuments, filters]);

  // Compute live facet counts
  const facetCounts = useMemo(() => {
    const serviceTypes: FacetCount[] = [
      { id: 'creation', label: 'New Application', count: 0 },
      { id: 'updation', label: 'Update / Correction', count: 0 },
      { id: 'renewal', label: 'Renewal / Re-issue', count: 0 },
      { id: 'download', label: 'Digital Copy / e-Document', count: 0 },
      { id: 'verification', label: 'Verification & Linking', count: 0 },
      { id: 'replacement', label: 'Replacement Card', count: 0 },
    ];

    const availability: FacetCount[] = [
      { id: 'online', label: 'Available Online (100%)', count: 0 },
      { id: 'physical', label: 'Center Visit Required', count: 0 },
    ];

    const feeTypes: FacetCount[] = [
      { id: 'free', label: 'Free Services', count: 0 },
      { id: 'paid', label: 'Standard Fixed Fee', count: 0 },
      { id: 'varies', label: 'Variable / State Specific', count: 0 },
    ];

    const speeds: FacetCount[] = [
      { id: 'instant', label: 'Instant / Same Day', count: 0 },
      { id: 'standard', label: 'Standard (1 - 15 Days)', count: 0 },
      { id: 'extended', label: 'Extended (15+ Days)', count: 0 },
    ];

    allDocuments.forEach((doc) => {
      const srvs = getServicesForDocument(doc.id);
      
      serviceTypes.forEach((st) => {
        if (srvs.some((s) => s.serviceType === st.id)) st.count++;
      });

      availability.forEach((av) => {
        if (srvs.some((s) => (av.id === 'online' ? s.isOnlineAvailable : !s.isOnlineAvailable))) av.count++;
      });

      feeTypes.forEach((ft) => {
        if (srvs.some((s) => s.fee.feeType === ft.id || (ft.id === 'free' && s.fee.amount.toLowerCase().includes('free')))) ft.count++;
      });

      speeds.forEach((sp) => {
        if (srvs.some((s) => s.speedBracket === sp.id)) sp.count++;
      });
    });

    return { serviceTypes, availability, feeTypes, speeds };
  }, [allDocuments]);

  const hasActiveFilters = 
    filters.query.trim().length > 0 ||
    filters.category !== 'all' ||
    filters.serviceType !== 'all' ||
    filters.availability !== 'all' ||
    filters.feeType !== 'all' ||
    filters.speed !== 'all' ||
    Boolean(filters.stateCode);

  return {
    filters,
    setFilter,
    removeFilter,
    clearAllFilters,
    filteredDocuments,
    facetCounts,
    hasActiveFilters,
    totalCount: allDocuments.length,
    matchingCount: filteredDocuments.length,
  };
}
