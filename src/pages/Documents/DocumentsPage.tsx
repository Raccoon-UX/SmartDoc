import React, { useState } from 'react';
import { PageContainer } from '../../components/layout/PageContainer';
import { AutocompleteSearch } from '../../components/ui/AutocompleteSearch';
import { CategoryFilter } from '../../components/documents/CategoryFilter';
import { FilterPanel } from '../../components/documents/FilterPanel';
import { FilterDrawerMobile } from '../../components/documents/FilterDrawerMobile';
import { ActiveFilterChips } from '../../components/documents/ActiveFilterChips';
import { StateSelector } from '../../components/documents/StateSelector';
import { DocumentGrid } from '../../components/documents/DocumentGrid';
import { getAllCategories } from '../../lib/utils';
import { useAdvancedSearch } from '../../hooks/useAdvancedSearch';
import { Layers, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DocumentsPage: React.FC = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const categories = getAllCategories();

  const {
    filters,
    setFilter,
    removeFilter,
    clearAllFilters,
    filteredDocuments,
    facetCounts,
    hasActiveFilters,
    matchingCount,
  } = useAdvancedSearch();

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
                Document Services Directory
              </h1>
              <p className="text-sm sm:text-base text-smartdoc-slate-muted mt-1 max-w-2xl">
                Explore government document lifecycles, prerequisites, and direct sovereign application platforms.
              </p>
            </div>

            <div className="text-xs text-smartdoc-slate-muted flex items-center gap-2 self-start md:self-auto">
              {/* Mobile Filter Drawer Trigger Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsMobileDrawerOpen(true)}
                leftIcon={SlidersHorizontal}
                className="lg:hidden"
              >
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-smartdoc-blue" />
                )}
              </Button>

              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-smartdoc-slate-border shadow-2xs">
                <Layers className="w-4 h-4 text-smartdoc-blue" />
                <span>Showing <strong className="text-smartdoc-navy">{matchingCount}</strong> documents</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Top Category Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-smartdoc-slate-border shadow-subtle space-y-4">
          <AutocompleteSearch
            value={filters.query}
            onChange={(q) => setFilter('query', q)}
            placeholder="Search by keyword (e.g. Passport renewal, Aadhaar address, Instant PAN, Learner licence...)"
            size="md"
            showShortcut={true}
          />

          {/* Category Horizontal Filter Pills */}
          <div className="pt-2 border-t border-slate-100">
            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category}
              onSelectCategory={(catId) => setFilter('category', catId)}
            />
          </div>

          {/* Active Filter Chips Bar */}
          <ActiveFilterChips
            filters={filters}
            onRemove={removeFilter}
            onClearAll={clearAllFilters}
          />
        </div>

        {/* Main Content Layout: Sidebar Facets (3 cols) + Documents Grid (9 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilter}
              onClearAll={clearAllFilters}
              categories={categories}
              facetCounts={facetCounts}
            />

            {/* Optional State Guidance Filter */}
            <div className="bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card">
              <StateSelector
                selectedStateCode={filters.stateCode}
                onSelectState={(code) => setFilter('stateCode', code)}
              />
            </div>
          </div>

          {/* Right Document Grid (9 cols on lg, full width otherwise) */}
          <div className="lg:col-span-9 space-y-6">
            <DocumentGrid
              documents={filteredDocuments}
              searchQuery={filters.query}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={clearAllFilters}
            />
          </div>
        </div>

        {/* Mobile Bottom Sheet Drawer */}
        <FilterDrawerMobile
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
          filters={filters}
          onFilterChange={setFilter}
          onClearAll={clearAllFilters}
          categories={categories}
          facetCounts={facetCounts}
          matchingCount={matchingCount}
        />
      </div>
    </PageContainer>
  );
};
