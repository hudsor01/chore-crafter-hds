
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import RecentChartsSection from '@/components/home/RecentChartsSection';

const Index = () => {
  console.log('Index page rendering with new color system');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-ocean-50 to-slate-100 space-y-8">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RecentChartsSection />
    </div>
  );
};

export default Index;
