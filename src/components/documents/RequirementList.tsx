import React from 'react';
import { CheckCircle, Fingerprint, DollarSign, UserCheck, FileCheck } from 'lucide-react';
import { ServiceRequirement } from '../../types/service';
import { cn } from '../../lib/utils';

export interface RequirementListProps {
  requirements: (ServiceRequirement | string)[];
  title?: string;
  className?: string;
}

export const RequirementList: React.FC<RequirementListProps> = ({
  requirements,
  title = 'Basic Requirements & Prerequisites',
  className,
}) => {
  const getRequirementIcon = (type?: string) => {
    switch (type) {
      case 'biometric':
        return <Fingerprint className="w-4 h-4 text-smartdoc-blue" />;
      case 'fee':
        return <DollarSign className="w-4 h-4 text-amber-600" />;
      case 'eligibility':
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'document':
        return <FileCheck className="w-4 h-4 text-indigo-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-smartdoc-green-dark" />;
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      {title && (
        <h4 className="text-sm font-bold uppercase tracking-wider text-smartdoc-navy flex items-center gap-2">
          <span>{title}</span>
        </h4>
      )}

      <ul className="space-y-2.5">
        {requirements.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <li
                key={index}
                className="flex items-start gap-3 p-3 rounded-xl bg-smartdoc-slate-subtle/70 border border-smartdoc-slate-border text-sm text-smartdoc-slate-text"
              >
                <CheckCircle className="w-4 h-4 text-smartdoc-green-dark shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            );
          }

          return (
            <li
              key={item.id || index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-smartdoc-slate-border text-sm shadow-xs"
            >
              <div className="p-1 rounded-lg bg-smartdoc-slate-subtle shrink-0 mt-0.5">
                {getRequirementIcon(item.type)}
              </div>
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-smartdoc-navy">{item.title}</span>
                  {item.isMandatory ? (
                    <span className="text-[10px] uppercase font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      Optional
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs text-smartdoc-slate-muted">{item.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
