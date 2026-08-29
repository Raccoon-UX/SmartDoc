import React from 'react';
import { Search, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

export const HowItWorksStepsSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'SEARCH',
      actionTitle: 'Find the Service',
      description: 'Search for the specific document, update, or renewal service you need from our catalog.',
      icon: Search,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      actionTitle: 'Review Requirements',
      description: 'Check eligibility, mandatory supporting documents, statutory fees, and timelines before applying.',
      icon: BookOpen,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      num: '03',
      title: 'APPLY',
      actionTitle: 'Official Platform',
      description: 'Follow step-by-step procedures and continue directly to the verified sovereign government portal.',
      icon: ExternalLink,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="space-y-1 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            From Search to Service — In Three Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A straightforward pathway to navigate public documents with confidence.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-5xl mx-auto text-left">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-indigo-300 transition-all flex flex-col justify-between relative space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Bar with Step Number and Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 font-mono">
                      {step.num}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${step.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                      {step.title}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {step.actionTitle}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow connector on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 items-center justify-center text-xs shadow-xs z-10">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
