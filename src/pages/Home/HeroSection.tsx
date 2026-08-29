import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, FileCheck, Layers, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/documents?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/documents');
    }
  };

  const quickTags = [
    { label: 'Aadhaar Card', id: 'aadhaar-card' },
    { label: 'PAN Card', id: 'pan-card' },
    { label: 'Passport', id: 'passport' },
    { label: 'Driving Licence', id: 'driving-licence' },
    { label: 'Voter ID', id: 'voter-id' },
    { label: 'Birth Certificate', id: 'birth-certificate' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-white via-smartdoc-slate-bg to-smartdoc-slate-bg border-b border-smartdoc-slate-border">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-smartdoc-blue/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-smartdoc-blue-soft border border-smartdoc-blue-border text-smartdoc-blue-dark text-xs font-semibold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-smartdoc-blue" />
          <span>Centralized Document Creation & Management System</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-smartdoc-navy tracking-tight leading-[1.15]">
            Find the Right <span className="text-smartdoc-blue">Document Service.</span>
          </h1>
          <p className="text-lg sm:text-xl text-smartdoc-slate-muted max-w-2xl mx-auto leading-relaxed">
            Discover official platforms, understand requirements, and manage your important documents — all in one place.
          </p>
        </div>

        {/* Hero Search Box (Prominent Hero UI) */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white p-2 rounded-2xl border-2 border-smartdoc-blue/30 shadow-card-hover hover:border-smartdoc-blue transition-all duration-200 focus-within:border-smartdoc-blue focus-within:ring-4 focus-within:ring-smartdoc-blue/10"
          >
            <div className="pl-3.5 pr-2 text-smartdoc-slate-muted pointer-events-none">
              <Search className="w-5 h-5 text-smartdoc-blue" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Aadhaar, PAN, Passport, Driving Licence..."
              className="w-full bg-transparent border-none text-smartdoc-navy placeholder:text-slate-400 text-sm sm:text-base focus:outline-none py-2"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="shrink-0 rounded-xl px-5"
            >
              Search
            </Button>
          </form>

          {/* Quick Tag Pills */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-3 text-xs text-smartdoc-slate-muted">
            <span className="font-medium text-slate-500 mr-1">Popular:</span>
            {quickTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => navigate(`/documents/${tag.id}`)}
                className="px-2.5 py-1 rounded-lg bg-white border border-smartdoc-slate-border text-smartdoc-slate-text hover:text-smartdoc-blue hover:border-smartdoc-blue/40 transition-colors shadow-xs"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Button
            to="/documents"
            variant="navy"
            size="lg"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-card"
          >
            Find a Document Service
          </Button>

          <Button
            to="/dashboard"
            variant="secondary"
            size="lg"
            leftIcon={Layers}
            className="w-full sm:w-auto"
          >
            Manage My Documents
          </Button>
        </div>

        {/* Value Micro-Pills */}
        <div className="pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-smartdoc-navy">Verified Platforms</p>
              <p className="text-[11px] text-smartdoc-slate-muted">Direct official government URLs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-smartdoc-navy">Clear Requirements</p>
              <p className="text-[11px] text-smartdoc-slate-muted">Pre-requisites & step guides</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-smartdoc-navy">Zero Fraud Risk</p>
              <p className="text-[11px] text-smartdoc-slate-muted">Avoid clone and fake portals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
