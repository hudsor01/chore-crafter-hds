
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChores } from '@/contexts/ChoreContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Child } from '@/contexts/ChoreContext';
import { useChartData } from '@/hooks/useChartData';
import AgeBasedSuggestions from './AgeBasedSuggestions';
import { StatsCards } from './dashboard/StatsCards';
import { ChartCard } from './dashboard/ChartCard';
import { EmailChartDialog } from './dashboard/EmailChartDialog';

const ParentDashboard = () => {
  const { user } = useAuth();
  const { emailChoreChart, rotateChores } = useChores();
  const { charts, isLoading } = useChartData(user?.id);
  const [emailTo, setEmailTo] = useState('');
  const [selectedChartId, setSelectedChartId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
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
    setSelectedChartId('');
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
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4 lg:py-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-2">Parent Dashboard</h1>
        <div className="flex items-center text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live sync enabled
        </div>
      </div>
      
      <div className="mb-6">
        <StatsCards 
          charts={charts} 
          onCreateChart={() => navigate('/templates')} 
        />
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
                <ChartCard
                  key={chart.id}
                  chart={chart}
                  onView={() => navigate(`/view/${chart.id}`)}
                  onEmail={() => {
                    setSelectedChartId(chart.id);
                    setIsDialogOpen(true);
                  }}
                  onRotate={() => handleRotateChores(chart.id)}
                />
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
              <Card key={`${child.id}-${index}`} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{child.name}</h3>
                  {child.birthdate && (
                    <p className="text-sm text-gray-500 mb-3">
                      Age: {calculateAge(child.birthdate)} years
                    </p>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedChild(child)}
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

      <EmailChartDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedChartId('');
          setEmailTo('');
        }}
        onSend={handleSendEmail}
        email={emailTo}
        onEmailChange={setEmailTo}
      />
    </div>
  );
};

export default ParentDashboard;
