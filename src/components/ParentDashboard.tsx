
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChores } from '@/contexts/ChoreContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mail, RefreshCw, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Child } from '@/contexts/ChoreContext';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import AgeBasedSuggestions from './AgeBasedSuggestions';

const ParentDashboard = () => {
  const { user } = useAuth();
  const { charts, isLoading, emailChoreChart, rotateChores } = useChores();
  const [emailTo, setEmailTo] = useState('');
  const [selectedChartId, setSelectedChartId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isRealtimeEnabled] = useState(true);
  const navigate = useNavigate();

  // Enable real-time sync
  useRealtimeSync(() => {
    // This will trigger a refetch when data changes
    console.log('Data changed, dashboard should update');
  });

  // Calculate child ages from birthdate
  const calculateAge = (birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Handler for sending email
  const handleSendEmail = async () => {
    if (!selectedChartId || !emailTo) return;
    
    await emailChoreChart(selectedChartId, emailTo);
    setIsDialogOpen(false);
    setEmailTo('');
  };

  // Handler for chore rotation
  const handleRotateChores = async (chartId: string) => {
    await rotateChores(chartId);
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-4 lg:py-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Parent Dashboard</h1>
        {isRealtimeEnabled && (
          <div className="flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live sync enabled
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Charts</CardTitle>
            <CardDescription>Active charts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{charts.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Children</CardTitle>
            <CardDescription>Across all charts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {charts.reduce((total, chart) => total + chart.children.length, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Total Chores</CardTitle>
            <CardDescription>Custom chores</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {charts.reduce((total, chart) => total + (chart.customChores?.length || 0), 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/templates')} 
              className="w-full"
              size="sm"
            >
              Create New Chart
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Your Chore Charts</h2>
          
          {charts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {charts.map(chart => (
                <Card key={chart.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg truncate">{chart.name}</CardTitle>
                    <CardDescription>
                      Created {new Date(chart.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Children:</span>
                        <span className="ml-1 font-medium">{chart.children.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Chores:</span>
                        <span className="ml-1 font-medium">{chart.customChores?.length || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/view/${chart.id}`)}
                        className="flex-1 min-w-[70px]"
                      >
                        View
                      </Button>
                      
                      <Dialog open={isDialogOpen && selectedChartId === chart.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (open) setSelectedChartId(chart.id);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="px-2">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Email Chore Chart</DialogTitle>
                            <DialogDescription>
                              Send this chart to a parent or child.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email address</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter recipient email"
                                value={emailTo}
                                onChange={(e) => setEmailTo(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button onClick={handleSendEmail} disabled={!emailTo}>
                              Send Email
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRotateChores(chart.id)}
                        className="px-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500 mb-4">
                  You haven't created any charts yet.
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => navigate('/templates')}>
                    Create Your First Chart
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="children" className="mt-4 space-y-4">
          <h2 className="text-xl font-bold mb-4">All Children</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {charts.flatMap(chart => chart.children).map((child, index) => (
              <Card key={`${child.id}-${index}`} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedChild(child)}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  {child.birthdate && (
                    <CardDescription>
                      Age: {calculateAge(child.birthdate)} years
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedChild(child);
                    }}
                    disabled={!child.birthdate}
                    className="w-full"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Suggestions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="suggestions" className="mt-4">
          <h2 className="text-xl font-bold mb-4">AI Chore Suggestions</h2>
          
          {selectedChild ? (
            <AgeBasedSuggestions 
              child={selectedChild}
              onAddChore={(chore) => {
                console.log('Add chore to chart:', chore);
                // TODO: Implement adding chore to chart
              }}
            />
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500">
                  Select a child from the "Children" tab to get age-appropriate chore suggestions.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;
