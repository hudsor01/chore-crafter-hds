
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import RecentChartsSection from '@/components/home/RecentChartsSection';

const Index = () => {
  console.log('Index page rendering - this should show in console');
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RecentChartsSection />
    </div>
  );
};

export default Index;
