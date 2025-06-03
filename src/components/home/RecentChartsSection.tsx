
import React, { memo, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useChores } from "@/contexts/ChoreContext";
import { Link } from "react-router-dom";
import { Calendar, Check, Plus, Users, Sparkles } from "lucide-react";

const EmptyState = memo(() => (
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
));

EmptyState.displayName = 'EmptyState';

const ChartCard = memo(({ chart }: { chart: any }) => (
  <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
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
));

ChartCard.displayName = 'ChartCard';

const RecentChartsSection = memo(() => {
  const { charts } = useChores();
  
  const recentCharts = useMemo(() => 
    charts.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ).slice(0, 3),
    [charts]
  );

  return (
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
              <ChartCard key={chart.id} chart={chart} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
});

RecentChartsSection.displayName = 'RecentChartsSection';

export default RecentChartsSection;
