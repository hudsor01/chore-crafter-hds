
import React, { memo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Award, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: "Family Management",
    description: "Organize chores for multiple children with customizable assignments and responsibilities."
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Set daily, weekly, or custom schedules that work with your family's routine."
  },
  {
    icon: Award,
    title: "Progress Tracking", 
    description: "Visual progress indicators and completion tracking to motivate and celebrate achievements."
  }
];

const FeatureCard = memo(({ feature, index }: { feature: Feature; index: number }) => (
  <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <CardContent className="p-10 text-center relative z-10">
      <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
        <feature.icon className="h-10 w-10 text-indigo-600 group-hover:text-purple-600 transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-indigo-700 transition-colors duration-300">{feature.title}</h3>
      <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
    </CardContent>
  </Card>
));

FeatureCard.displayName = 'FeatureCard';

const FeaturesSection = memo(() => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Why Families Choose Us
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Powerful tools that make household management enjoyable instead of overwhelming.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
