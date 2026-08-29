import React from 'react';
import { ShieldCheck, BookOpen, Lock, FolderLock, Award } from 'lucide-react';

export const TrustValueSection: React.FC = () => {
  const pillars = [
    {
      title: 'Verified Sources',
      description: 'Find the correct official platform directly without deceptive ad clones or phishing traps.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white',
      badge: 'Audited URLs',
    },
    {
      title: 'Clear Guidance',
      description: 'Understand prerequisites, statutory fees, and realistic timelines before you start.',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white',
      badge: 'Step Guides',
    },
    {
      title: 'Safer Decisions',
      description: 'Learn how to recognize verified sovereign domains and protect your sensitive identity data.',
      icon: Lock,
      color: 'bg-amber-50 text-amber-600 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white',
      badge: 'Anti-Phishing',
    },
    {
      title: 'Personal Vault',
      description: 'Keep your important digital document copies structured and encrypted in your personal dashboard.',
      icon: FolderLock,
      color: 'bg-purple-50 text-purple-600 border-purple-200/80 group-hover:bg-purple-600 group-hover:text-white',
      badge: 'RLS Security',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Clarity, Privacy & Trust
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            SmartDoc simplifies citizen document discovery with zero guesswork and complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/90 hover:bg-white hover:shadow-card-hover hover:border-indigo-300 hover:-translate-y-1 transition-all duration-200 space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${pillar.color} transition-all duration-200 shadow-2xs`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
