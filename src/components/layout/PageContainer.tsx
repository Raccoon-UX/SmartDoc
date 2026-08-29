import React from 'react';
import { cn } from '../../lib/utils';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  size = 'default',
  ...props
}) => {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12', sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
};
