
import React, { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, ArrowRight, Sparkles, Star } from "lucide-react";

const HeroSection = memo(() => {
  const featurePills = [
    { color: "emerald", text: "Always Free" },
    { color: "blue", text: "Works Offline" },
    { color: "purple", text: "No Account Required" }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/50 to-purple-50/50"></div>
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 text-sm font-medium mb-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:bg-white">
          <Star className="h-4 w-4 mr-2 text-indigo-500" />
          Trusted by thousands of families worldwide
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Beautiful Chore
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
            Charts Made Simple
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
          Create stunning chore charts, assign tasks, and print them instantly—
          <span className="text-indigo-700 font-semibold"> no signup required</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group border-0">
            <Link to="/templates">
              <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" /> 
              Create Your Chart
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 px-10 py-4 text-lg transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
            <Link to="/templates" className="flex items-center">
              <Sparkles className="mr-3 h-5 w-5" />
              Browse Templates
            </Link>
          </Button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-slate-600">
          {featurePills.map((pill, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <div className={`w-3 h-3 bg-${pill.color}-500 rounded-full animate-pulse`}></div>
              <span className="text-sm font-medium">{pill.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
