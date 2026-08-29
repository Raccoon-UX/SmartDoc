import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  FolderLock,
  ExternalLink,
  FileCheck2,
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
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-white via-slate-50/60 to-slate-50 border-b border-slate-200/80">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-50/40 to-transparent pointer-events-none" />
      <div className="absolute -top-20 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-7 relative z-10">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Official Public Service Discovery & Digital Document Vault</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Find the Right <span className="text-indigo-600">Document Service.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover official platforms, understand requirements before you apply, and manage your personal documents in one place.
          </p>
        </div>

        {/* Hero Search Box */}
        <div className="max-w-2xl mx-auto space-y-2.5 text-left">
          <AutocompleteSearch
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearchSubmit}
            placeholder="What document or service are you looking for?"
            size="lg"
            showShortcut={true}
          />

          {/* Quick Helper Chips */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs text-slate-500 pt-1">
            <span className="font-medium text-slate-400 mr-0.5">Try:</span>
            {quickSearchChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => navigate(`/documents?q=${encodeURIComponent(chip.query)}`)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/90 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-2xs cursor-pointer font-medium text-[11px] sm:text-xs"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            to="/documents"
            variant="primary"
            size="md"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-xs font-semibold px-6"
          >
            Find a Document Service
          </Button>

          <Button
            to="/dashboard"
            variant="outline"
            size="md"
            leftIcon={FolderLock}
            className="w-full sm:w-auto font-semibold px-6 bg-white"
          >
            Manage My Documents
          </Button>
        </div>

        {/* 4 Trust & Value Micro-Pills */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Verified Sources</p>
              <p className="text-[10px] text-slate-500 truncate">Direct sovereign URLs</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Clear Guidance</p>
              <p className="text-[10px] text-slate-500 truncate">Pre-requisite checklists</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Safer Decisions</p>
              <p className="text-[10px] text-slate-500 truncate">Avoid clone portals</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <FolderLock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Personal Vault</p>
              <p className="text-[10px] text-slate-500 truncate">Encrypted storage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
