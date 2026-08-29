import React from 'react';
import { ShieldCheck, BookOpen, Lock, FolderLock } from 'lucide-react';

export const TrustValueSection: React.FC = () => {
  const pillars = [
    {
      title: 'Verified Sources',
      description: 'Find the correct official platform directly without deceptive ad clones or phishing traps.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Clear Guidance',
      description: 'Understand prerequisites, statutory fees, and realistic timelines before you start.',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Safer Decisions',
      description: 'Learn how to recognize verified sovereign domains and protect your sensitive identity data.',
      icon: Lock,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Personal Vault',
      description: 'Keep your important digital document copies structured and encrypted in your personal dashboard.',
      icon: FolderLock,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Built for Clarity, Privacy, and Trust
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            SmartDoc simplifies citizen document discovery with zero guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/90 hover:bg-white hover:shadow-card hover:border-indigo-200 transition-all space-y-3"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${pillar.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.description}
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
