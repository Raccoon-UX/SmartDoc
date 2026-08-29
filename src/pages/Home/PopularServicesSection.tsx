import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  CreditCard,
  Plane,
  Car,
  Vote,
  Award,
  Truck,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export const PopularServicesSection: React.FC = () => {
  const popularServices = [
    {
      id: 'aadhaar-card',
      name: 'Aadhaar',
      descriptor: 'Updates & related services',
      icon: Shield,
      colorClass: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'passport',
      name: 'Passport',
      descriptor: 'New application & renewal',
      icon: Plane,
      colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: 'pan-card',
      name: 'PAN Card',
      descriptor: 'Application & correction',
      icon: CreditCard,
      colorClass: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'driving-licence',
      name: 'Driving Licence',
      descriptor: 'Renewal & related services',
      icon: Car,
      colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'voter-id',
      name: 'Voter ID',
      descriptor: 'Enrolment & correction',
      icon: Vote,
      colorClass: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'birth-certificate',
      name: 'Birth Certificate',
      descriptor: 'Registration & digital copy',
      icon: Award,
      colorClass: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      id: 'vehicle-registration',
      name: 'Vehicle Registration',
      descriptor: 'RC transfer & fitness',
      icon: Truck,
      colorClass: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    },
    {
      id: 'ration-card',
      name: 'Ration Card',
      descriptor: 'NFSA beneficiary & additions',
      icon: ShoppingBag,
      colorClass: 'bg-orange-50 text-orange-600 border-orange-100',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Popular Document Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Quickly find the information and services people use most.
            </p>
          </div>
          <Link
            to="/documents"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Browse all catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8-Item Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {popularServices.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/documents/${item.id}`}
                className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50/80 hover:border-indigo-200 hover:shadow-card transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.colorClass} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      {item.descriptor}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
