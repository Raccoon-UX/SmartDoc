import React from 'react';
import { Shield, FileSearch, Timer, FolderLock } from 'lucide-react';
import { SectionHeader } from '../../components/ui/SectionHeader';

export const WhySmartDoc: React.FC = () => {
  const problemPoints = [
    {
      title: 'Find Official Services',
      description:
        'Quickly identify the authentic, legitimate official platform for each public document without falling victim to predatory ad-heavy or imitation portals.',
      icon: Shield,
      accent: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      title: 'Understand Requirements',
      description:
        'Know the exact supporting documents, eligibility criteria, government fees, and turnaround times before visiting an office or submitting forms.',
      icon: FileSearch,
      accent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Reduce Search Time',
      description:
        'Find relevant document services instantly from a centralized catalog instead of sifting through fragmented departmental websites and broken links.',
      icon: Timer,
      accent: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      title: 'Organize Your Documents',
      description:
        'Keep personal digital document copies structured and categorized in one safe, private management dashboard for rapid access when applying for new services.',
      icon: FolderLock,
      accent: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-smartdoc-slate-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Why SmartDoc"
          title="Solving the Urban Document Dilemma"
          description="Navigating civic and government documents shouldn't involve guesswork, security anxiety, or wasted hours."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {problemPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                className="bg-white rounded-2xl border border-smartdoc-slate-border p-7 shadow-card hover:shadow-card-hover hover:border-slate-300 transition-all duration-200 flex items-start gap-5"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${point.accent}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-smartdoc-navy">
                    {point.title}
                  </h3>
                  <p className="text-sm text-smartdoc-slate-muted leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
