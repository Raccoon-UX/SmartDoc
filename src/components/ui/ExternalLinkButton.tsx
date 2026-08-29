import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Button, ButtonProps } from './Button';
import { cn } from '../../lib/utils';

export interface ExternalLinkButtonProps extends Omit<ButtonProps, 'to' | 'isExternal'> {
  url: string;
  portalName?: string;
  isVerified?: boolean;
  label?: string;
}

export const ExternalLinkButton: React.FC<ExternalLinkButtonProps> = ({
  url,
  portalName,
  isVerified = true,
  label = 'Visit Official Platform',
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Button
        href={url}
        isExternal={true}
        variant={variant}
        size={size}
        rightIcon={ExternalLink}
        className={cn('shadow-xs font-semibold w-full justify-center text-center py-2.5 px-4', className)}
        {...props}
      >
        {label}
      </Button>
      {isVerified && portalName && (
        <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 leading-tight mt-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="truncate">Official portal: <strong className="font-semibold text-slate-800">{portalName}</strong></span>
        </span>
      )}
    </div>
  );
};
