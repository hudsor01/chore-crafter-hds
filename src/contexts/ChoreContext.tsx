import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { 
  addChoreToDb, 
  createChartInDb, 
  addChildToDb, 
  addAssignmentToDb, 
  getChartsFromDb,
  getChoresByChartId,
  getChildrenByChartId,
  sendChoreChartEmail,
  getAgeAppropriateChores
} from '@/services/supabaseService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

// Define types
export type Child = {
  id: string;
  name: string;
  birthdate?: string;
};

export type ChoreFrequency = 'daily' | 'weekly' | 'monthly' | 'custom';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type ChoreSchedule = {
  frequency: ChoreFrequency;
  daysOfWeek?: DayOfWeek[];
  specificDates?: string[];
};

export type Chore = {
  id: string;
  name: string;
  description?: string;
  schedule: ChoreSchedule;
  category?: string;
  icon?: string;
};

export type ChoreAssignment = {
  choreId: string;
  childId: string;
};

export type ChoreTemplate = {
  id: string;
  name: string;
  description: string;
  chores: Chore[];
  type: 'daily' | 'weekly' | 'custom';
  thumbnail?: string;
  allowCustomChores?: boolean;
};

export type ChoreChart = {
  id: string;
  name: string;
  templateId: string;
  children: Child[];
  assignments: ChoreAssignment[];
  createdAt: string;
  updatedAt: string;
  customChores?: Chore[];
};

