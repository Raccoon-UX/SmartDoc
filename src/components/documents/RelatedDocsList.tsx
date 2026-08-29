import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Document } from '../../types/document';
import { DocIcon } from '../ui/DocIcon';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export interface RelatedDocsListProps {
  documents: Document[];
  className?: string;
}

export const RelatedDocsList: React.FC<RelatedDocsListProps> = ({ documents, className }) => {
  if (documents.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      <h4 className="text-sm font-bold uppercase tracking-wider text-smartdoc-navy">
        Related & Interlinked Documents
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            to={`/documents/${doc.id}`}
            className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-smartdoc-slate-border hover:border-smartdoc-blue/50 hover:shadow-card transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-smartdoc-blue-soft border border-smartdoc-blue-border/60 flex items-center justify-center text-smartdoc-blue group-hover:scale-105 transition-transform shrink-0">
              <DocIcon name={doc.iconName} className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-smartdoc-navy group-hover:text-smartdoc-blue truncate">
                  {doc.name}
                </span>
                <Badge variant="slate" size="sm" className="capitalize text-[10px] hidden sm:inline-flex">
                  {doc.category}
                </Badge>
              </div>
              <p className="text-xs text-smartdoc-slate-muted truncate">
                {doc.shortDescription}
              </p>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-smartdoc-blue group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
};
