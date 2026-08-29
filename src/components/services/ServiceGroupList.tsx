import React from 'react';
import { Service } from '../../types/service';
import { ServiceCard } from './ServiceCard';
import { Sparkles, RefreshCw, Edit3, DownloadCloud, ShieldCheck } from 'lucide-react';

export interface ServiceGroupListProps {
  services: Service[];
  className?: string;
}

export const ServiceGroupList: React.FC<ServiceGroupListProps> = ({ services, className }) => {
  const groups = [
    {
      type: 'creation',
      title: 'Apply / Fresh Issuance',
      description: 'Initial applications, new registrations, and first-time enrolment.',
      icon: Sparkles,
      items: services.filter((s) => s.serviceType === 'creation'),
    },
    {
      type: 'updation',
      title: 'Update & Corrections',
      description: 'Change of address, demographic details correction, and data updates.',
      icon: Edit3,
      items: services.filter((s) => s.serviceType === 'updation'),
    },
    {
      type: 'renewal',
      title: 'Renew & Re-issue',
      description: 'Renew expiring documents or re-issue damaged/exhausted booklets.',
      icon: RefreshCw,
      items: services.filter((s) => s.serviceType === 'renewal'),
    },
    {
      type: 'download',
      title: 'Digital Copy & Status Tracking',
      description: 'Download e-copies, check application status, and statutory linkages.',
      icon: DownloadCloud,
      items: services.filter(
        (s) => s.serviceType === 'download' || s.serviceType === 'verification'
      ),
    },
    {
      type: 'replacement',
      title: 'Replacements & Special Permits',
      description: 'Durable PVC cards, duplicate licences, and international permits.',
      icon: ShieldCheck,
      items: services.filter((s) => s.serviceType === 'replacement'),
    },
  ].filter((g) => g.items.length > 0);

  return (
    <div className={className || 'space-y-8'}>
      {groups.map((group) => {
        const GroupIcon = group.icon;

        return (
          <div key={group.type} className="space-y-3.5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-smartdoc-blue-soft text-smartdoc-blue flex items-center justify-center shrink-0">
                <GroupIcon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-bold text-smartdoc-navy">{group.title}</h4>
                <p className="text-xs text-smartdoc-slate-muted">{group.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {group.items.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
