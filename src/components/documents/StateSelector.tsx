import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Check, ChevronDown, X, Search, Info } from 'lucide-react';
import { indianStates, getStateByCode } from '../../data/states';
import { cn } from '../../lib/utils';

export interface StateSelectorProps {
  selectedStateCode?: string;
  onSelectState: (stateCode?: string) => void;
  className?: string;
  label?: string;
  showNote?: boolean;
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  selectedStateCode,
  onSelectState,
  className,
  label = 'Select your State / UT for regional guidance',
  showNote = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedState = getStateByCode(selectedStateCode);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const filteredStates = indianStates.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className={cn('relative space-y-2', className)}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          {label}
        </label>
      )}

      {/* Main Selector Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white border text-sm transition-all text-left shadow-2xs',
            isOpen ? 'border-smartdoc-blue ring-2 ring-smartdoc-blue/15' : 'border-smartdoc-slate-border hover:border-slate-300',
            selectedState ? 'text-smartdoc-navy font-semibold' : 'text-smartdoc-slate-muted'
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <MapPin className={cn('w-4 h-4 shrink-0', selectedState ? 'text-smartdoc-blue' : 'text-slate-400')} />
            <span className="truncate">
              {selectedState ? selectedState.name : 'Select Indian State / UT...'}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {selectedState && (
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectState(undefined);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Clear State"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
            <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')} />
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-smartdoc-slate-border shadow-elevated z-50 overflow-hidden max-h-72 flex flex-col animate-in fade-in-50 zoom-in-95 duration-150">
          {/* Search Box */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type state or UT name..."
              className="w-full bg-transparent text-xs sm:text-sm text-smartdoc-navy placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* List of States */}
          <div className="overflow-y-auto p-1.5 divide-y divide-slate-50 flex-1">
            {filteredStates.map((state) => {
              const isSelected = selectedStateCode === state.code;

              return (
                <button
                  key={state.code}
                  type="button"
                  onClick={() => {
                    onSelectState(state.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors',
                    isSelected ? 'bg-smartdoc-blue-soft text-smartdoc-blue-dark font-bold' : 'hover:bg-slate-50 text-smartdoc-slate-text'
                  )}
                >
                  <span>{state.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-smartdoc-blue shrink-0" />}
                </button>
              );
            })}

            {filteredStates.length === 0 && (
              <div className="p-4 text-center text-xs text-smartdoc-slate-muted">
                No matching state found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected State Guidance Note */}
      {showNote && selectedState && (
        <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 text-xs text-smartdoc-slate-text space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-smartdoc-navy">
            <Info className="w-3.5 h-3.5 text-smartdoc-blue shrink-0" />
            <span>State Guidance: {selectedState.name}</span>
          </div>
          {selectedState.rtoPortalName && (
            <p className="text-[11px] text-smartdoc-slate-muted">
              <strong>Transport Authority:</strong> {selectedState.rtoPortalName}
            </p>
          )}
          {selectedState.municipalPortalName && (
            <p className="text-[11px] text-smartdoc-slate-muted">
              <strong>Civil / Municipal Portal:</strong> {selectedState.municipalPortalName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
