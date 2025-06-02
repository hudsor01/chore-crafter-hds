
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const freeFeatures = [
    "Drag & Drop Chore Assignment",
    "Parent/Child Role Management", 
    "Sibling Competition Leaderboards",
    "PDF & CSV Export",
    "Up to 3 Charts",
    "Up to 5 Children per Chart",
    "Basic Chore Templates",
    "Progress Tracking"
  ];

  const proFeatures = [
    "Everything in Free",
    "Banking Integration & Allowance Tracking",
    "Educational Content Library",
    "Social Features & Family Groups",
    "Google Ecosystem Integration",
    "IoT Device Integration",
    "In-App Chat & Messaging",
    "Voice Commands Support",
    "Unlimited Charts & Children",
    "Advanced Analytics",
    "Custom Branding",
    "Priority Support"
  ];

  const featureCategories = [
    {
      title: "Core Features",
      icon: Star,
      color: "blue",
      features: ["Drag & Drop Interface", "Role Management", "Leaderboards", "Data Export"]
    },
    {
      title: "Financial Features", 
      icon: Zap,
      color: "green",
      features: ["Banking Integration", "Allowance Tracking", "Reward Management", "Spending Analytics"]
    },
    {
      title: "Smart Integration",
      icon: Crown,
      color: "purple", 
      features: ["Google Calendar Sync", "IoT Device Control", "Voice Commands", "Smart Home Integration"]
    },
    {
      title: "Social & Learning",
      icon: Sparkles,
      color: "orange",
      features: ["Family Groups", "Educational Content", "Chat & Messaging", "Achievement Sharing"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium mb-6">
          <Star className="h-4 w-4 mr-2" />
          Transparent Pricing
        </div>
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Start free and unlock premium features as your family grows. 
          <br />
          <span className="font-medium text-indigo-600">Always transparent, always fair.</span>
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
        {/* Free Plan */}
        <Card className="border-2 border-green-200 relative bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Free Forever</CardTitle>
            <div className="text-5xl font-bold text-green-600 mt-4">$0</div>
            <p className="text-slate-600 mt-2 text-lg">Perfect for getting started</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-4">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center group">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-2 border-purple-200 relative bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-medium">
            Most Popular
          </Badge>
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-slate-900">Pro Family</CardTitle>
            <div className="text-5xl font-bold text-purple-600 mt-4">
              $9.99
              <span className="text-lg text-slate-600 font-normal">/month</span>
            </div>
            <p className="text-slate-600 mt-2 text-lg">Full-featured family management</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-4">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center group">
                  <div className="flex-shrink-0 w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors duration-200">
                    <Check className="h-3 w-3 text-purple-600" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate('/auth')}
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Pro Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-slate-500 text-center">
              14-day free trial, then $9.99/month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Breakdown */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Feature Breakdown</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful tools designed to make family management effortless and engaging.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCategories.map((category, index) => {
            const colorMap = {
              blue: { bg: "from-blue-100 to-indigo-100", text: "text-blue-600", border: "border-blue-200" },
              green: { bg: "from-green-100 to-emerald-100", text: "text-green-600", border: "border-green-200" },
              purple: { bg: "from-purple-100 to-pink-100", text: "text-purple-600", border: "border-purple-200" },
              orange: { bg: "from-orange-100 to-amber-100", text: "text-orange-600", border: "border-orange-200" }
            };
            const colors = colorMap[category.color as keyof typeof colorMap];
            
            return (
              <Card key={index} className={`border-2 ${colors.border} bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group`}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <CardTitle className={`text-lg ${colors.text} font-bold`}>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <p key={featureIndex} className="text-sm text-slate-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </p>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about ChoreChart pricing and features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "Can I switch plans anytime?",
              answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle."
            },
            {
              question: "What happens to my data if I downgrade?",
              answer: "Your data is never deleted. If you exceed free plan limits, some features will be disabled until you upgrade again."
            },
            {
              question: "Is there a family discount?",
              answer: "Our Pro plan covers unlimited family members, making it cost-effective for large families."
            },
            {
              question: "Do you offer refunds?",
              answer: "Yes, we offer a 30-day money-back guarantee on all Pro subscriptions. No questions asked."
            }
          ].map((faq, index) => (
            <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
