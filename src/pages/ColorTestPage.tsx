
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Waves, Palette, Heart, Star, Zap, Shield } from "lucide-react";

const ColorTestPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-800 via-cyan-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-full">
              <Waves className="h-12 w-12 text-cyan-300" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            Ocean Breeze + Modern Monochrome
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            Experience the perfect blend of calming ocean tones with sophisticated monochrome aesthetics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Color Palette Display */}
        <Card className="mb-12 shadow-xl border-cyan-200">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-slate-50">
            <CardTitle className="flex items-center text-slate-800">
              <Palette className="h-6 w-6 mr-3 text-cyan-600" />
              Color Palette Preview
            </CardTitle>
            <CardDescription className="text-slate-600">
              Ocean Breeze blues meet Modern Monochrome grays
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-full h-20 bg-cyan-500 rounded-lg mb-2 shadow-lg"></div>
                <p className="text-sm font-medium text-slate-700">Ocean Primary</p>
                <p className="text-xs text-slate-500">#06B6D4</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 bg-cyan-100 rounded-lg mb-2 shadow-lg"></div>
                <p className="text-sm font-medium text-slate-700">Ocean Light</p>
                <p className="text-xs text-slate-500">#CFFAFE</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 bg-slate-800 rounded-lg mb-2 shadow-lg"></div>
                <p className="text-sm font-medium text-slate-700">Mono Dark</p>
                <p className="text-xs text-slate-500">#1E293B</p>
              </div>
              <div className="text-center">
                <div className="w-full h-20 bg-slate-200 rounded-lg mb-2 shadow-lg"></div>
                <p className="text-sm font-medium text-slate-700">Mono Light</p>
                <p className="text-xs text-slate-500">#E2E8F0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sample Form */}
          <Card className="shadow-xl border-cyan-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-slate-50">
              <CardTitle className="text-slate-800">Sample Form</CardTitle>
              <CardDescription className="text-slate-600">
                Experience the new color palette in action
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-medium">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-700 font-medium">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                  placeholder="Your message here..."
                  rows={4}
                />
              </div>
              <div className="flex space-x-3">
                <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white shadow-lg">
                  Primary Action
                </Button>
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                  Secondary
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feature Cards */}
          <div className="space-y-6">
            <Card className="shadow-lg border-cyan-200 bg-gradient-to-br from-cyan-50 to-slate-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-cyan-500 rounded-lg">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Ocean Inspiration</h3>
                    <p className="text-slate-600">Calming blues that evoke the tranquility of ocean waves</p>
                    <Badge className="mt-2 bg-cyan-100 text-cyan-800">New Palette</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Monochrome Elegance</h3>
                    <p className="text-slate-600">Sophisticated grays that provide perfect contrast and readability</p>
                    <Badge variant="outline" className="mt-2 border-slate-300 text-slate-700">Sophisticated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-cyan-200 bg-gradient-to-br from-white to-cyan-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-slate-600 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Perfect Harmony</h3>
                    <p className="text-slate-600">The ideal balance between vibrant accents and neutral foundations</p>
                    <div className="flex space-x-2 mt-2">
                      <Badge className="bg-cyan-500 text-white">Modern</Badge>
                      <Badge variant="outline" className="border-slate-300 text-slate-700">Balanced</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Example */}
        <Card className="mt-12 shadow-xl border-cyan-200">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-cyan-900 text-white">
            <CardTitle className="flex items-center">
              <Star className="h-6 w-6 mr-3 text-cyan-300" />
              Navigation Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" className="text-slate-700 hover:text-cyan-600 hover:bg-cyan-50">
                Home
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:text-cyan-600 hover:bg-cyan-50">
                Templates
              </Button>
              <Button variant="ghost" className="text-slate-700 hover:text-cyan-600 hover:bg-cyan-50">
                Pricing
              </Button>
              <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white">
                Get Started
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ColorTestPage;
