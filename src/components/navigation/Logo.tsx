import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import logoImg from '../../assets/logo.png';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLink?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  isLink = true,
  variant = 'auto',
}) => {
  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20',
  };

  const content = (
    <div
      className={cn(
        'inline-flex items-center gap-2 group select-none transition-transform duration-200',
        variant === 'dark' && 'bg-white px-3 py-1.5 rounded-xl shadow-xs',
        className
      )}
    >
      <img
        src={logoImg}
        alt="SmartDoc Logo"
        className={cn('w-auto object-contain transition-all', heights[size])}
      />
    </div>
  );

  if (isLink) {
    return (
      <Link
        to="/"
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl inline-flex items-center"
      >
        {content}
      </Link>
    );
  }

  return content;
};
