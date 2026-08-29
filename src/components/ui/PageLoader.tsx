import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Sparkles, Server } from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface PageLoaderProps {
  /** Custom headline or title */
  title?: string;
  /** Initial or fixed message */
  message?: string;
  /** Whether to show full viewport splash screen */
  fullScreen?: boolean;
  /** Whether to animate staged realistic status text */
  cycleMessages?: boolean;
  /** Optional custom percentage (0 - 100). If not provided, simulates smooth progress */
  progress?: number;
  /** Optional callback when loading animation reaches 100% */
  onComplete?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  title = 'SmartDoc',
  message = 'Loading verified workspace...',
  fullScreen = true,
  cycleMessages = true,
  progress: externalProgress,
  onComplete,
}) => {
  const [internalProgress, setInternalProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const loadingSteps = [
    { text: 'Initializing SmartDoc Sovereign Engine...', icon: Server },
    { text: 'Verifying 256-bit cryptographic vault...', icon: Lock },
    { text: 'Auditing 34+ sovereign service registries...', icon: ShieldCheck },
    { text: 'Preparing private citizen workspace...', icon: Sparkles },
  ];

  // Progressive Simulated Loading Bar
  useEffect(() => {
    if (externalProgress !== undefined) {
      setInternalProgress(externalProgress);
      return;
    }

    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        // Realistic easing progress jump
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12) + (Math.random() > 0.5 ? 2 : 1));
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [externalProgress, onComplete]);

  // Rotate informative steps based on progress
  useEffect(() => {
    if (!cycleMessages) return;
    if (internalProgress < 25) setCurrentStepIndex(0);
    else if (internalProgress < 55) setCurrentStepIndex(1);
    else if (internalProgress < 85) setCurrentStepIndex(2);
    else setCurrentStepIndex(3);
  }, [internalProgress, cycleMessages]);

  const activeStep = loadingSteps[currentStepIndex];
  const StepIcon = activeStep.icon;

  const content = (
    <div className="relative flex flex-col items-center justify-center text-center px-4 max-w-md w-full mx-auto select-none">
      {/* Background Ambient Glow Circles */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-56 h-56 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Logo & Glowing Orb Frame */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Outer Pulsing Glow Ring */}
        <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-emerald-500/20 blur-md animate-pulse" />
        
        {/* Rotating Geometric Border Ring */}
        <div className="absolute inset-0 -m-2 rounded-full border-2 border-dashed border-indigo-400/40 animate-spin [animation-duration:8s]" />
        
        {/* Logo Container Card */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white p-3.5 shadow-elevated border border-slate-200/90 flex items-center justify-center transform transition-transform hover:scale-105">
          <img
            src={logoImg}
            alt="SmartDoc Logo"
            className="w-full h-full object-contain filter drop-shadow-xs"
          />
        </div>
      </div>

      {/* Brand Title with Gradient */}
      <div className="space-y-1 mb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
          <span>{title}</span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold">
            Portal v1.0
          </span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Official Public Service Discovery & Personal Document Vault
        </p>
      </div>

      {/* Sleek Gradient Progress Bar */}
      <div className="w-full space-y-2 mb-6">
        <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200/80 p-0.5 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 transition-all duration-200 ease-out shadow-xs relative overflow-hidden"
            style={{ width: `${internalProgress}%` }}
          >
            {/* Moving Light Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite] -skew-x-12" />
          </div>
        </div>

        {/* Dynamic Percentage & Status Row */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-0.5">
          <div className="flex items-center gap-1.5 font-sans font-medium text-slate-600 truncate max-w-[280px]">
            <StepIcon className="w-3.5 h-3.5 text-indigo-600 shrink-0 animate-spin [animation-duration:4s]" />
            <span className="truncate">{cycleMessages ? activeStep.text : message}</span>
          </div>
          <span className="font-bold text-indigo-600 shrink-0">
            {internalProgress}%
          </span>
        </div>
      </div>

      {/* Sovereign Trust Micro-Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-2xs text-[11px] text-slate-600">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-slate-800">256-bit AES</span>
        <span className="text-slate-300">•</span>
        <span>Direct Sovereign Protocol</span>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-50/95 via-white/98 to-slate-100/95 backdrop-blur-md transition-opacity duration-300 animate-in fade-in-50">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[65vh] w-full flex items-center justify-center py-12 animate-in fade-in-50">
      {content}
    </div>
  );
};
