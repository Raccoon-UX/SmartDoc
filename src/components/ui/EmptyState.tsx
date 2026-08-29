import React from 'react';
import { FileQuestion, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No documents found',
  description = 'Try adjusting your search query or switching to a different category filter.',
  icon: Icon = FileQuestion,
  actionLabel = 'Reset Filters',
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-smartdoc-slate-border shadow-subtle',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-smartdoc-slate-subtle border border-smartdoc-slate-border flex items-center justify-center text-smartdoc-slate-muted mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-smartdoc-navy mb-1">{title}</h3>
      <p className="text-sm text-smartdoc-slate-muted max-w-md mb-6">{description}</p>
      {onAction && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          leftIcon={RotateCcw}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
