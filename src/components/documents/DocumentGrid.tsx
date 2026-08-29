import React from 'react';
import { Search, RotateCcw, FileQuestion, FilterX } from 'lucide-react';
import { Document } from '../../types/document';
import { DocumentCard } from './DocumentCard';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export interface DocumentGridProps {
  documents: Document[];
  searchQuery?: string;
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  className?: string;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  searchQuery,
  hasActiveFilters = false,
  onResetFilters,
  className,
}) => {
  if (documents.length === 0) {
    if (searchQuery && searchQuery.trim()) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-smartdoc-slate-border shadow-subtle space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-smartdoc-blue-soft border border-smartdoc-blue-border/60 flex items-center justify-center text-smartdoc-blue">
            <Search className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-lg font-bold text-smartdoc-navy">
              No results found for "{searchQuery}"
            </h3>
            <p className="text-xs sm:text-sm text-smartdoc-slate-muted leading-relaxed">
              We couldn't find any documents or services matching your query. Check your spelling or try searching for keywords like <strong>Aadhaar, PAN, Passport, Driving Licence, Renewal, or Birth Certificate</strong>.
            </p>
          </div>
          {onResetFilters && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onResetFilters}
              leftIcon={RotateCcw}
            >
              Clear Search & View All
            </Button>
          )}
        </div>
      );
    }

    if (hasActiveFilters) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-smartdoc-slate-border shadow-subtle space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
            <FilterX className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-lg font-bold text-smartdoc-navy">
              No documents match these filter combinations
            </h3>
            <p className="text-xs sm:text-sm text-smartdoc-slate-muted leading-relaxed">
              Try removing some filter criteria (such as service type, fee category, or availability) to broaden your results.
            </p>
          </div>
          {onResetFilters && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onResetFilters}
              leftIcon={RotateCcw}
            >
              Reset Filters
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-smartdoc-slate-border shadow-subtle space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
          <FileQuestion className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-smartdoc-navy">No documents available</h3>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
    >
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
};
