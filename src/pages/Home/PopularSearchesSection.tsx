import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

export const PopularSearchesSection: React.FC = () => {
  const navigate = useNavigate();

  const searchTopics = [
    { label: 'Aadhaar address update', query: 'aadhaar address' },
    { label: 'Passport renewal', query: 'passport renewal' },
    { label: 'PAN correction', query: 'pan correction' },
    { label: 'Driving licence renewal', query: 'driving licence renewal' },
    { label: 'Birth certificate digital copy', query: 'birth certificate' },
    { label: 'Voter ID status check', query: 'voter id' },
    { label: 'Instant e-PAN via Aadhaar', query: 'instant pan' },
    { label: 'Vehicle RC transfer', query: 'vehicle registration' },
    { label: 'Ration card member addition', query: 'ration card' },
    { label: 'EPFO passbook download', query: 'epfo passbook' },
  ];

  return (
    <section className="py-12 sm:py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Popular Searches</span>
            </h2>
            <p className="text-xs text-slate-500">
              Common topics citizens and users search for most.
            </p>
          </div>
        </div>

        {/* Search Chips */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {searchTopics.map((topic) => (
            <button
              key={topic.label}
              type="button"
              onClick={() => navigate(`/documents?q=${encodeURIComponent(topic.query)}`)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-600 text-xs font-semibold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5 group"
            >
              <span>{topic.label}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
