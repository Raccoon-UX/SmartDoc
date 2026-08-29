import React, { useState } from 'react';
import { Printer, Share2, CheckSquare, Square, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ServiceRequirement } from '../../types/service';
import { Button } from '../ui/Button';
import { useShare } from '../../hooks/useShare';
import { cn } from '../../lib/utils';

export interface InteractiveChecklistProps {
  title?: string;
  documentName: string;
  serviceName?: string;
  requirements: (ServiceRequirement | string)[];
  officialPlatformName?: string;
  className?: string;
}

export const InteractiveChecklist: React.FC<InteractiveChecklistProps> = ({
  title = 'Document Preparation Checklist',
  documentName,
  serviceName,
  requirements,
  officialPlatformName,
  className,
}) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});
  const { share, isCopied } = useShare();

  const getRequirementKey = (item: ServiceRequirement | string, index: number) => {
    return typeof item === 'string' ? `req-${index}` : item.id || `req-${index}`;
  };

  const getRequirementTitle = (item: ServiceRequirement | string) => {
    return typeof item === 'string' ? item : item.title;
  };

  const getRequirementDesc = (item: ServiceRequirement | string) => {
    return typeof item === 'string' ? undefined : item.description;
  };

  const isMandatory = (item: ServiceRequirement | string) => {
    return typeof item === 'string' ? true : item.isMandatory;
  };

  const toggleCheck = (key: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalCount = requirements.length;
  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    share({
      title: `${serviceName || documentName} Requirements Checklist — SmartDoc`,
      text: `Review the required documents and steps for ${serviceName || documentName} on SmartDoc.`,
    });
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-smartdoc-slate-border p-6 shadow-card space-y-6 printable-area',
        className
      )}
    >
      {/* Printable Header (Visible on print only) */}
      <div className="hidden print:block space-y-2 pb-4 border-b border-slate-300">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">SmartDoc — Official Requirements Checklist</h1>
          <span className="text-xs text-slate-500">{new Date().toLocaleDateString()}</span>
        </div>
        <p className="text-sm font-semibold text-slate-800">
          Document / Service: <strong className="text-blue-700">{documentName} {serviceName ? `— ${serviceName}` : ''}</strong>
        </p>
        {officialPlatformName && (
          <p className="text-xs text-slate-600">
            Official Application Platform: <strong>{officialPlatformName}</strong>
          </p>
        )}
      </div>

      {/* Interactive Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-smartdoc-navy flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-smartdoc-blue" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-smartdoc-slate-muted">
            Tick items as you gather them before starting your application.
          </p>
        </div>

        {/* Action Buttons: Print & Share */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={Printer}
            className="text-xs"
            title="Print a clean paper checklist"
          >
            Print Checklist
          </Button>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleShare}
            leftIcon={Share2}
            className="text-xs"
            title="Share checklist link"
          >
            {isCopied ? 'Link Copied!' : 'Share'}
          </Button>
        </div>
      </div>

      {/* Progress Bar (Interactive) */}
      <div className="space-y-1.5 print:hidden">
        <div className="flex items-center justify-between text-xs font-semibold text-smartdoc-navy">
          <span>Preparation Progress</span>
          <span>
            {checkedCount} of {totalCount} ready ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-smartdoc-blue transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-2.5">
        {requirements.map((item, index) => {
          const key = getRequirementKey(item, index);
          const reqTitle = getRequirementTitle(item);
          const reqDesc = getRequirementDesc(item);
          const mandatory = isMandatory(item);
          const isChecked = Boolean(checkedIds[key]);

          return (
            <div
              key={key}
              onClick={() => toggleCheck(key)}
              className={cn(
                'flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none text-left',
                isChecked
                  ? 'bg-emerald-50/60 border-emerald-300/80 text-emerald-950'
                  : 'bg-smartdoc-slate-subtle/50 border-smartdoc-slate-border hover:border-slate-300 text-smartdoc-slate-text'
              )}
            >
              <div className="shrink-0 mt-0.5 print:hidden">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>

              {/* Print Only Square Box */}
              <div className="hidden print:inline-block w-4 h-4 border border-black rounded-xs mr-2 mt-0.5 shrink-0" />

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'text-xs sm:text-sm font-semibold',
                      isChecked ? 'text-emerald-900 line-through opacity-80' : 'text-smartdoc-navy'
                    )}
                  >
                    {reqTitle}
                  </span>
                  {mandatory ? (
                    <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 shrink-0">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-medium text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded shrink-0">
                      Optional
                    </span>
                  )}
                </div>
                {reqDesc && (
                  <p className="text-xs text-smartdoc-slate-muted leading-relaxed">
                    {reqDesc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer / Note */}
      <div className="text-[11px] text-smartdoc-slate-muted bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p>
          This checklist is a self-preparation aid. Checking off items does not upload documents or verify them with authorities. Always bring original physical proofs when visiting centers.
        </p>
      </div>

      {/* Print Footer Notice (Print Only) */}
      <div className="hidden print:block pt-4 border-t border-slate-300 text-[10px] text-slate-500">
        SmartDoc is an independent public information directory. Always verify on official government portals (.gov.in / .nic.in).
      </div>
    </div>
  );
};
