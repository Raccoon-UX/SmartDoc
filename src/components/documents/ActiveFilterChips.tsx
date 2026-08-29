import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { FilterState } from '../../types/filter';
import { getAllCategories } from '../../lib/utils';
import { getStateByCode } from '../../data/states';
import { cn } from '../../lib/utils';

export interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemove: (key: keyof FilterState) => void;
  onClearAll: () => void;
  className?: string;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  onRemove,
  onClearAll,
  className,
}) => {
  const categories = getAllCategories();
  const selectedCatObj = categories.find((c) => c.id === filters.category);
  const selectedState = getStateByCode(filters.stateCode);

  const chips: { key: keyof FilterState; label: string; value: string }[] = [];

  if (filters.query.trim()) {
    chips.push({ key: 'query', label: 'Keyword', value: `"${filters.query.trim()}"` });
  }

  if (filters.category !== 'all' && selectedCatObj) {
    chips.push({ key: 'category', label: 'Category', value: selectedCatObj.name });
  }

  if (filters.serviceType !== 'all') {
    const labelMap: Record<string, string> = {
      creation: 'New Application',
      updation: 'Update / Correction',
      renewal: 'Renewal / Re-issue',
      download: 'Digital Copy',
      verification: 'Verification',
      replacement: 'Replacement Card',
    };
    chips.push({ key: 'serviceType', label: 'Service', value: labelMap[filters.serviceType] || filters.serviceType });
  }

  if (filters.availability !== 'all') {
    chips.push({
      key: 'availability',
      label: 'Mode',
      value: filters.availability === 'online' ? 'Available Online' : 'Physical / Center',
    });
  }

  if (filters.feeType !== 'all') {
    const feeLabels = { free: 'Free Services', paid: 'Fixed Fee', varies: 'Variable Fee' };
    chips.push({ key: 'feeType', label: 'Fee', value: feeLabels[filters.feeType] || filters.feeType });
  }

  if (filters.speed !== 'all') {
    const speedLabels = { instant: 'Instant / Same Day', standard: '1 - 15 Days', extended: '15+ Days' };
    chips.push({ key: 'speed', label: 'Turnaround', value: speedLabels[filters.speed] || filters.speed });
  }

  if (selectedState) {
    chips.push({ key: 'stateCode', label: 'State', value: selectedState.name });
  }

  if (chips.length === 0) return null;

  return (
    <div className={cn('flex items-center gap-2 flex-wrap text-xs pt-1', className)}>
      <span className="text-slate-400 font-medium mr-1">Active Filters:</span>

      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-smartdoc-blue-soft border border-smartdoc-blue-border text-smartdoc-navy font-medium shadow-2xs group"
        >
          <span className="text-[10px] text-slate-500 font-normal uppercase">{chip.label}:</span>
          <strong className="text-smartdoc-blue-dark">{chip.value}</strong>
          <button
            onClick={() => onRemove(chip.key)}
            className="p-0.5 rounded-full hover:bg-blue-200/60 text-slate-400 hover:text-slate-700 transition-colors ml-0.5"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <button
        onClick={onClearAll}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-[11px] font-semibold transition-colors ml-1"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear All</span>
      </button>
    </div>
  );
};
