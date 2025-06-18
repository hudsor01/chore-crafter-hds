import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  ListCheck,
  SquareDashed,
  Star,
  Users,
  Clock,
  Eye,
  Waves,
} from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ChoreTemplates = () => {
  const { templates } = useChores();
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <Calendar className="h-8 w-8 text-cyan-600" />;
      case "weekly":
        return <ListCheck className="h-8 w-8 text-cyan-700" />;
      case "custom":
        return <SquareDashed className="h-8 w-8 text-cyan-500" />;
      default:
        return <Calendar className="h-8 w-8 text-cyan-600" />;
    }
  };

  const getTemplateImage = (type: string) => {
    switch (type) {
      case "daily":
        return "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=200&q=80";
      case "weekly":
        return "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=200&q=80";
      case "custom":
        return "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=200&q=80";
      default:
        return "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=200&q=80";
    }
  };

  const getRecommendedAge = (type: string) => {
    switch (type) {
      case "daily":
        return "Ages 4-12";
      case "weekly":
        return "Ages 8-16";
      case "custom":
        return "All Ages";
      default:
        return "All Ages";
    }
  };

  const getEstimatedTime = (type: string) => {
    switch (type) {
      case "daily":
        return "5-15 min/day";
      case "weekly":
        return "30-60 min/week";
      case "custom":
        return "Varies";
      default:
        return "Varies";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100">
      {/* Ocean-inspired header */}
      <div className="bg-gradient-to-r from-slate-800 via-cyan-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-full">
              <Waves className="h-12 w-12 text-cyan-300" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            Select a Chore Chart Template
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            Choose a starting point for your chore chart, then customize it with
            your family's needs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Template Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          <div className="bg-gradient-to-r from-cyan-50 to-slate-50 p-6 rounded-xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center">
              <Star className="h-10 w-10 text-cyan-600 mr-4" />
              <div>
                <p className="text-sm text-slate-600 mb-1">Most Popular</p>
                <p className="font-semibold text-slate-800 text-lg">
                  Daily Chores
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-slate-50 to-cyan-50 p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-cyan-600 mr-4" />
              <div>
                <p className="text-sm text-slate-600 mb-1">Family Friendly</p>
                <p className="font-semibold text-slate-800 text-lg">
                  All Templates
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-cyan-50 to-slate-50 p-6 rounded-xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center">
              <Clock className="h-10 w-10 text-slate-600 mr-4" />
              <div>
                <p className="text-sm text-slate-600 mb-1">Quick Setup</p>
                <p className="font-semibold text-slate-800 text-lg">
                  Under 5 min
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Template Cards */}
        <div className="responsive-card-grid max-w-7xl mx-auto">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 border-cyan-200 bg-white/80 backdrop-blur-sm group h-full flex flex-col min-h-[500px] w-full max-w-none"
            >
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-slate-50 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-semibold text-slate-800">
                    {template.name}
                  </CardTitle>
                  <Badge type={template.type} />
                </div>
                <CardDescription className="text-slate-600 text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 flex-grow">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={getTemplateImage(template.type)}
                    alt={template.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    {getTemplateIcon(template.type)}
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-slate-500 mr-2" />
                        <span className="text-slate-600">
                          {getRecommendedAge(template.type)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-500 mr-2" />
                        <span className="text-slate-600">
                          {getEstimatedTime(template.type)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm bg-gradient-to-r from-slate-50 to-cyan-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center">
                      <span className="font-medium text-slate-700 mr-1">
                        Chores:
                      </span>
                      <span className="text-slate-600">
                        {template.chores.length} included
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-slate-700 mr-1">
                        Type:
                      </span>
                      <span className="capitalize text-slate-600">
                        {template.type}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gradient-to-r from-white to-slate-50 border-t border-slate-100 p-4 space-y-3 mt-auto">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white font-medium shadow-lg"
                >
                  <Link to={`/customize/${template.id}`}>
                    Choose Template <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-slate-600 hover:text-cyan-600 border-slate-300 hover:border-cyan-300 hover:bg-cyan-50"
                  onClick={() => setPreviewTemplate(template)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-gradient-to-r from-cyan-50 to-slate-50 rounded-xl p-8 border border-cyan-200 max-w-5xl mx-auto shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-3">
            Need Help Choosing?
          </h3>
          <p className="text-slate-600 mb-6 text-lg">
            Not sure which template is right for your family? Here are some
            quick tips:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white p-5 rounded-lg border border-cyan-200 hover:shadow-md transition-shadow duration-300">
              <h4 className="font-medium text-cyan-700 mb-2 text-lg">
                Daily Chores
              </h4>
              <p className="text-slate-600">
                Perfect for younger children and building consistent habits
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-cyan-200 hover:shadow-md transition-shadow duration-300">
              <h4 className="font-medium text-cyan-700 mb-2 text-lg">
                Weekly Chores
              </h4>
              <p className="text-slate-600">
                Great for older kids and more substantial household tasks
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg border border-cyan-200 hover:shadow-md transition-shadow duration-300">
              <h4 className="font-medium text-cyan-700 mb-2 text-lg">
                Custom Chores
              </h4>
              <p className="text-slate-600">
                Ideal when you have specific chores or unique family needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Template Dialog */}
      <Dialog
        open={!!previewTemplate}
        onOpenChange={() => setPreviewTemplate(null)}
      >
        <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-cyan-50 border-cyan-200">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center">
              {previewTemplate && getTemplateIcon(previewTemplate.type)}
              <span className="ml-3">{previewTemplate?.name}</span>
            </DialogTitle>
            <DialogDescription className="text-slate-600 text-lg">
              {previewTemplate?.description}
            </DialogDescription>
          </DialogHeader>

          {previewTemplate && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-1">Recommended Age</p>
                  <p className="font-semibold text-slate-700">
                    {getRecommendedAge(previewTemplate.type)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-1">Time Commitment</p>
                  <p className="font-semibold text-slate-700">
                    {getEstimatedTime(previewTemplate.type)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">
                  Included Chores ({previewTemplate.chores.length})
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {previewTemplate.chores.length > 0 ? (
                    previewTemplate.chores.map((chore: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-cyan-300 transition-colors"
                      >
                        <span className="text-2xl mr-3">{chore.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">
                            {chore.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {chore.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <p className="text-lg">Start with a blank canvas</p>
                      <p className="text-sm">
                        Add your own custom chores to get started
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  asChild
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600"
                >
                  <Link to={`/customize/${previewTemplate.id}`}>
                    Choose This Template <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                  className="px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper component for the badge
const Badge = ({ type }: { type: string }) => {
  const getStyles = () => {
    switch (type) {
      case "daily":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "weekly":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "custom":
        return "bg-cyan-100 text-cyan-700 border-cyan-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStyles()}`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default ChoreTemplates;
