import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../../components/ui/PageLoader';
import { Button } from '../../components/ui/Button';
import { RefreshCw, Maximize2, Shield, Zap, Sparkles, ArrowRight } from 'lucide-react';

export const LoaderPage: React.FC = () => {
  const [key, setKey] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [customSpeed, setCustomSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');

  const handleRestart = () => {
    setKey((prev) => prev + 1);
  };

  const handleTriggerFullScreen = () => {
    setIsFullScreen(true);
    // Auto-close fullscreen preview after 3.5 seconds
    setTimeout(() => {
      setIsFullScreen(false);
    }, 3800);
  };

  return (
    <div className="min-h-[85vh] bg-[#F8FAFC] py-10 sm:py-16">
      {/* Fullscreen Modal Preview when toggled */}
      {isFullScreen && (
        <PageLoader
          key={`full-${key}`}
          fullScreen={true}
          onComplete={() => setIsFullScreen(false)}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive UI Component</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SmartDoc Experience Loader
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Preview the branded splash screen and transition loader used during security authentication and workspace hydration.
          </p>
        </div>

        {/* Embedded Loader Showcase Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Preview
            </span>
          </div>

          <PageLoader
            key={`embed-${key}-${customSpeed}`}
            fullScreen={false}
            cycleMessages={true}
          />

          {/* Interactive Controls Bar */}
          <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={RefreshCw}
                onClick={handleRestart}
                className="font-semibold text-xs"
              >
                Replay Animation
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={Maximize2}
                onClick={handleTriggerFullScreen}
                className="font-semibold text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Test Fullscreen Splash
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold">Modes:</span>
              <button
                type="button"
                onClick={() => setCustomSpeed('fast')}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                  customSpeed === 'fast'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Fast
              </button>
              <button
                type="button"
                onClick={() => setCustomSpeed('normal')}
                className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                  customSpeed === 'normal'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Standard
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Sovereign Validation</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Provides real-time feedback during citizen authentication and credential verification.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Dynamic Staging</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sequentially communicates system status across 4 progressive cryptographic steps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Shimmering Glow</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Modern ambient lighting, rotating geometric ring, and fluid gradient progress indicator.
            </p>
          </div>
        </div>

        {/* Quick Nav CTA */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/documents"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5"
          >
            <span>Explore Document Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            to="/dashboard"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
          >
            <span>Open User Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
