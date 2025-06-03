
import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChores } from '@/contexts/ChoreContext';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Child } from '@/contexts/ChoreContext';
import { useChartData } from '@/hooks/useChartData';
import { StatsCards } from './dashboard/StatsCards';
import { EmailChartDialog } from './dashboard/EmailChartDialog';
import { useChoreCompletions } from '@/hooks/useChoreCompletions';
import DashboardTabs from './dashboard/DashboardTabs';

const ParentDashboard = memo(() => {
  const { user } = useAuth();
  const { emailChoreChart, rotateChores } = useChores();
  const { charts, isLoading } = useChartData(user?.id);
  const [emailTo, setEmailTo] = useState('');
  const [selectedChartId, setSelectedChartId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const navigate = useNavigate();

  // Calculate child ages from birthdate
  const calculateAge = useCallback((birthdate: string) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }, []);

  // Handler for sending email
  const handleSendEmail = useCallback(async () => {
    if (!selectedChartId || !emailTo) return;
    
    await emailChoreChart(selectedChartId, emailTo);
    setIsDialogOpen(false);
    setEmailTo('');
    setSelectedChartId('');
  }, [selectedChartId, emailTo, emailChoreChart]);

  // Handler for chore rotation
  const handleRotateChores = useCallback(async (chartId: string) => {
    await rotateChores(chartId);
  }, [rotateChores]);

  // Handler for email chart
  const handleEmailChart = useCallback((chartId: string) => {
    setSelectedChartId(chartId);
    setIsDialogOpen(true);
  }, []);

  // Handler for view chart
  const handleViewChart = useCallback((chartId: string) => {
    navigate(`/view/${chartId}`);
  }, [navigate]);

  // Handler for create chart
  const handleCreateChart = useCallback(() => {
    navigate('/templates');
  }, [navigate]);

  // Handler for select child
  const handleSelectChild = useCallback((child: Child) => {
    setSelectedChild(child);
  }, []);

  // Memoized children from all charts
  const allChildren = useMemo(() => 
    charts.flatMap(chart => chart.children),
    [charts]
  );

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Get the first chart ID for completions, or empty string if no charts
  const firstChartId = charts.length > 0 ? charts[0].id : '';
  const { completions } = useChoreCompletions(firstChartId);

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
          onCreateChart={handleCreateChart} 
        />
      </div>
      
      <DashboardTabs
        charts={charts}
        children={allChildren}
        completions={completions}
        selectedChild={selectedChild}
        onCreateChart={handleCreateChart}
        onViewChart={handleViewChart}
        onEmailChart={handleEmailChart}
        onRotateChores={handleRotateChores}
        onSelectChild={handleSelectChild}
        calculateAge={calculateAge}
      />

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
});

ParentDashboard.displayName = 'ParentDashboard';

export default ParentDashboard;
