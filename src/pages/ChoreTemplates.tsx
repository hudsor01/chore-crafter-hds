
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, ListCheck, SquareDashed, Star, Users, Clock, Eye } from "lucide-react";

const ChoreTemplates = () => {
  const { templates } = useChores();

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Calendar className="h-12 w-12 text-indigo-600" />;
      case 'weekly':
        return <ListCheck className="h-12 w-12 text-purple-600" />;
      case 'custom':
        return <SquareDashed className="h-12 w-12 text-emerald-600" />;
      default:
        return <Calendar className="h-12 w-12 text-blue-600" />;
    }
  };

  const getTemplateColor = (type: string) => {
    switch (type) {
      case 'daily':
        return "from-indigo-50 to-blue-100 border-indigo-200";
      case 'weekly':
        return "from-purple-50 to-pink-100 border-purple-200";
      case 'custom':
        return "from-emerald-50 to-teal-100 border-emerald-200";
      default:
        return "from-gray-50 to-slate-100 border-gray-200";
    }
  };

  const getTemplateImage = (type: string) => {
    switch (type) {
      case 'daily':
        return "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=250&q=80";
      case 'weekly':
        return "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=250&q=80";
      case 'custom':
        return "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=250&q=80";
      default:
        return "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.0&auto=format&fit=crop&w=400&h=250&q=80";
    }
  };

  const getRecommendedAge = (type: string) => {
    switch (type) {
      case 'daily':
        return "Ages 4-12";
      case 'weekly':
        return "Ages 8-16";
      case 'custom':
        return "All Ages";
      default:
        return "All Ages";
    }
  };

  const getEstimatedTime = (type: string) => {
    switch (type) {
      case 'daily':
        return "5-15 min/day";
      case 'weekly':
        return "30-60 min/week";
      case 'custom':
        return "Varies";
      default:
        return "Varies";
    }
  };

  return (
    <div className="space-y-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-800 mb-3">Select a Chore Chart Template</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a starting point for your chore chart, then customize it with your family's needs.
        </p>
      </header>

      {/* Template Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Most Popular</p>
              <p className="font-semibold text-indigo-800">Daily Chores</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Family Friendly</p>
              <p className="font-semibold text-green-800">All Templates</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Quick Setup</p>
              <p className="font-semibold text-purple-800">Under 5 min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-2 ${getTemplateColor(template.type)} group`}
          >
            <CardHeader className={`bg-gradient-to-r ${getTemplateColor(template.type)} pb-2`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {template.name}
                </CardTitle>
                <Badge type={template.type} />
              </div>
              <CardDescription className="text-gray-700">{template.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="relative h-48 overflow-hidden">
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
              
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{getRecommendedAge(template.type)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">{getEstimatedTime(template.type)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-1">Chores:</span>
                    <span className="text-gray-600">{template.chores.length} included</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-1">Type:</span>
                    <span className="capitalize text-gray-600">{template.type}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gradient-to-r from-white to-gray-50 border-t border-gray-100 p-4 space-y-2">
              <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 group-hover:bg-indigo-700">
                <Link to={`/customize/${template.id}`}>
                  Choose Template <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full text-gray-600 hover:text-indigo-600 border-gray-300">
                <Eye className="mr-2 h-4 w-4" />
                Preview Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-800 mb-2">Need Help Choosing?</h3>
        <p className="text-gray-700 mb-4">
          Not sure which template is right for your family? Here are some quick tips:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border border-indigo-200">
            <h4 className="font-medium text-indigo-700">Daily Chores</h4>
            <p className="text-gray-600">Perfect for younger children and building consistent habits</p>
          </div>
          <div className="bg-white p-3 rounded border border-indigo-200">
            <h4 className="font-medium text-indigo-700">Weekly Chores</h4>
            <p className="text-gray-600">Great for older kids and more substantial household tasks</p>
          </div>
          <div className="bg-white p-3 rounded border border-indigo-200">
            <h4 className="font-medium text-indigo-700">Custom Chores</h4>
            <p className="text-gray-600">Ideal when you have specific chores or unique family needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for the badge
const Badge = ({ type }: { type: string }) => {
  const getStyles = () => {
    switch (type) {
      case 'daily':
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case 'weekly':
        return "bg-purple-100 text-purple-800 border-purple-200";
      case 'custom':
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStyles()}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default ChoreTemplates;
