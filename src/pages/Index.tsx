import React, { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import RecentChartsSection from "@/components/home/RecentChartsSection";

const Index = () => {
  console.log(
    "Index page rendering with Ocean Breeze + Modern Monochrome design system",
  );

  useEffect(() => {
    // Force color palette application
    document.documentElement.style.setProperty("--background", "248 250 252");
    document.documentElement.style.setProperty("--primary", "6 182 212");
    document.documentElement.style.setProperty("--foreground", "30 41 59");

    // Remove any persistent toasts
    const removeAllToasts = () => {
      const selectors = [
        ".Toaster",
        "[data-sonner-toaster]",
        ".sonner-toast",
        "[data-toast-viewport]",
        'div[role="status"]',
        'div[role="region"][aria-label*="toast"]',
      ];

      selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          (el as HTMLElement).remove();
        });
      });
    };

    removeAllToasts();
    const interval = setInterval(removeAllToasts, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-cyan-50 to-teal-50 space-y-6">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <RecentChartsSection />
    </div>
  );
};

export default Index;
