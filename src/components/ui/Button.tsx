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
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]';

    const variants = {
      primary:
        'bg-smartdoc-blue text-white hover:bg-smartdoc-blue-dark shadow-sm focus:ring-smartdoc-blue border border-transparent',
      navy: 'bg-smartdoc-navy text-white hover:bg-smartdoc-navy-light shadow-sm focus:ring-smartdoc-navy border border-transparent',
      secondary:
        'bg-smartdoc-blue-soft text-smartdoc-blue-dark hover:bg-smartdoc-blue/15 border border-smartdoc-blue-border focus:ring-smartdoc-blue',
      outline:
        'bg-white text-smartdoc-navy hover:bg-smartdoc-slate-subtle border border-smartdoc-slate-border focus:ring-smartdoc-blue',
      ghost:
        'bg-transparent text-smartdoc-slate-text hover:bg-smartdoc-slate-subtle hover:text-smartdoc-navy focus:ring-smartdoc-blue',
      success:
        'bg-smartdoc-green text-white hover:bg-smartdoc-green-dark shadow-sm focus:ring-smartdoc-green border border-transparent',
      danger:
        'bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500 border border-transparent',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
    };

    const combinedClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    );

    const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

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
