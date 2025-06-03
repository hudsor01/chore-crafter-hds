
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import RecentChartsSection from '@/components/home/RecentChartsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RecentChartsSection />
    </div>
  );
};

export default Index;
