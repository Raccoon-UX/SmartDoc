import React from 'react';
import { ArrowRight, ShieldCheck, FolderKanban } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-smartdoc-navy text-white relative overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-smartdoc-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-200 border border-white/15 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Smart Public Service & Digital Document Management</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Everything You Need for Your <br className="hidden sm:inline" />
            <span className="text-blue-400">Important Documents.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find the right service, understand what you need, and keep your documents organized.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            to="/documents"
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-elevated bg-smartdoc-blue hover:bg-smartdoc-blue-dark text-white font-bold"
          >
            Find a Document Service
          </Button>

          <Button
            to="/dashboard"
            variant="outline"
            size="lg"
            leftIcon={FolderKanban}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Open Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
};
