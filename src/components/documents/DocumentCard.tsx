import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { Document } from '../../types/document';
import { Badge } from '../ui/Badge';
import { DocIcon } from '../ui/DocIcon';
import { HighlightText } from '../ui/HighlightText';
import { getServicesForDocument, cn } from '../../lib/utils';

export interface DocumentCardProps {
  document: Document;
  searchQuery?: string;
  className?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  searchQuery,
  className,
}) => {
  const categoryVariantMap: Record<string, 'blue' | 'green' | 'amber' | 'slate' | 'navy'> = {
    identity: 'blue',
    financial: 'green',
    insurance: 'blue',
    investments: 'green',
    transport: 'amber',
    property: 'slate',
    education: 'navy',
    employment: 'blue',
    health: 'green',
    travel: 'navy',
    civic: 'blue',
    certificates: 'slate',
    business: 'amber',
    schemes: 'green',
  };

  const badgeVariant = categoryVariantMap[document.category] || 'blue';
  const services = getServicesForDocument(document.id);

  // Check if any specific service matched search query
  const matchingServices = searchQuery && searchQuery.trim().length >= 2
    ? services.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.keywords?.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const isOrg = document.itemType === 'organization';
  const isScheme = document.itemType === 'scheme';

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
            <div className="flex items-center gap-1">
              {isOrg && (
                <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                  Organization
                </span>
              )}
              {isScheme && (
                <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>Scheme</span>
                </span>
              )}
              <Badge variant={badgeVariant} size="sm" className="capitalize">
                {document.category}
              </Badge>
            </div>

            {document.badgeText && (
              <span className="text-[10px] text-smartdoc-slate-muted font-medium">
                {document.badgeText}
              </span>
            )}
          </div>
        </div>

        {/* Title & Description with Keyword Highlighting */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
            <Link to={`/documents/${document.id}`} className="focus:outline-none">
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              <HighlightText text={document.name} query={searchQuery} />
            </Link>
          </h3>
          <p className="text-sm text-smartdoc-slate-muted line-clamp-2 leading-relaxed">
            <HighlightText text={document.shortDescription} query={searchQuery} />
          </p>
        </div>

        {/* Matched Service Highlights */}
        {matchingServices.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Matching Services:</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {matchingServices.slice(0, 2).map((ms) => (
                <span
                  key={ms.id}
                  className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200 truncate max-w-[200px]"
                >
                  <HighlightText text={ms.name} query={searchQuery} />
                </span>
              ))}
            </div>
          </div>
        )}
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
