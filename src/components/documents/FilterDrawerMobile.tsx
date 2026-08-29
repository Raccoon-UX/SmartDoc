import React from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';
import { FilterState, FacetCount } from '../../types/filter';
import { Category } from '../../types/category';
import { FilterPanel } from './FilterPanel';
import { Button } from '../ui/Button';

export interface FilterDrawerMobileProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearAll: () => void;
  categories: Category[];
  facetCounts: {
    serviceTypes: FacetCount[];
    availability: FacetCount[];
    feeTypes: FacetCount[];
    speeds: FacetCount[];
  };
  matchingCount: number;
}

export const FilterDrawerMobile: React.FC<FilterDrawerMobileProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  categories,
  facetCounts,
  matchingCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-elevated flex flex-col z-10 animate-in slide-in-from-bottom duration-250 sm:max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-smartdoc-blue" />
            <h3 className="text-base font-bold text-smartdoc-navy">Filter Document Catalog</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 flex-1">
          <FilterPanel
            filters={filters}
            onFilterChange={onFilterChange}
            onClearAll={onClearAll}
            categories={categories}
            facetCounts={facetCounts}
            className="border-none shadow-none p-0"
          />
        </div>

        {/* Bottom Bar Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={onClearAll}
            leftIcon={RotateCcw}
            className="shrink-0"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            className="flex-1 justify-center font-bold"
          >
            Show {matchingCount} Documents
          </Button>
        </div>
      </div>
    </div>
  );
};
