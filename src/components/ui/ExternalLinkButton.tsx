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
    <div className="flex flex-col gap-1.5">
      <Button
        href={url}
        isExternal={true}
        variant={variant}
        size={size}
        rightIcon={ExternalLink}
        className={cn('shadow-sm font-semibold', className)}
        {...props}
      >
        {label}
      </Button>
      {isVerified && portalName && (
        <span className="inline-flex items-center gap-1 text-[11px] text-smartdoc-slate-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-smartdoc-green-dark" />
          <span>Official portal: <span className="font-medium text-smartdoc-navy">{portalName}</span></span>
        </span>
      )}
    </div>
  );
};
