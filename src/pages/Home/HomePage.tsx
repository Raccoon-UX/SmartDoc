import React from 'react';
import { HeroSection } from './HeroSection';
import { PopularServicesSection } from './PopularServicesSection';
import { WhatCanIDoSection } from './WhatCanIDoSection';
import { SafetySection } from './SafetySection';
import { HowItWorksStepsSection } from './HowItWorksStepsSection';
import { PopularSearchesSection } from './PopularSearchesSection';
import { BeforeYouApplySection } from './BeforeYouApplySection';
import { TrustValueSection } from './TrustValueSection';
import { FinalCTA } from './FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Search & Trust micro-pills */}
      <HeroSection />

      {/* 2. Popular Document Services Grid */}
      <PopularServicesSection />

      {/* 3. "What can I do today?" Action Cards */}
      <WhatCanIDoSection />

      {/* 4. Stay Safe From Fake Document Websites */}
      <SafetySection />

      {/* 5. From Search to Service — In Three Steps */}
      <HowItWorksStepsSection />

      {/* 6. Popular Searches Keyword Chips */}
      <PopularSearchesSection />

      {/* 7. Before You Apply Checklist */}
      <BeforeYouApplySection />

      {/* 8. Built for Clarity, Privacy, and Trust */}
      <TrustValueSection />

      {/* 9. Final Call to Action */}
      <FinalCTA />
    </div>
  );
};
