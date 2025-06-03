
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import RecentChartsSection from '@/components/home/RecentChartsSection';

const Index = () => {
  console.log('Index page rendering - this should show in console');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Add a visible test indicator */}
      <div className="fixed top-20 right-4 z-40 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
        ✅ UI Updates Working!
      </div>
      
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RecentChartsSection />
    </div>
  );
};

export default Index;
