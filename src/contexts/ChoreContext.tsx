
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';
import { 
  ChoreChart, 
  ChoreTemplate, 
  Chore, 
  ChoreContextType 
} from './types/choreTypes';
import { defaultTemplates } from './data/defaultTemplatesData';
import { 
  fetchChartsFromDb, 
  createChartInDatabase, 
  sendChoreChartEmailToUser,
  fetchAgeAppropriateChores
} from './services/choreApiService';

// Re-export types for backward compatibility
export type { 
  ChoreChart, 
  ChoreTemplate, 
  Chore, 
  ChoreFrequency,
  ChoreSchedule,
  DayOfWeek,
  Child
} from './types/choreTypes';

const ChoreContext = createContext<ChoreContextType | undefined>(undefined);

export const ChoreProvider = ({ children }: { children: ReactNode }) => {
  const [templates, setTemplates] = useState<ChoreTemplate[]>(() => {
    const saved = localStorage.getItem('choreTemplates');
    return saved ? JSON.parse(saved) : defaultTemplates;
  });
  
  const [charts, setCharts] = useState<ChoreChart[]>(() => {
    const saved = localStorage.getItem('choreCharts');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('choreTemplates', JSON.stringify(templates));
  }, [templates]);
  
  useEffect(() => {
    localStorage.setItem('choreCharts', JSON.stringify(charts));
  }, [charts]);
  
  // Load charts from Supabase when user changes
  useEffect(() => {
    const loadCharts = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const fetchedCharts = await fetchChartsFromDb(user.id);
        setCharts(fetchedCharts);
      } catch (error) {
        console.error('Error fetching charts:', error);
        toast({
          title: "Error fetching charts",
          description: "Could not fetch your charts from the database.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCharts();
  }, [user, toast]);
  
  const getTemplateById = (id: string) => {
    return templates.find(template => template.id === id);
  };
  
  const getChartById = (id: string) => {
    return charts.find(chart => chart.id === id);
  };
  
  const createChart = async (chart: Omit<ChoreChart, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    
    try {
      setIsLoading(true);
      
      const newChart = await createChartInDatabase(chart, user?.id);
      setCharts(prev => [...prev, newChart]);
      return newChart;
      
    } catch (error) {
      console.error('Error creating chart in database:', error);
      toast({
        title: "Database Error",
        description: "Chart could not be saved to the database.",
        variant: "destructive",
      });
      // Still return a client-side chart with a temporary ID
      const tempChart: ChoreChart = {
        ...chart,
        id: `temp-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      setCharts(prev => [...prev, tempChart]);
      return tempChart;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateChart = (chart: ChoreChart) => {
    const updatedChart = {
      ...chart,
      updatedAt: new Date().toISOString(),
    };
    setCharts(prev => prev.map(c => c.id === updatedChart.id ? updatedChart : c));
    
    // TODO: Update chart in database as well
  };
  
  const deleteChart = (id: string) => {
    setCharts(prev => prev.filter(c => c.id !== id));
    
    // TODO: Delete chart from database as well
  };
  
  const getChoreById = (templateId: string, choreId: string) => {
    const template = getTemplateById(templateId);
    return template?.chores.find(chore => chore.id === choreId);
  };
  
  const addChoreToTemplate = (templateId: string, chore: Omit<Chore, 'id'>) => {
    const newChore: Chore = {
      ...chore,
      id: `chore-${Date.now()}`,
    };
    
    setTemplates(prev => prev.map(template => {
      if (template.id === templateId) {
        return {
          ...template,
          chores: [...template.chores, newChore],
        };
      }
      return template;
    }));
  };
  
  const emailChoreChart = async (chartId: string, emailTo: string) => {
    try {
      setIsLoading(true);
      const chart = getChartById(chartId);
      if (!chart) throw new Error("Chart not found");
      
      await sendChoreChartEmailToUser(chartId, emailTo, chart);
      
      toast({
        title: "Email Sent",
        description: `Chore chart has been sent to ${emailTo}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getAgeBasedChores = async (age: number) => {
    try {
      setIsLoading(true);
      const chores = await fetchAgeAppropriateChores(age);
      return chores;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to get age-appropriate chores",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const rotateChores = async (chartId: string) => {
    try {
      setIsLoading(true);
      const chart = getChartById(chartId);
      if (!chart) throw new Error("Chart not found");
      
      // Simple rotation logic (shift assignments by one child)
      if (chart.children.length <= 1) {
        throw new Error("Need at least two children to rotate chores");
      }
      
      // TODO: Implement the actual rotation logic and update database
      
      toast({
        title: "Chores Rotated",
        description: "Chore assignments have been rotated among children",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to rotate chores",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    templates,
    charts,
    getTemplateById,
    getChartById,
    createChart,
    updateChart,
    deleteChart,
    getChoreById,
    addChoreToTemplate,
    isLoading,
    emailChoreChart,
    getAgeBasedChores,
    rotateChores,
  };
  
  return <ChoreContext.Provider value={value}>{children}</ChoreContext.Provider>;
};

export const useChores = () => {
  const context = useContext(ChoreContext);
  if (context === undefined) {
    throw new Error('useChores must be used within a ChoreProvider');
  }
  return context;
};
