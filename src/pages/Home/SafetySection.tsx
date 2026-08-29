import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const tips = [
    {
      title: 'Verify the website/domain',
      description: 'Check for sovereign .gov.in or .nic.in domains before submitting identity proofs or personal details.',
    },
    {
      title: 'Never share OTPs or passwords',
      description: 'Government portals and official authorities will never call, SMS, or email asking for OTPs.',
    },
    {
      title: 'Be cautious of unexpected fees',
      description: 'Many public services like e-PAN are completely free. Avoid third-party portals charging excessive processing fees.',
    },
    {
      title: 'Use official platforms for applications',
      description: 'Always navigate directly to verified government endpoints instead of unverified sponsored search ads.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/25">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Public Safety & Awareness</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Stay Safe From Fake Document Websites
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Before entering personal information or making a payment, make sure you're using the correct official platform.
                </p>
              </div>

              {/* 4 Safety Tips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {tips.map((tip) => (
                  <div
                    key={tip.title}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 backdrop-blur-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <h4 className="text-xs font-bold text-white">{tip.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed pl-6">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  <span>Learn How to Stay Safe</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual Box (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="p-6 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md max-w-sm w-full space-y-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    Audited Sovereign Registry
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    SmartDoc maintains a strict catalog of 34+ verified government portals, cross-checked against official department databases to prevent redirection fraud.
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Always check URL before submitting sensitive documents</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
