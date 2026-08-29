import React from 'react';
import { Search, Compass, FileCheck2, ExternalLink, FolderKanban } from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      stepNumber: '01',
      title: 'Search',
      description: 'Search for any document or service by keyword, category, or document code.',
      icon: Search,
    },
    {
      stepNumber: '02',
      title: 'Find the Service',
      description: 'Select the specific action: new enrolment, demographic update, renewal, or reprint.',
      icon: Compass,
    },
    {
      stepNumber: '03',
      title: 'Check Requirements',
      description: 'Review mandatory proof of identity, address proof, fee breakdown, and timeline.',
      icon: FileCheck2,
    },
    {
      stepNumber: '04',
      title: 'Visit Official Platform',
      description: 'Access the verified official government portal without risking phishing clones.',
      icon: ExternalLink,
    },
    {
      stepNumber: '05',
      title: 'Manage Documents',
      description: 'Store, organize, and categorize your personal document copies in your secure dashboard.',
      icon: FolderKanban,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-smartdoc-slate-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Process Flow"
          title="How SmartDoc Works"
          description="A systematic 5-step pathway to navigate public document services with confidence and zero confusion."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative mt-12">
          {steps.map((step, index) => {
            const StepIcon = step.icon;

            return (
              <div
                key={step.stepNumber}
                className="relative bg-smartdoc-slate-bg rounded-2xl p-6 border border-smartdoc-slate-border flex flex-col justify-between hover:shadow-subtle hover:border-slate-300 transition-all duration-200"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-smartdoc-blue/30 font-mono">
                    {step.stepNumber}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-smartdoc-slate-border text-smartdoc-navy flex items-center justify-center shadow-xs">
                    <StepIcon className="w-5 h-5 text-smartdoc-blue" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-smartdoc-navy">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-smartdoc-slate-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-bold shadow-xs">
                    →
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
