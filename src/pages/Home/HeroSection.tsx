import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  FolderLock,
  ExternalLink,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { AutocompleteSearch } from '../../components/ui/AutocompleteSearch';

export const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/documents?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/documents');
    }
  };

  const quickSearchChips = [
    { label: 'Passport renewal', query: 'passport renewal' },
    { label: 'Aadhaar address update', query: 'aadhaar address' },
    { label: 'PAN correction', query: 'pan correction' },
    { label: 'Driving licence renewal', query: 'driving licence renewal' },
    { label: 'Instant e-PAN', query: 'instant pan' },
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-14 sm:pt-16 sm:pb-20 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50/80 border-b border-slate-200/80">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 sm:space-y-8 relative z-10">
        {/* Verification Pill with Subtle Glow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-200/90 text-indigo-700 text-xs font-semibold shadow-xs hover:border-indigo-300 transition-colors backdrop-blur-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Official Public Service Discovery & Personal Document Vault</span>
        </div>

        {/* Main Headline with Gradient Accent */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Find the Right{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Document Service.
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover verified sovereign platforms, understand exact prerequisites before applying, and keep your important documents organized in one secure place.
          </p>
        </div>

        {/* Hero Search Box with Enhanced Focus Glow */}
        <div className="max-w-2xl mx-auto space-y-3 text-left">
          <div className="p-1 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-indigo-500/10 shadow-card">
            <AutocompleteSearch
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearchSubmit}
              placeholder="What document or service are you looking for?"
              size="lg"
              showShortcut={true}
            />
          </div>

          {/* Quick Helper Chips with Hover Lift */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs text-slate-500 pt-1">
            <span className="font-semibold text-slate-400 mr-0.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Try:
            </span>
            {quickSearchChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => navigate(`/documents?q=${encodeURIComponent(chip.query)}`)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-2xs transition-all cursor-pointer font-medium text-[11px] sm:text-xs"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Button
            to="/documents"
            variant="primary"
            size="md"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-card font-bold px-7 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Find a Document Service
          </Button>

          <Button
            to="/dashboard"
            variant="outline"
            size="md"
            leftIcon={FolderLock}
            className="w-full sm:w-auto font-semibold px-7 bg-white hover:bg-slate-50 border-slate-300 shadow-2xs"
          >
            Manage My Documents
          </Button>
        </div>

        {/* 4 Trust & Value Micro-Pills with Modern Elevation */}
        <div className="pt-8 sm:pt-10 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-card hover:-translate-y-0.5 transition-all">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
              <ExternalLink className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Verified Sources</p>
              <p className="text-[11px] text-slate-500 truncate">Direct sovereign URLs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-card hover:-translate-y-0.5 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 shadow-2xs">
              <FileCheck2 className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Clear Guidance</p>
              <p className="text-[11px] text-slate-500 truncate">Pre-requisite checklists</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-card hover:-translate-y-0.5 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 shadow-2xs">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Safer Decisions</p>
              <p className="text-[11px] text-slate-500 truncate">Avoid fake portals</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-slate-200 shadow-xs hover:border-purple-300 hover:shadow-card hover:-translate-y-0.5 transition-all">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 shadow-2xs">
              <FolderLock className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Personal Vault</p>
              <p className="text-[11px] text-slate-500 truncate">Encrypted storage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
