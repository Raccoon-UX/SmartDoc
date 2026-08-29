import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const tips = [
    {
      title: 'Verify sovereign domain names',
      description: 'Confirm the address bar starts with official .gov.in or .nic.in domains before entering identity numbers.',
    },
    {
      title: 'Never share OTPs or Passwords',
      description: 'Official departments (UIDAI, IT Dept, Parivahan) never call or text asking for one-time verification passwords.',
    },
    {
      title: 'Beware of predatory third-party fees',
      description: 'Many public services like Instant e-PAN and Aadhaar validation are 100% free. Avoid paid broker websites.',
    },
    {
      title: 'Use verified sovereign portals',
      description: 'Always initiate applications directly through audited government endpoints rather than sponsored ad results.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-[#0B132B] to-slate-900 text-white rounded-3xl p-7 sm:p-12 border border-slate-800 shadow-elevated relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/30 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <ShieldCheck className="w-4 h-4" />
                  <span>Public Safety & Fraud Prevention</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Stay Safe From Fake & <br className="hidden sm:inline" />
                  <span className="text-emerald-400">Clone Document Websites</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Before entering personal identity numbers or processing payments, make sure you are navigating to the verified sovereign platform.
                </p>
              </div>

              {/* 4 Safety Tips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {tips.map((tip) => (
                  <div
                    key={tip.title}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 space-y-1.5 transition-colors backdrop-blur-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                      <h4 className="text-xs sm:text-sm font-bold text-white">{tip.title}</h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pl-6.5">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 group"
                >
                  <span>Read Full Safety & Anti-Phishing Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Visual Box (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="p-7 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md max-w-md w-full space-y-5 text-left shadow-card">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-xs">
                    <Lock className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    34+ Audited
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    Verified Sovereign Catalog
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    SmartDoc cross-references every public portal against official government ministry registries to guarantee you reach the genuine authority without deception.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Sovereign Redirection Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
