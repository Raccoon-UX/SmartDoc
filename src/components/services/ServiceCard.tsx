import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Globe, ArrowRight, Banknote } from 'lucide-react';
import { Service } from '../../types/service';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export interface ServiceCardProps {
  service: Service;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, className }) => {
  const serviceTypeBadges: Record<string, { label: string; variant: 'blue' | 'green' | 'amber' | 'slate' | 'navy' }> = {
    creation: { label: 'New Application', variant: 'blue' },
    updation: { label: 'Correction / Update', variant: 'amber' },
    renewal: { label: 'Renewal', variant: 'navy' },
    download: { label: 'Digital Copy', variant: 'green' },
    verification: { label: 'Verification', variant: 'slate' },
    replacement: { label: 'Replacement Card', variant: 'blue' },
  };

  const badgeInfo = serviceTypeBadges[service.serviceType] || { label: service.serviceType, variant: 'blue' };

  return (
    <div
      className={cn(
        'group bg-white rounded-2xl border border-smartdoc-slate-border p-5 shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex flex-col justify-between',
        className
      )}
    >
      <div className="space-y-3">
        {/* Badges row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge variant={badgeInfo.variant} size="sm">
            {badgeInfo.label}
          </Badge>

          {service.isOnlineAvailable ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <Globe className="w-3 h-3 text-emerald-600" />
              <span>Available Online</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              <span>Center Visit Required</span>
            </span>
          )}
        </div>

        {/* Title and short description */}
        <div className="space-y-1">
          <h4 className="text-base font-bold text-smartdoc-navy group-hover:text-smartdoc-blue transition-colors">
            <Link to={`/services/${service.id}`} className="focus:outline-none">
              {service.name}
            </Link>
          </h4>
          <p className="text-xs sm:text-sm text-smartdoc-slate-muted line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </div>

      {/* Metadata & Actions */}
      <div className="mt-5 pt-3.5 border-t border-smartdoc-slate-subtle space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs text-smartdoc-slate-muted">
          <div className="flex items-center gap-1.5 truncate">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{service.estimatedTime}</span>
          </div>

          <div className="flex items-center gap-1.5 justify-end truncate">
            <Banknote className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700 truncate">{service.fee.amount}</span>
          </div>
        </div>

        <Link
          to={`/services/${service.id}`}
          className="w-full inline-flex items-center justify-between text-xs font-semibold text-smartdoc-blue hover:text-smartdoc-blue-dark py-1.5 transition-colors group-hover:translate-x-0.5"
        >
          <span>View Service Requirements</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
