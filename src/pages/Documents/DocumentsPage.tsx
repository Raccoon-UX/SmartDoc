import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { SearchBar } from '../../components/ui/SearchBar';
import { CategoryFilter } from '../../components/documents/CategoryFilter';
import { DocumentGrid } from '../../components/documents/DocumentGrid';
import { getAllCategories, searchDocuments } from '../../lib/utils';
import { CategoryId } from '../../types/category';
import { Layers, ShieldCheck, FilterX } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DocumentsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = getAllCategories();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('category') as CategoryId) || 'all';

  const setQuery = (newQuery: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newQuery) {
      nextParams.set('q', newQuery);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const setSelectedCategory = (catId: CategoryId) => {
    const nextParams = new URLSearchParams(searchParams);
    if (catId && catId !== 'all') {
      nextParams.set('category', catId);
    } else {
      nextParams.delete('category');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const filteredDocuments = useMemo(() => {
    return searchDocuments(queryParam, categoryParam);
  }, [queryParam, categoryParam]);

  const hasActiveFilters = queryParam.trim().length > 0 || categoryParam !== 'all';

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-smartdoc-blue-soft border border-smartdoc-blue-border text-smartdoc-blue-dark text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-smartdoc-blue" />
            <span>Official Information Directory</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-smartdoc-navy tracking-tight">
                Document Services
              </h1>
              <p className="text-sm sm:text-base text-smartdoc-slate-muted mt-1 max-w-2xl">
                Explore government and public document requirements, official application platforms, and services.
              </p>
            </div>

            <div className="text-xs text-smartdoc-slate-muted flex items-center gap-1.5 self-start md:self-auto bg-white px-3 py-1.5 rounded-lg border border-smartdoc-slate-border shadow-2xs">
              <Layers className="w-4 h-4 text-smartdoc-blue" />
              <span>Showing <strong className="text-smartdoc-navy">{filteredDocuments.length}</strong> documents</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-smartdoc-slate-border shadow-subtle space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <SearchBar
              value={queryParam}
              onChange={setQuery}
              placeholder="Search by document name (Aadhaar, PAN...), authority, or keyword..."
              size="md"
              showShortcut={true}
            />
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                leftIcon={FilterX}
                className="shrink-0 text-slate-500 hover:text-rose-600 w-full sm:w-auto"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="pt-2 border-t border-slate-100">
            <CategoryFilter
              categories={categories}
              selectedCategory={categoryParam}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* Document Cards Grid */}
        <DocumentGrid
          documents={filteredDocuments}
          onResetFilters={clearFilters}
        />
      </div>
    </PageContainer>
  );
};
