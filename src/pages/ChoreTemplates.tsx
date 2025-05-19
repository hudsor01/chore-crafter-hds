
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const ChoreTemplates = () => {
  const { templates } = useChores();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Select a Template</h1>
        <p className="text-gray-600">
          Choose a starting point for your chore chart, then customize it with your family's needs.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                {template.name}
              </CardTitle>
              <CardDescription className="text-gray-600">{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                {template.thumbnail ? (
                  <img src={template.thumbnail} alt={template.name} className="h-full w-full object-cover rounded-md" />
                ) : (
                  <div className="text-gray-400 text-2xl flex items-center justify-center h-full">
                    <Calendar className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Type:</strong> {template.type}</p>
                <p><strong>Chores:</strong> {template.chores.length} included</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
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

export default ChoreTemplates;
