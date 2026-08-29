import React from 'react';
import { Search, BookOpen, ExternalLink, ArrowRight, Route } from 'lucide-react';

export const HowItWorksStepsSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'SEARCH',
      actionTitle: 'Find the Service',
      description: 'Search for the specific document, update, or renewal procedure you need from our verified catalog.',
      icon: Search,
      color: 'bg-blue-50 text-blue-600 border-blue-200/80',
      badge: 'Step 1',
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      actionTitle: 'Review Requirements',
      description: 'Check mandatory eligibility rules, identity proof lists, government fees, and turnaround times in advance.',
      icon: BookOpen,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
      badge: 'Step 2',
    },
    {
      num: '03',
      title: 'APPLY',
      actionTitle: 'Official Platform',
      description: 'Follow step-by-step guidance and proceed directly to the authentic, audited government department portal.',
      icon: ExternalLink,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      badge: 'Step 3',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 mb-1">
            <Route className="w-3.5 h-3.5" />
            <span>Structured Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            From Search to Service — In Three Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A straightforward, reliable pathway to navigate public services with complete peace of mind.
          </p>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-5xl mx-auto text-left">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Bar with Step Number and Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-slate-300 group-hover:text-indigo-600/30 transition-colors font-mono">
                      {step.num}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${step.color} shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block font-mono">
                      {step.title}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {step.actionTitle}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow connector on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-slate-300 text-slate-400 items-center justify-center text-xs shadow-xs z-10 font-bold">
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
