import React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeaderProps {
  tag?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  description,
  align = 'left',
  action,
  className,
  titleClassName,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8',
        align === 'center' && 'text-center items-center',
        className
      )}
    >
      <div className={cn('space-y-1.5', align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl')}>
        {tag && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-smartdoc-blue bg-smartdoc-blue-soft px-2.5 py-0.5 rounded-full border border-smartdoc-blue-border/60">
            {tag}
          </span>
        )}
        <h2
          className={cn(
            'text-2xl sm:text-3xl font-bold tracking-tight text-smartdoc-navy',
            titleClassName
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-smartdoc-slate-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 flex items-center">{action}</div>}
    </div>
  );
};
