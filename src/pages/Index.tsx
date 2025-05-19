
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import { Calendar, Check, Plus } from "lucide-react";

const Index = () => {
  const { charts } = useChores();
  
  const recentCharts = charts.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">
          Create and Manage Family Chore Charts
        </h1>
        <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
          Generate beautiful chore charts, assign tasks, and print them out - even when offline!
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link to="/templates">
              <Plus className="mr-2 h-5 w-5" /> Create New Chart
            </Link>
          </Button>
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
            <p className="text-gray-600">
              Select from our pre-defined templates for daily, weekly, or custom chore charts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Customize & Assign</h3>
            <p className="text-gray-600">
              Add your children, assign them chores, and set schedules for each task.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Print & Use</h3>
            <p className="text-gray-600">
              Generate a high-quality PDF chart that can be printed and displayed at home.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Recent Charts</h2>
          <Button variant="ghost" asChild>
            <Link to="/templates">View All</Link>
          </Button>
        </div>
        {recentCharts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCharts.map((chart) => (
              <Card key={chart.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    {chart.name}
                  </CardTitle>
                  <CardDescription>
                    Created on {new Date(chart.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {chart.children.length} children • {chart.assignments.length} tasks
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/view/${chart.id}`}>
                      <Check className="mr-2 h-4 w-4" /> View Chart
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No Charts Yet</CardTitle>
              <CardDescription>
                Create your first chore chart to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Choose a template and customize it with your children's names and chores.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/templates">
                  <Plus className="mr-2 h-4 w-4" /> Create First Chart
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Index;
