
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start free and upgrade when you need more advanced features for your family
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <Card className="border-2 border-green-200 relative">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Free Forever</CardTitle>
            <div className="text-4xl font-bold text-green-600 mt-2">$0</div>
            <p className="text-gray-600">Perfect for getting started</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-2 border-purple-200 relative">
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
            Most Popular
          </Badge>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <Crown className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-2xl">Pro Family</CardTitle>
            <div className="text-4xl font-bold text-purple-600 mt-2">
              $9.99
              <span className="text-base text-gray-600 font-normal">/month</span>
            </div>
            <p className="text-gray-600">Full-featured family management</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 text-purple-600 mr-3 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate('/auth')}
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Pro Trial
            </Button>
            <p className="text-xs text-gray-500 text-center">
              14-day free trial, then $9.99/month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Comparison */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Feature Breakdown</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-600">Core Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Drag & Drop Interface</p>
              <p>• Role Management</p>
              <p>• Leaderboards</p>
              <p>• Data Export</p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-green-600">Financial Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Banking Integration</p>
              <p>• Allowance Tracking</p>
              <p>• Reward Management</p>
              <p>• Spending Analytics</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg text-purple-600">Smart Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Google Calendar Sync</p>
              <p>• IoT Device Control</p>
              <p>• Voice Commands</p>
              <p>• Smart Home Integration</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg text-orange-600">Social & Learning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Family Groups</p>
              <p>• Educational Content</p>
              <p>• Chat & Messaging</p>
              <p>• Achievement Sharing</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Can I switch plans anytime?</h3>
              <p className="text-gray-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">What happens to my data if I downgrade?</h3>
              <p className="text-gray-600">Your data is never deleted. If you exceed free plan limits, some features will be disabled until you upgrade again.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Is there a family discount?</h3>
              <p className="text-gray-600">Our Pro plan covers unlimited family members, making it cost-effective for large families.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
