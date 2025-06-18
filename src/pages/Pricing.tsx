import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    "Progress Tracking",
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
    "Priority Support",
  ];

  const enterpriseFeatures = [
    "Everything in Pro",
    "Custom Branding & White Label",
    "Advanced User Management",
    "API Access & Integrations",
    "Dedicated Account Manager",
    "Custom Training & Onboarding",
    "SLA & 24/7 Priority Support",
    "Advanced Security & Compliance",
    "Custom Feature Development",
    "Multi-Organization Management",
    "Advanced Reporting & Analytics",
    "Enterprise SSO Integration",
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Transparent Pricing
          </div>
          <h1 className="text-5xl font-bold mb-6 text-slate-900">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Start free and unlock premium features as your family grows.
            <br />
            <span className="font-medium text-blue-600">
              Always transparent, always fair.
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {/* Free Plan */}
          <Card className="border-2 border-green-200 relative bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Free Forever
              </CardTitle>
              <div className="text-5xl font-bold text-green-600 mt-4">$0</div>
              <p className="text-slate-600 mt-2 text-lg">
                Perfect for getting started
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => navigate("/auth")}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-purple-200 relative bg-white shadow-xl hover:shadow-2xl transition-all duration-300 scale-105">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 text-sm font-medium">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Crown className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Pro Family
              </CardTitle>
              <div className="text-5xl font-bold text-purple-600 mt-4">
                $9.99
                <span className="text-lg text-slate-600 font-normal">
                  /month
                </span>
              </div>
              <p className="text-slate-600 mt-2 text-lg">
                Full-featured family management
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-purple-600" />
                    </div>
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate("/auth")}
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

          {/* Enterprise Plan */}
          <Card className="border-2 border-teal-200 relative bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Enterprise
              </CardTitle>
              <div className="text-5xl font-bold text-teal-600 mt-4">
                Custom
              </div>
              <p className="text-slate-600 mt-2 text-lg">
                For schools & organizations
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {enterpriseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-3 w-3 text-teal-600" />
                    </div>
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => navigate("/contact")}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-slate-500 text-center">
                Custom pricing based on needs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about ChoreChart pricing and features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "Can I switch plans anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.",
              },
              {
                question: "What happens to my data if I downgrade?",
                answer:
                  "Your data is never deleted. If you exceed free plan limits, some features will be disabled until you upgrade again.",
              },
              {
                question: "Is there a family discount?",
                answer:
                  "Our Pro plan covers unlimited family members, making it cost-effective for large families.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "Yes, we offer a 30-day money-back guarantee on all Pro subscriptions. No questions asked.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-slate-900 mb-3 text-lg">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
