import React from 'react';
import {
  Fingerprint,
  CreditCard,
  Plane,
  Car,
  Vote,
  Award,
  FileText,
  LayoutGrid,
  ShieldCheck,
  FolderOpen,
  LucideProps,
} from 'lucide-react';

export interface DocIconProps extends LucideProps {
  name: string;
}

export const DocIcon: React.FC<DocIconProps> = ({ name, className, ...props }) => {
  switch (name.toLowerCase()) {
    case 'fingerprint':
      return <Fingerprint className={className} {...props} />;
    case 'creditcard':
      return <CreditCard className={className} {...props} />;
    case 'plane':
      return <Plane className={className} {...props} />;
    case 'car':
      return <Car className={className} {...props} />;
    case 'vote':
      return <Vote className={className} {...props} />;
    case 'award':
      return <Award className={className} {...props} />;
    case 'layoutgrid':
      return <LayoutGrid className={className} {...props} />;
    case 'shieldcheck':
      return <ShieldCheck className={className} {...props} />;
    case 'folderopen':
      return <FolderOpen className={className} {...props} />;
    default:
      return <FileText className={className} {...props} />;
  }
};
