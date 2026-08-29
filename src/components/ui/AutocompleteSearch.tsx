import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, FileText, Layers, Tag, Building2, Gift } from 'lucide-react';
import { useAutocomplete } from '../../hooks/useAutocomplete';
import { SearchSuggestion } from '../../types/filter';
import { HighlightText } from './HighlightText';
import { DocIcon } from './DocIcon';
import { Badge } from './Badge';
import { cn } from '../../lib/utils';

export interface AutocompleteSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  showShortcut?: boolean;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
}

export const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for Aadhaar, LIC, Mutual Funds, Ration Card, ITR, GST, EPF...',
  className,
  size = 'md',
  autoFocus = false,
  showShortcut = true,
  onSuggestionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { suggestions, hasSuggestions } = useAutocomplete(value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Keyboard shortcuts: '/' or 'Ctrl+K' / 'Cmd+K' to focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.key === '/' && !isInput) || ((e.ctrlKey || e.metaKey) && e.key === 'k')) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle keyboard navigation within dropdown
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasSuggestions || !isOpen) {
      if (e.key === 'ArrowDown' && hasSuggestions) {
        setIsOpen(true);
        setActiveIndex(0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setIsOpen(false);
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      navigate(suggestion.url);
    }
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const sizes = {
    sm: 'py-2 pl-9 pr-8 text-xs',
    md: 'py-3 pl-11 pr-10 text-sm',
    lg: 'py-4 pl-12 pr-12 text-base shadow-sm',
  };

  const iconSizes = {
    sm: 'w-4 h-4 left-3',
    md: 'w-5 h-5 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  // Group suggestions by type
  const docSuggestions = suggestions.filter((s) => s.type === 'document');
  const orgSuggestions = suggestions.filter((s) => s.type === 'organization');
  const schemeSuggestions = suggestions.filter((s) => s.type === 'scheme');
  const srvSuggestions = suggestions.filter((s) => s.type === 'service');
  const catSuggestions = suggestions.filter((s) => s.type === 'category');

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsOpen(false);
          onSubmit?.(e);
        }}
        className="relative flex items-center w-full"
      >
        <Search
          className={cn(
            'absolute text-smartdoc-slate-muted pointer-events-none transition-colors',
            iconSizes[size]
          )}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            if (value.trim().length >= 2) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          role="combobox"
          aria-expanded={isOpen && hasSuggestions}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          className={cn(
            'w-full bg-white border border-smartdoc-slate-border text-smartdoc-navy placeholder:text-smartdoc-slate-muted rounded-xl transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 focus:border-smartdoc-blue',
            'hover:border-slate-400/80',
            sizes[size]
          )}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-md text-smartdoc-slate-muted hover:text-smartdoc-navy hover:bg-smartdoc-slate-subtle transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {!value && showShortcut && (
          <div className="absolute right-3.5 hidden sm:flex items-center gap-1 pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-smartdoc-slate-muted bg-smartdoc-slate-subtle border border-smartdoc-slate-border rounded shadow-2xs">
              /
            </kbd>
            <span className="text-[10px] text-slate-300">or</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-smartdoc-slate-muted bg-smartdoc-slate-subtle border border-smartdoc-slate-border rounded shadow-2xs">
              Ctrl K
            </kbd>
          </div>
        )}
      </form>

      {/* Autocomplete Suggestion Dropdown */}
      {isOpen && hasSuggestions && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-smartdoc-slate-border shadow-elevated z-50 overflow-hidden max-h-[460px] overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-150 divide-y divide-slate-100"
        >
          {/* Header indicator */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>Suggestions for "{value}"</span>
            <span className="text-[10px] font-normal text-slate-400">↑↓ to navigate • ↵ to select</span>
          </div>

          {/* Group: Documents */}
          {docSuggestions.length > 0 && (
            <div className="p-2">
              <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <FileText className="w-3 h-3 text-smartdoc-blue" />
                <span>Documents</span>
              </div>
              {docSuggestions.map((item) => {
                const globalIdx = suggestions.indexOf(item);
                const isSelected = activeIndex === globalIdx;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setActiveIndex(globalIdx)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                      isSelected ? 'bg-smartdoc-blue-soft text-smartdoc-navy' : 'hover:bg-slate-50 text-smartdoc-slate-text'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-smartdoc-blue-soft border border-smartdoc-blue-border/60 text-smartdoc-blue flex items-center justify-center shrink-0">
                        <DocIcon name={item.iconName || 'FileText'} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-smartdoc-navy truncate">
                          <HighlightText text={item.title} query={value} />
                        </div>
                        <p className="text-[11px] text-smartdoc-slate-muted truncate">{item.subtitle}</p>
                      </div>
                    </div>

                    {item.badge && (
                      <Badge variant="blue" size="sm" className="capitalize text-[10px] shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Group: Organizations & Regulated Bodies */}
          {orgSuggestions.length > 0 && (
            <div className="p-2">
              <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-blue-600" />
                <span>Organizations & Regulated Authorities</span>
              </div>
              {orgSuggestions.map((item) => {
                const globalIdx = suggestions.indexOf(item);
                const isSelected = activeIndex === globalIdx;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setActiveIndex(globalIdx)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                      isSelected ? 'bg-smartdoc-blue-soft text-smartdoc-navy' : 'hover:bg-slate-50 text-smartdoc-slate-text'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-smartdoc-navy truncate">
                          <HighlightText text={item.title} query={value} />
                        </div>
                        <p className="text-[11px] text-smartdoc-slate-muted truncate">{item.subtitle}</p>
                      </div>
                    </div>

                    <Badge variant="navy" size="sm" className="text-[10px] shrink-0">
                      Organization
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}

          {/* Group: Schemes & Welfare Benefits */}
          {schemeSuggestions.length > 0 && (
            <div className="p-2">
              <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <Gift className="w-3 h-3 text-purple-600" />
                <span>Government Schemes & Benefits</span>
              </div>
              {schemeSuggestions.map((item) => {
                const globalIdx = suggestions.indexOf(item);
                const isSelected = activeIndex === globalIdx;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setActiveIndex(globalIdx)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                      isSelected ? 'bg-smartdoc-blue-soft text-smartdoc-navy' : 'hover:bg-slate-50 text-smartdoc-slate-text'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-smartdoc-navy truncate">
                          <HighlightText text={item.title} query={value} />
                        </div>
                        <p className="text-[11px] text-smartdoc-slate-muted truncate">{item.subtitle}</p>
                      </div>
                    </div>

                    <Badge variant="amber" size="sm" className="text-[10px] shrink-0">
                      Scheme
                    </Badge>
                  </button>
                );
              })}
            </div>
          )}

          {/* Group: Services */}
          {srvSuggestions.length > 0 && (
            <div className="p-2">
              <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-emerald-600" />
                <span>Services & Actions</span>
              </div>
              {srvSuggestions.map((item) => {
                const globalIdx = suggestions.indexOf(item);
                const isSelected = activeIndex === globalIdx;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setActiveIndex(globalIdx)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors',
                      isSelected ? 'bg-smartdoc-blue-soft text-smartdoc-navy' : 'hover:bg-slate-50 text-smartdoc-slate-text'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-smartdoc-navy truncate">
                          <HighlightText text={item.title} query={value} />
                        </div>
                        <p className="text-[11px] text-smartdoc-slate-muted truncate">{item.subtitle}</p>
                      </div>
                    </div>

                    {item.badge && (
                      <Badge variant="slate" size="sm" className="capitalize text-[10px] shrink-0">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Group: Categories */}
          {catSuggestions.length > 0 && (
            <div className="p-2">
              <div className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3 h-3 text-indigo-600" />
                <span>Categories</span>
              </div>
              {catSuggestions.map((item) => {
                const globalIdx = suggestions.indexOf(item);
                const isSelected = activeIndex === globalIdx;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    onMouseEnter={() => setActiveIndex(globalIdx)}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left transition-colors',
                      isSelected ? 'bg-smartdoc-blue-soft text-smartdoc-navy' : 'hover:bg-slate-50 text-smartdoc-slate-text'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Tag className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="text-xs font-semibold text-smartdoc-navy truncate">
                        <HighlightText text={item.title} query={value} />
                      </span>
                    </div>
                    <span className="text-[10px] text-smartdoc-slate-muted shrink-0">{item.subtitle}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer: View full search */}
          <div className="p-2.5 bg-slate-50/80 text-center">
            <button
              type="button"
              onClick={(e) => {
                setIsOpen(false);
                onSubmit?.(e as any);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-smartdoc-blue hover:underline"
            >
              <span>View all matching results for "{value}"</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
