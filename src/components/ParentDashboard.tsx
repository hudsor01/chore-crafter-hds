
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

const ParentDashboard = () => {
  const { user } = useAuth();
  const { charts, isLoading, emailChoreChart, getAgeBasedChores, rotateChores } = useChores();
  const [emailTo, setEmailTo] = useState('');
  const [selectedChartId, setSelectedChartId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

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

  // Handler for generating age-appropriate chore suggestions
  const handleGenerateSuggestions = async (child: Child) => {
    if (!child.birthdate) return;
    
    try {
      setIsGenerating(true);
      const age = calculateAge(child.birthdate);
      const chores = await getAgeBasedChores(age);
      setSuggestions(chores);
    } catch (error) {
      console.error("Error getting suggestions:", error);
    } finally {
      setIsGenerating(false);
    }
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Charts Overview</CardTitle>
            <CardDescription>
              Summary of all your chore charts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{charts.length}</p>
            <p className="text-gray-500">Total Active Charts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Children</CardTitle>
            <CardDescription>
              Children across all charts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {charts.reduce((total, chart) => total + chart.children.length, 0)}
            </p>
            <p className="text-gray-500">Total Children</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Your Chore Charts</h2>
          
          {charts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {charts.map(chart => (
                <Card key={chart.id}>
                  <CardHeader>
                    <CardTitle>{chart.name}</CardTitle>
                    <CardDescription>
                      Created on {new Date(chart.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">Children: {chart.children.length}</p>
                    <p className="mb-4">Chores: {chart.customChores?.length || 0}</p>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/view/${chart.id}`)}
                      >
                        View
                      </Button>
                      
                      <Dialog open={isDialogOpen && selectedChartId === chart.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (open) setSelectedChartId(chart.id);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Mail className="mr-1 h-4 w-4" /> Email
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
                      >
                        <RefreshCw className="mr-1 h-4 w-4" /> Rotate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-gray-500">
                  You haven't created any charts yet.
                </p>
                <div className="flex justify-center mt-4">
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
              <Card key={`${child.id}-${index}`}>
                <CardHeader>
                  <CardTitle>{child.name}</CardTitle>
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
                    onClick={() => child.birthdate && handleGenerateSuggestions(child)}
                    disabled={!child.birthdate || isGenerating}
                  >
                    <Sparkles className="mr-1 h-4 w-4" />
                    Get Age-Appropriate Chores
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="suggestions" className="mt-4">
          <h2 className="text-xl font-bold mb-4">AI Chore Suggestions</h2>
          
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((chore, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {chore.icon && <span className="mr-2">{chore.icon}</span>}
                      {chore.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">{chore.description}</p>
                    {chore.category && (
                      <div className="mt-2">
                        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                          {chore.category}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
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
