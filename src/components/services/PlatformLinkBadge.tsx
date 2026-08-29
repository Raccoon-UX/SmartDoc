import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { ExternalLinkButton } from '../ui/ExternalLinkButton';
import { cn } from '../../lib/utils';

export interface PlatformLinkBadgeProps {
  platform: {
    name: string;
    portalName: string;
    authorityName: string;
    url: string;
    isVerified: boolean;
    isStateSpecific?: boolean;
    stateNote?: string;
    securityNote?: string;
    note?: string;
  };
  className?: string;
}

export const PlatformLinkBadge: React.FC<PlatformLinkBadgeProps> = ({ platform, className }) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-gradient-to-br from-white to-smartdoc-slate-subtle border border-smartdoc-slate-border p-6 shadow-card space-y-4',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Official Platform</span>
          </div>

          <h4 className="text-lg font-bold text-smartdoc-navy">
            {platform.name}
          </h4>
          <p className="text-xs text-smartdoc-slate-muted">
            Administered by: <span className="font-semibold text-smartdoc-slate-text">{platform.authorityName}</span>
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-auto">
          <ExternalLinkButton
            url={platform.url}
            label="Visit Official Website"
            portalName={platform.portalName}
            isVerified={platform.isVerified}
          />
        </div>
      </div>

      {(platform.securityNote || platform.note || platform.stateNote) && (
        <div className="text-xs text-smartdoc-slate-muted bg-white/80 rounded-xl p-3.5 border border-smartdoc-slate-border/80 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold text-smartdoc-navy">Important Safety Guidance:</span>
            <p>{platform.securityNote || platform.note || platform.stateNote}</p>
          </div>
        </div>
      )}
    </div>
  );
};
