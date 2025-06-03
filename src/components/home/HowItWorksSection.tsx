
import React, { memo } from 'react';
import { Users, Check, Target, LucideIcon } from 'lucide-react';

interface Step {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    step: "1",
    title: "Choose Template",
    description: "Select from beautiful pre-designed templates for daily, weekly, or custom chore charts.",
    icon: Target
  },
  {
    step: "2", 
    title: "Customize & Assign",
    description: "Add your children, assign chores, and set schedules that work for your family.",
    icon: Users
  },
  {
    step: "3",
    title: "Print & Use",
    description: "Generate beautiful PDF charts for printing or use digitally on any device.",
    icon: Check
  }
];

const StepCard = memo(({ item, index }: { item: Step; index: number }) => (
  <div className="text-center group">
    <div className="relative mb-8">
      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-3">
        {item.step}
      </div>
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
        <item.icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors duration-300">{item.title}</h3>
    <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
  </div>
));

StepCard.displayName = 'StepCard';

const HowItWorksSection = memo(() => {
  return (
    <section className="py-24 px-4 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Three simple steps to transform your family's chore routine forever.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <StepCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = 'HowItWorksSection';

export default HowItWorksSection;
