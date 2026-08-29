import React from 'react';
import { Link } from 'react-router-dom';
import { Search, RefreshCw, FileQuestion, ClipboardCheck, ArrowRight, Zap } from 'lucide-react';

export const WhatCanIDoSection: React.FC = () => {
  const actions = [
    {
      title: 'Find a Document',
      tag: 'Catalog Search',
      description: 'Discover the right service, fees, and authentic sovereign platform link.',
      to: '/documents',
      icon: Search,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white',
      accentBg: 'group-hover:border-indigo-300',
    },
    {
      title: 'Renew a Document',
      tag: 'Expiring Proofs',
      description: 'Understand passport, licence, or certification renewal requirements.',
      to: '/documents?q=renewal',
      icon: RefreshCw,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white',
      accentBg: 'group-hover:border-emerald-300',
    },
    {
      title: 'Replace a Lost Document',
      tag: 'Duplicate / Reprint',
      description: 'Find official reprint and reissue steps for misplaced PAN, Aadhaar or RC.',
      to: '/documents?q=reprint',
      icon: FileQuestion,
      color: 'bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white',
      accentBg: 'group-hover:border-amber-300',
    },
    {
      title: 'Check Requirements',
      tag: 'Pre-flight Checklist',
      description: 'Know what identity, address, and age proofs are needed before applying.',
      to: '/how-it-works',
      icon: ClipboardCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-600 group-hover:text-white',
      accentBg: 'group-hover:border-purple-300',
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#F8FAFC] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-1.5 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-semibold border border-slate-300/70">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Direct Citizen Intent</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What can I do today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Start directly with what you need to accomplish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.to}
                className={`bg-white p-6 rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover ${item.accentBg} hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group space-y-5`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color} transition-all duration-200 shadow-2xs`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
