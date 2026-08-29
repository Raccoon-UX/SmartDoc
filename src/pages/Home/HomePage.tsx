import React from 'react';
import { HeroSection } from './HeroSection';
import { PopularDocuments } from './PopularDocuments';
import { HowItWorksSection } from './HowItWorksSection';
import { WhySmartDoc } from './WhySmartDoc';
import { DirectoryPreview } from './DirectoryPreview';
import { FinalCTA } from './FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PopularDocuments />
      <HowItWorksSection />
      <WhySmartDoc />
      <DirectoryPreview />
      <FinalCTA />
    </div>
  );
};
