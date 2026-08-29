import React from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'navy' | 'green' | 'amber' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'blue',
  size = 'md',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide transition-colors';

  const variants = {
    blue: 'bg-smartdoc-blue-soft text-smartdoc-blue-dark border border-smartdoc-blue-border',
    navy: 'bg-smartdoc-navy text-white border border-transparent',
    green: 'bg-smartdoc-green-soft text-smartdoc-green-dark border border-smartdoc-green-border',
    amber: 'bg-smartdoc-amber-soft text-amber-800 border border-smartdoc-amber-border',
    slate: 'bg-smartdoc-slate-subtle text-smartdoc-slate-text border border-smartdoc-slate-border',
    outline: 'bg-transparent text-smartdoc-slate-text border border-smartdoc-slate-border',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && <Icon className={iconSizes[size]} />}
      <span>{children}</span>
    </span>
  );
};
