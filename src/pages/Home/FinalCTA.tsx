import React from 'react';
import { ArrowRight, ShieldCheck, FolderLock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 border border-white/15 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Official Public Service Discovery & Digital Document Management</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Everything You Need for Your <br className="hidden sm:inline" />
            <span className="text-indigo-400">Important Documents.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Find the right service, understand what you need, and keep your personal document copies organized.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Button
            to="/documents"
            variant="primary"
            size="md"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7"
          >
            Find a Document Service
          </Button>

          <Button
            to="/dashboard"
            variant="outline"
            size="md"
            leftIcon={FolderLock}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold px-7"
          >
            Open Document Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
};
