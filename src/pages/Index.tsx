
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import { Calendar, Check, Plus, Star, Users, Clock, Award, ArrowRight } from "lucide-react";

const Index = () => {
  const { charts } = useChores();
  
  const recentCharts = charts.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 3);

  const features = [
    {
      icon: Users,
      title: "Family Management",
      description: "Organize chores for multiple children with customizable assignments and responsibilities."
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "Set daily, weekly, or custom schedules that work with your family's routine."
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Visual progress indicators and completion tracking to motivate and celebrate achievements."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/20 via-purple-100/20 to-pink-100/20 rounded-3xl"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium mb-6 transform hover:scale-105 transition-transform duration-200">
            <Star className="h-4 w-4 mr-2" />
            Trusted by families worldwide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Beautiful Chore Charts
            <br />
            <span className="text-4xl md:text-6xl">for Modern Families</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create stunning, interactive chore charts that motivate kids and bring organization to your home. 
            <br />
            <span className="font-medium text-indigo-600">Print, share, or use digitally – works offline too!</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <Link to="/templates">
                <Plus className="mr-2 h-5 w-5" /> 
                Create Your First Chart
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-slate-300 hover:border-indigo-300 hover:bg-indigo-50 px-8 py-4 text-lg transition-all duration-300">
              <Link to="/templates" className="flex items-center">
                View Templates
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-8 text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Always Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Works Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">No Signup Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Families Love ChoreChart
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Simple, powerful tools that make household management a joy instead of a chore.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three simple steps to transform your family's chore routine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Choose a Template",
              description: "Select from our beautiful pre-designed templates for daily, weekly, or custom chore charts.",
              gradient: "from-blue-500 to-indigo-500"
            },
            {
              step: "2",
              title: "Customize & Assign",
              description: "Add your children, assign them chores, and set schedules that work for your family.",
              gradient: "from-indigo-500 to-purple-500"
            },
            {
              step: "3",
              title: "Print & Use",
              description: "Generate a beautiful PDF chart that can be printed and displayed, or use it digitally.",
              gradient: "from-purple-500 to-pink-500"
            }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 text-white text-2xl font-bold shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Charts */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Recent Charts</h2>
            <p className="text-slate-600 mt-2">Your latest chore chart creations</p>
          </div>
          <Button variant="outline" asChild className="hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
            <Link to="/templates">View All Templates</Link>
          </Button>
        </div>
        
        {recentCharts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCharts.map((chart) => (
              <Card key={chart.id} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-900">
                    <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                    {chart.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Created {new Date(chart.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {chart.children.length} children
                    </span>
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      {chart.assignments.length} tasks
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
                    <Link to={`/view/${chart.id}`}>
                      <Check className="mr-2 h-4 w-4" /> 
                      View Chart
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Plus className="h-10 w-10 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl text-slate-900 mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg text-slate-600 mb-6">
                Create your first chore chart and see how easy family organization can be.
              </CardDescription>
              <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <Link to="/templates">
                  <Plus className="mr-2 h-4 w-4" /> 
                  Create Your First Chart
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Index;
