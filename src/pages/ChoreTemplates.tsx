
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, ListCheck, SquareDashed } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-800 mb-3">Select a Chore Chart Template</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a starting point for your chore chart, then customize it with your family's needs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border ${getTemplateColor(template.type)}`}
          >
            <CardHeader className={`bg-gradient-to-r ${getTemplateColor(template.type)} pb-0`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {template.name}
                </CardTitle>
                <Badge type={template.type} />
              </div>
              <CardDescription className="text-gray-700">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-48 rounded-md overflow-hidden mb-4 shadow-inner">
                {template.thumbnail ? (
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="h-full w-full object-cover transition-transform hover:scale-105 duration-700"
                  />
                ) : (
                  <div className="bg-gray-100 h-full flex items-center justify-center">
                    {getTemplateIcon(template.type)}
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-700 mr-1">Type:</span>
                  <span className="capitalize text-gray-600">{template.type}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium text-gray-700 mr-1">Chores:</span>
                  <span className="text-gray-600">{template.chores.length} included</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-white to-gray-50 border-t border-gray-100">
              <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Link to={`/customize/${template.id}`}>
                  Choose Template <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
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
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStyles()}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default ChoreTemplates;
