import React from 'react';
import { ShieldCheck, AlertTriangle, Building2, Info } from 'lucide-react';
import { ExternalLinkButton } from '../ui/ExternalLinkButton';
import { SourceTier, VerificationStatus } from '../../types/document';
import { cn } from '../../lib/utils';

export interface PlatformLinkBadgeProps {
  platform: {
    name: string;
    portalName: string;
    authorityName: string;
    url: string;
    isVerified: boolean;
    sourceTier?: SourceTier;
    verificationStatus?: VerificationStatus;
    lastVerified?: string;
    isStateSpecific?: boolean;
    stateNote?: string;
    securityNote?: string;
    note?: string;
    disclaimerType?: string;
  };
  className?: string;
}

export const PlatformLinkBadge: React.FC<PlatformLinkBadgeProps> = ({ platform, className }) => {
  const isGov = platform.sourceTier === 'government' || (!platform.sourceTier && platform.isVerified);
  const isRegOrg = platform.sourceTier === 'statutory' || platform.sourceTier === 'regulated_org';
  const isPrivate = platform.sourceTier === 'private_provider';

  return (
    <div
      className={cn(
        'rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-card space-y-4 overflow-hidden',
        className
      )}
    >
      {/* Top Section: Badge & Authority */}
      <div className="space-y-2.5">
        {/* Source Tier Badge */}
        <div>
          {isGov && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Government Platform</span>
            </div>
          )}

          {isRegOrg && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200/80">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Official Regulated Organization</span>
            </div>
          )}

          {isPrivate && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/80">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>Authorized Private Provider</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {platform.name}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Administered by:{' '}
            <span className="font-semibold text-slate-700">{platform.authorityName}</span>
          </p>
        </div>
      </div>

      {/* Action Button Section */}
      <div className="pt-1">
        {platform.url ? (
          <ExternalLinkButton
            url={platform.url}
            label="Visit Official Website"
            portalName={platform.portalName}
            isVerified={platform.isVerified}
          />
        ) : (
          <div className="p-3 bg-slate-100 text-slate-500 rounded-xl text-xs font-medium text-center">
            Official link pending verification
          </div>
        )}
      </div>

      {/* Safety & Redirection Disclaimers */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
        <p className="flex items-start gap-1.5 leading-relaxed">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>SmartDoc is not affiliated with this authority. You will be redirected directly to the official external website.</span>
        </p>
        {platform.lastVerified && (
          <p className="text-[10px] text-slate-400 pl-5">
            Source link verified on: {platform.lastVerified}
          </p>
        )}
      </div>

      {/* Important Safety Guidance Box */}
      {(platform.securityNote || platform.note || platform.stateNote) && (
        <div className="text-xs text-slate-600 bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200/80 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block text-xs">Important Safety Guidance:</span>
            <p className="leading-relaxed text-[11px] text-slate-600">
              {platform.securityNote || platform.note || platform.stateNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
