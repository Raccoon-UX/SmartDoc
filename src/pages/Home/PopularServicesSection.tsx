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
  Sparkles,
} from 'lucide-react';

export const PopularServicesSection: React.FC = () => {
  const popularServices = [
    {
      id: 'aadhaar-card',
      name: 'Aadhaar Card',
      category: 'Identity',
      descriptor: 'Address updates, biometric & PVC card',
      icon: Shield,
      colorClass: 'bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'passport',
      name: 'Passport Seva',
      category: 'Travel',
      descriptor: 'New booklet, Tatkaal & renewal',
      icon: Plane,
      colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      id: 'pan-card',
      name: 'PAN Card (Protean)',
      category: 'Financial',
      descriptor: 'Form 49A, Instant e-PAN & corrections',
      icon: CreditCard,
      colorClass: 'bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'driving-licence',
      name: 'Driving Licence',
      category: 'Transport',
      descriptor: 'Learner licence, renewal & endorsements',
      icon: Car,
      colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'voter-id',
      name: 'Voter ID (EPIC)',
      category: 'Civic',
      descriptor: 'Form 6 enrolment & digital e-EPIC',
      icon: Vote,
      colorClass: 'bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-600 group-hover:text-white',
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      id: 'birth-certificate',
      name: 'Birth Certificate',
      category: 'Civil',
      descriptor: 'CRS registration & digital verification',
      icon: Award,
      colorClass: 'bg-rose-50 text-rose-600 border-rose-200/80 group-hover:bg-rose-600 group-hover:text-white',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      id: 'vehicle-registration',
      name: 'Vehicle RC',
      category: 'Transport',
      descriptor: 'Vahan RC transfer, NOC & duplicate',
      icon: Truck,
      colorClass: 'bg-cyan-50 text-cyan-600 border-cyan-200/80 group-hover:bg-cyan-600 group-hover:text-white',
      badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      id: 'ration-card',
      name: 'Ration Card',
      category: 'Welfare',
      descriptor: 'NFSA beneficiary, ONORC & member add',
      icon: ShoppingBag,
      colorClass: 'bg-orange-50 text-orange-600 border-orange-200/80 group-hover:bg-orange-600 group-hover:text-white',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Most Requested Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Document Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Quickly access verified procedures, statutory fee schedules, and authentic portals for essential public documents.
            </p>
          </div>
          <Link
            to="/documents"
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5 self-start sm:self-auto px-4 py-2 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-100 transition-all shadow-2xs group"
          >
            <span>Explore All 34+ Documents</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 8-Item Rich Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {popularServices.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={`/documents/${item.id}`}
                className="p-5 rounded-3xl border border-slate-200/90 bg-white hover:bg-slate-50/70 hover:border-indigo-300 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group space-y-4 relative overflow-hidden"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.colorClass} transition-all duration-200 shadow-2xs`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${item.badgeClass}`}>
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {item.descriptor}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>View Requirements</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
