import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  autoFocus?: boolean;
  showShortcut?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for Aadhaar, PAN, Passport, Driving Licence...',
  className,
  size = 'md',
  autoFocus = false,
  showShortcut = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      className={cn('relative w-full flex items-center', className)}
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
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
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
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-medium text-smartdoc-slate-muted bg-smartdoc-slate-subtle border border-smartdoc-slate-border rounded shadow-xs">
            /
          </kbd>
        </div>
      )}
    </form>
  );
};
