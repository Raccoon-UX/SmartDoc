import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  isExternal?: boolean;
  leftIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  rightIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      href,
      to,
      isExternal = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-150 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs focus-visible:ring-indigo-500 border border-transparent',
      navy:
        'bg-slate-900 text-white hover:bg-slate-800 shadow-xs focus-visible:ring-slate-900 border border-transparent',
      secondary:
        'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100/80 border border-indigo-100 focus-visible:ring-indigo-500',
      outline:
        'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:border-slate-300 focus-visible:ring-indigo-500',
      ghost:
        'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-indigo-500',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs focus-visible:ring-emerald-500 border border-transparent',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-xs focus-visible:ring-rose-500 border border-transparent',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 min-h-[34px] gap-1.5',
      md: 'text-xs sm:text-sm px-4 py-2 min-h-[40px] gap-2',
      lg: 'text-sm sm:text-base px-5 py-2.5 min-h-[44px] gap-2.5 font-semibold',
    };

    const combinedClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-4.5 h-4.5' : 'w-4 h-4';

    const content = (
      <>
        {isLoading && (
          <svg
            className={cn('animate-spin -ml-1 mr-2', iconSize)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && LeftIcon && <LeftIcon className={iconSize} />}
        <span>{children}</span>
        {!isLoading && RightIcon && <RightIcon className={iconSize} />}
      </>
    );

    if (to) {
      return (
        <Link to={to} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={combinedClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
