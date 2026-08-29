import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import logoImg from '../../assets/logo.png';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
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
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  };

  const content = (
    <div
      className={cn(
        'inline-flex items-center gap-2 group select-none transition-transform group-hover:scale-105 duration-200',
        variant === 'dark' && 'bg-white px-2.5 py-1 rounded-xl shadow-xs',
        className
      )}
    >
      <img
        src={logoImg}
        alt="SmartDoc Logo"
        className={cn('w-auto object-contain', heights[size])}
      />
    </div>
  );

  if (isLink) {
    return (
      <Link
        to="/"
        className="focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 rounded-xl inline-flex"
      >
        {content}
      </Link>
    );
  }

  return content;
};
