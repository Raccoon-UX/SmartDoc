import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'indigo' | 'violet' | 'navy' | 'green' | 'amber' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'indigo',
  size = 'md',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-lg tracking-normal transition-colors';

  const variants = {
    blue: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    violet: 'bg-violet-50 text-violet-700 border border-violet-100',
    navy: 'bg-slate-900 text-white border border-transparent',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    outline: 'bg-white text-slate-700 border border-slate-200 shadow-xs',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant] || variants.indigo, sizes[size], className)}
      {...props}
    >
      {Icon && <Icon className={iconSizes[size]} />}
      <span>{children}</span>
    </span>
  );
};
