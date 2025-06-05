
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ArrowRight, ArrowLeft, CheckCircle, Sparkles, Target, Zap } from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to ChoreChart! 🎉',
      description: 'Create beautiful chore charts that make household management fun for the whole family.',
      icon: <Sparkles className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'templates',
      title: 'Choose Your Template',
      description: 'Start with our pre-designed templates for daily, weekly, or custom chore schedules.',
      icon: <Target className="h-8 w-8 text-green-500" />
    },
    {
      id: 'shortcuts',
      title: 'Power User Tips',
      description: 'Use keyboard shortcuts: Ctrl+N for new chart, Ctrl+S to save, and Ctrl+P to print.',
      icon: <Zap className="h-8 w-8 text-yellow-500" />
    },
    {
      id: 'complete',
      title: 'You\'re All Set!',
      description: 'Ready to create your first chore chart? Let\'s make household management magical!',
      icon: <CheckCircle className="h-8 w-8 text-purple-500" />
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Card className={`w-full max-w-md transform transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="text-sm text-slate-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-slate-100 rounded-full">
                {steps[currentStep].icon}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{steps[currentStep].title}</h2>
            <p className="text-slate-600">{steps[currentStep].description}</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentStep ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={nextStep} className="flex items-center">
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
