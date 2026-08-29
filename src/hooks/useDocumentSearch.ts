import { useState, useMemo } from 'react';
import { CategoryId } from '../types/category';
import { searchDocuments } from '../lib/utils';

export function useDocumentSearch(initialCategory: CategoryId = 'all') {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);

  const filteredDocuments = useMemo(() => {
    return searchDocuments(query, selectedCategory);
  }, [query, selectedCategory]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('all');
  };

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    filteredDocuments,
    clearFilters,
    hasActiveFilters: query.trim().length > 0 || selectedCategory !== 'all',
  };
}