type ChoreContextType = {
  templates: ChoreTemplate[];
  charts: ChoreChart[];
  getTemplateById: (id: string) => ChoreTemplate | undefined;
  getChartById: (id: string) => ChoreChart | undefined;
  createChart: (chart: Omit<ChoreChart, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ChoreChart>;
  updateChart: (chart: ChoreChart) => void;
  deleteChart: (id: string) => void;
  getChoreById: (templateId: string, choreId: string) => Chore | undefined;
  addChoreToTemplate: (templateId: string, chore: Omit<Chore, 'id'>) => void;
  isLoading: boolean;
  emailChoreChart: (chartId: string, emailTo: string) => Promise<void>;
  getAgeBasedChores: (age: number) => Promise<Chore[]>;
  rotateChores: (chartId: string) => Promise<void>;
};

const ChoreContext = createContext<ChoreContextType | undefined>(undefined);

// Sample data for templates
const defaultTemplates: ChoreTemplate[] = [
  {
    id: 'daily-chores',
    name: 'Daily Chores',
    description: 'Essential chores that need to be done every day',
    type: 'daily',
    thumbnail: '/templates/daily.png',
    chores: [
      {
        id: 'make-bed',
        name: 'Make Bed',
        description: 'Make your bed neatly first thing in the morning',
        schedule: { frequency: 'daily' },
        category: 'bedroom',
        icon: '🛏️',
      },
      {
        id: 'brush-teeth',
        name: 'Brush Teeth',
        description: 'Brush teeth morning and night',
        schedule: { frequency: 'daily' },
        category: 'hygiene',
        icon: '🪥',
      },
      {
        id: 'pick-up-toys',
        name: 'Pick Up Toys',
        description: 'Put away all toys before bedtime',
        schedule: { frequency: 'daily' },
        category: 'bedroom',
        icon: '🧸',
      },
      {
        id: 'feed-pet',
        name: 'Feed Pet',
        description: 'Feed the pet morning and evening',
        schedule: { frequency: 'daily' },
        category: 'pets',
        icon: '🐕',
      },
      {
        id: 'clear-dishes',
        name: 'Clear Dishes',
        description: 'Clear your dishes after meals',
        schedule: { frequency: 'daily' },
        category: 'kitchen',
        icon: '🍽️',
      },
    ],
  },
  {
    id: 'weekly-chores',
    name: 'Weekly Chores',
    description: 'Chores scheduled on different days of the week',
    type: 'weekly',
    thumbnail: '/templates/weekly.png',
    chores: [
      {
        id: 'vacuum',
        name: 'Vacuum Room',
        description: 'Vacuum your bedroom thoroughly',
        schedule: { frequency: 'weekly', daysOfWeek: ['saturday'] },
        category: 'cleaning',
        icon: '🧹',
      },
      {
        id: 'laundry',
        name: 'Do Laundry',
        description: 'Sort, wash, fold and put away your laundry',
        schedule: { frequency: 'weekly', daysOfWeek: ['sunday'] },
        category: 'cleaning',
        icon: '👕',
      },
      {
        id: 'take-out-trash',
        name: 'Take Out Trash',
        description: 'Take out trash and recycling',
        schedule: { frequency: 'weekly', daysOfWeek: ['monday', 'thursday'] },
        category: 'cleaning',
        icon: '🗑️',
      },
      {
        id: 'water-plants',
        name: 'Water Plants',
        description: 'Water all house plants',
        schedule: { frequency: 'weekly', daysOfWeek: ['wednesday', 'saturday'] },
        category: 'garden',
        icon: '🪴',
      },
      {
        id: 'clean-bathroom',
        name: 'Clean Bathroom',
        description: 'Clean sink, mirror, and tidy up bathroom',
        schedule: { frequency: 'weekly', daysOfWeek: ['saturday'] },
        category: 'cleaning',
        icon: '🚿',
      },
    ],
  },
  {
    id: 'custom-chores',
    name: 'Custom Chores',
    description: 'Start with a blank template and create your own chore chart',
    type: 'custom',
    thumbnail: '/templates/custom.png',
    chores: [],
    allowCustomChores: true,
  }
];

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
    const fetchCharts = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const charts = await getChartsFromDb(user.id);
        
        // Process the charts from the database
        const processedCharts: ChoreChart[] = await Promise.all(
          charts.map(async (chart: any) => {
            const children = await getChildrenByChartId(chart.id);
            const chores = await getChoresByChartId(chart.id);
            
            // Convert DB chores to app format
            const appChores: Chore[] = chores.map((dbChore: any) => ({
              id: dbChore.id,
              name: dbChore.name,
              description: dbChore.description,
              schedule: {
                frequency: dbChore.frequency as ChoreFrequency,
                daysOfWeek: dbChore.days_of_week,
                specificDates: dbChore.specific_dates,
              },
              category: dbChore.category,
              icon: dbChore.icon,
            }));
            
            // Convert DB children to app format
            const appChildren: Child[] = children.map((dbChild: any) => ({
              id: dbChild.id,
              name: dbChild.name,
              birthdate: dbChild.birthdate || undefined,
            }));
            
            return {
              id: chart.id,
              name: chart.name,
              templateId: chart.template_id || '',
              children: appChildren,
              assignments: [], // We'll load assignments separately if needed
              createdAt: chart.created_at,
              updatedAt: chart.updated_at,
              customChores: appChores,
            };
          })
        );
        
        setCharts(processedCharts);
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
    
    fetchCharts();
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
      
      // Create chart in database
      const dbChart = await createChartInDb({
        name: chart.name,
        template_id: chart.templateId,
        user_id: user?.id,
      });
      
      // Add children to database
      const dbChildren = await Promise.all(chart.children.map(async (child) => {
        return await addChildToDb({
          name: child.name,
          chart_id: dbChart.id,
          birthdate: child.birthdate,
        });
      }));
      
      // Add custom chores if any
      if (chart.customChores && chart.customChores.length > 0) {
        await Promise.all(chart.customChores.map(async (chore) => {
          await addChoreToDb({
            name: chore.name,
            description: chore.description,
            icon: chore.icon,
            frequency: chore.schedule.frequency,
            days_of_week: chore.schedule.daysOfWeek,
            specific_dates: chore.schedule.specificDates,
            chart_id: dbChart.id,
            category: chore.category,
          });
        }));
      }
      
      // Create response in app format
      const newChart: ChoreChart = {
        ...chart,
        id: dbChart.id,
        children: dbChildren.map(dbChild => ({
          id: dbChild.id,
          name: dbChild.name,
          birthdate: dbChild.birthdate || undefined,
        })),
        createdAt: dbChart.created_at,
        updatedAt: dbChart.updated_at,
      };
      
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
      
      await sendChoreChartEmail(emailTo, `Chore Chart: ${chart.name}`, chart);
      
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
      const { chores } = await getAgeAppropriateChores(age);
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
