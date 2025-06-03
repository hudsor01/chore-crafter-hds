
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import { Calendar, Check, Plus, Star, Users, Clock, Award, ArrowRight, Sparkles, Zap, Target } from "lucide-react";

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

  const steps = [
    {
      step: "1",
      title: "Choose Template",
      description: "Select from beautiful pre-designed templates for daily, weekly, or custom chore charts.",
      icon: Target
    },
    {
      step: "2", 
      title: "Customize & Assign",
      description: "Add your children, assign chores, and set schedules that work for your family.",
      icon: Users
    },
    {
      step: "3",
      title: "Print & Use",
      description: "Generate beautiful PDF charts for printing or use digitally on any device.",
      icon: Check
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white/50 to-purple-50/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border border-indigo-200/50 text-indigo-700 text-sm font-medium mb-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:bg-white">
            <Star className="h-4 w-4 mr-2 text-indigo-500" />
            Trusted by thousands of families worldwide
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              Beautiful Chore
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Charts Made Simple
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Create stunning chore charts, assign tasks, and print them instantly—
            <span className="text-indigo-700 font-semibold"> no signup required</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group border-0">
              <Link to="/templates">
                <Plus className="mr-3 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" /> 
                Create Your Chart
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 px-10 py-4 text-lg transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
              <Link to="/templates" className="flex items-center">
                <Sparkles className="mr-3 h-5 w-5" />
                Browse Templates
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-slate-600">
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Always Free</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Works Offline</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">No Account Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to transform your family's chore routine forever.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300 group-hover:rotate-3">
                    {item.step}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-700 transition-colors duration-300">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Why Families Choose Us
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Powerful tools that make household management enjoyable instead of overwhelming.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-10 text-center relative z-10">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <feature.icon className="h-10 w-10 text-indigo-600 group-hover:text-purple-600 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-indigo-700 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Charts Section */}
      <section className="py-24 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-bold text-slate-900 mb-4">Your Recent Charts</h2>
              <p className="text-slate-600 text-xl">Pick up where you left off</p>
            </div>
            <Button variant="outline" asChild className="hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 px-8 py-3">
              <Link to="/templates">
                <Sparkles className="mr-2 h-4 w-4" />
                Browse All Templates
              </Link>
            </Button>
          </div>
          
          {recentCharts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentCharts.map((chart) => (
                <Card key={chart.id} className="border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-slate-900 text-xl group-hover:text-indigo-700 transition-colors duration-300">
                      <Calendar className="h-5 w-5 mr-3 text-indigo-600" />
                      {chart.name}
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-base">
                      Created {new Date(chart.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                        <Users className="h-4 w-4 mr-2" />
                        {chart.children.length} children
                      </span>
                      <span className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                        <Check className="h-4 w-4 mr-2" />
                        {chart.assignments.length} tasks
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700 transition-all duration-300 group-hover:shadow-lg">
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
            <Card className="border-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 shadow-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/20"></div>
              <CardContent className="p-16 text-center relative z-10">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mb-8 shadow-lg">
                  <Plus className="h-12 w-12 text-indigo-600" />
                </div>
                <CardTitle className="text-4xl text-slate-900 mb-6">Ready to Get Started?</CardTitle>
                <CardDescription className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Create your first chore chart in minutes. Choose from our beautiful templates and customize it for your family.
                </CardDescription>
                <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 px-10 py-4 text-lg">
                  <Link to="/templates">
                    <Plus className="mr-3 h-5 w-5" /> 
                    Create Your First Chart
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
