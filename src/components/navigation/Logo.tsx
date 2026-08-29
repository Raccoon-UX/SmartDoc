import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'md', isLink = true }) => {
  const sizes = {
    sm: {
      icon: 'w-7 h-7',
      text: 'text-lg',
      badge: 'text-[9px] px-1 py-0.2',
    },
    md: {
      icon: 'w-8 h-8',
      text: 'text-xl',
      badge: 'text-[10px] px-1.5 py-0.5',
    },
    lg: {
      icon: 'w-10 h-10',
      text: 'text-2xl',
      badge: 'text-xs px-2 py-0.5',
    },
  };

  const content = (
    <div className={cn('inline-flex items-center gap-2.5 group select-none', className)}>
      {/* SmartDoc Document + Gateway/Folder Icon */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl bg-smartdoc-navy text-white shadow-sm overflow-hidden transition-transform group-hover:scale-105 duration-200',
          sizes[size].icon
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          {/* Main Document Body */}
          <path
            d="M8 5C6.89543 5 6 5.89543 6 7V25C6 26.1046 6.89543 27 8 27H24C25.1046 27 26 26.1046 26 25V11L20 5H8Z"
            fill="#0B132B"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Folded Corner */}
          <path
            d="M20 5V11H26"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Portal / Smart Gateway / Folder Inner Line */}
          <path
            d="M11 16H21M11 20H17"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Active Accent Dot */}
          <circle cx="21" cy="20" r="1.5" fill="#3B82F6" />
        </svg>
      </div>

      {/* Brand Name */}
      <div className="flex items-baseline">
        <span
          className={cn(
            'font-bold tracking-tight text-smartdoc-navy flex items-center',
            sizes[size].text
          )}
        >
          Smart<span className="text-smartdoc-blue">Doc</span>
        </span>
      </div>
    </div>
  );

  if (isLink) {
    return (
      <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-smartdoc-blue/20 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
