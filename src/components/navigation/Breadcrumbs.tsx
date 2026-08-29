import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  active?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-xs text-smartdoc-slate-muted mb-6 overflow-x-auto py-1 scrollbar-none', className)}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-smartdoc-blue transition-colors text-smartdoc-slate-muted"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="hover:text-smartdoc-blue transition-colors truncate max-w-[150px] sm:max-w-xs font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'truncate max-w-[180px] sm:max-w-sm',
                  isLast ? 'text-smartdoc-navy font-semibold' : 'text-smartdoc-slate-muted'
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
