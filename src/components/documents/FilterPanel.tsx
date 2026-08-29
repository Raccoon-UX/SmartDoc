import React from 'react';
import { Filter, Globe, Banknote, Clock, Layers, Tag } from 'lucide-react';
import { FilterState, FacetCount } from '../../types/filter';
import { Category } from '../../types/category';
import { ServiceType } from '../../types/service';
import { DocIcon } from '../ui/DocIcon';
import { cn } from '../../lib/utils';

export interface FilterPanelProps {
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
  className?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearAll,
  categories,
  facetCounts,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card space-y-6',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-smartdoc-blue" />
          <h3 className="text-sm font-bold text-smartdoc-navy">Filter Document Catalog</h3>
        </div>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-slate-500 hover:text-smartdoc-blue font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* 1. Category Facet */}
      <div className="space-y-2.5">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
          <Tag className="w-3 h-3 text-smartdoc-blue" />
          <span>Category</span>
        </span>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onFilterChange('category', cat.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
                  isSelected
                    ? 'bg-smartdoc-navy text-white font-bold shadow-2xs'
                    : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle hover:text-smartdoc-navy'
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <DocIcon
                    name={cat.iconName}
                    className={cn('w-3.5 h-3.5 shrink-0', isSelected ? 'text-blue-300' : 'text-slate-400')}
                  />
                  <span className="truncate">{cat.name}</span>
                </div>
                {typeof cat.count === 'number' && (
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded-full',
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Service Type Facet */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-emerald-600" />
          <span>Service Type</span>
        </span>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onFilterChange('serviceType', 'all')}
            className={cn(
              'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
              filters.serviceType === 'all'
                ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
            )}
          >
            <span>All Service Types</span>
          </button>
          {facetCounts.serviceTypes.map((st) => {
            const isSelected = filters.serviceType === st.id;

            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onFilterChange('serviceType', st.id as ServiceType)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
                  isSelected
                    ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                    : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
                )}
              >
                <span className="truncate">{st.label}</span>
                <span className="text-[10px] text-slate-400">{st.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Availability Facet */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
          <Globe className="w-3 h-3 text-blue-600" />
          <span>Mode & Availability</span>
        </span>
        <div className="grid grid-cols-1 gap-1">
          <button
            type="button"
            onClick={() => onFilterChange('availability', 'all')}
            className={cn(
              'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
              filters.availability === 'all'
                ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
            )}
          >
            <span>All Modes</span>
          </button>
          {facetCounts.availability.map((av) => {
            const isSelected = filters.availability === av.id;

            return (
              <button
                key={av.id}
                type="button"
                onClick={() => onFilterChange('availability', av.id as any)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
                  isSelected
                    ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                    : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
                )}
              >
                <span className="truncate">{av.label}</span>
                <span className="text-[10px] text-slate-400">{av.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Fee Facet */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
          <Banknote className="w-3 h-3 text-amber-600" />
          <span>Government Fee</span>
        </span>
        <div className="grid grid-cols-1 gap-1">
          <button
            type="button"
            onClick={() => onFilterChange('feeType', 'all')}
            className={cn(
              'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
              filters.feeType === 'all'
                ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
            )}
          >
            <span>All Fee Types</span>
          </button>
          {facetCounts.feeTypes.map((ft) => {
            const isSelected = filters.feeType === ft.id;

            return (
              <button
                key={ft.id}
                type="button"
                onClick={() => onFilterChange('feeType', ft.id as any)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
                  isSelected
                    ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                    : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
                )}
              >
                <span className="truncate">{ft.label}</span>
                <span className="text-[10px] text-slate-400">{ft.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Processing Speed Facet */}
      <div className="space-y-2.5 pt-4 border-t border-slate-100">
        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-indigo-600" />
          <span>Turnaround Speed</span>
        </span>
        <div className="grid grid-cols-1 gap-1">
          <button
            type="button"
            onClick={() => onFilterChange('speed', 'all')}
            className={cn(
              'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
              filters.speed === 'all'
                ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
            )}
          >
            <span>Any Turnaround</span>
          </button>
          {facetCounts.speeds.map((sp) => {
            const isSelected = filters.speed === sp.id;

            return (
              <button
                key={sp.id}
                type="button"
                onClick={() => onFilterChange('speed', sp.id as any)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left',
                  isSelected
                    ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold'
                    : 'text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle'
                )}
              >
                <span className="truncate">{sp.label}</span>
                <span className="text-[10px] text-slate-400">{sp.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
