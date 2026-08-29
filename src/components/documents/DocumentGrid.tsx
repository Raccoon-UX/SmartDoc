import React from 'react';
import { Document } from '../../types/document';
import { DocumentCard } from './DocumentCard';
import { EmptyState } from '../ui/EmptyState';
import { cn } from '../../lib/utils';

export interface DocumentGridProps {
  documents: Document[];
  onResetFilters?: () => void;
  className?: string;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({
  documents,
  onResetFilters,
  className,
}) => {
  if (documents.length === 0) {
    return (
      <EmptyState
        title="No document services matched your search"
        description="We couldn't find any documents matching your criteria. Try searching for Aadhaar, PAN, Passport, Driving Licence, Voter ID, or Birth Certificate."
        actionLabel="Reset Search & Filters"
        onAction={onResetFilters}
      />
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
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
};
