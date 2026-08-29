import React from 'react';
import { Link } from 'react-router-dom';
import { Search, RefreshCw, FileQuestion, ClipboardCheck, ArrowRight } from 'lucide-react';

export const WhatCanIDoSection: React.FC = () => {
  const actions = [
    {
      title: 'Find a Document',
      description: 'Find the right service and official platform.',
      to: '/documents',
      icon: Search,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      title: 'Renew a Document',
      description: 'Understand renewal requirements before you start.',
      to: '/documents?q=renewal',
      icon: RefreshCw,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Replace a Lost Document',
      description: 'Find the correct replacement process.',
      to: '/documents?q=reprint',
      icon: FileQuestion,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Check Requirements',
      description: 'Know what documents and information you may need.',
      to: '/how-it-works',
      icon: ClipboardCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-1 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            What can I do today?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Start with what you need to accomplish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.to}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-indigo-300 transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.color} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform pt-1">
                  <span>Get started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
