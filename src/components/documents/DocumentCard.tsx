import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Layers } from 'lucide-react';
import { Document } from '../../types/document';
import { Badge } from '../ui/Badge';
import { DocIcon } from '../ui/DocIcon';
import { cn } from '../../lib/utils';

export interface DocumentCardProps {
  document: Document;
  className?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, className }) => {
  const categoryVariantMap: Record<string, 'blue' | 'green' | 'amber' | 'slate' | 'navy'> = {
    identity: 'blue',
    financial: 'green',
    travel: 'navy',
    transport: 'amber',
    civic: 'blue',
    certificates: 'slate',
  };

  const badgeVariant = categoryVariantMap[document.category] || 'blue';

  return (
    <div
      className={cn(
        'group relative bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between',
        className
      )}
    >
      {/* Top Header Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          {/* Document Icon */}
          <div className="w-12 h-12 rounded-xl bg-smartdoc-blue-soft border border-smartdoc-blue-border/80 flex items-center justify-center text-smartdoc-blue group-hover:scale-105 group-hover:bg-smartdoc-blue group-hover:text-white transition-all duration-200 shrink-0">
            <DocIcon name={document.iconName} className="w-6 h-6" />
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1">
            <Badge variant={badgeVariant} size="sm" className="capitalize">
              {document.category}
            </Badge>
            {document.badgeText && (
              <span className="text-[10px] text-smartdoc-slate-muted font-medium">
                {document.badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
            <Link to={`/documents/${document.id}`} className="focus:outline-none">
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              {document.name}
            </Link>
          </h3>
          <p className="text-sm text-smartdoc-slate-muted line-clamp-2 leading-relaxed">
            {document.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Footer Metadata & Action */}
      <div className="mt-6 pt-4 border-t border-smartdoc-slate-subtle space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs text-smartdoc-slate-muted">
          <span className="inline-flex items-center gap-1 truncate max-w-[170px]" title={document.issuingAuthority}>
            <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{document.issuingAuthority}</span>
          </span>

          <span className="inline-flex items-center gap-1 shrink-0 font-medium text-slate-600">
            <Layers className="w-3.5 h-3.5 text-smartdoc-blue" />
            <span>{document.availableServiceIds.length} Services</span>
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-smartdoc-blue group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1.5">
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
