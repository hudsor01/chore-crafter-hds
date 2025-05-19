import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { 
  addChoreToDb, 
  createChartInDb, 
  addChildToDb, 
  addAssignmentToDb, 
  getChartsFromDb,
  getChoresByChartId,
  getChildrenByChartId
} from '@/services/supabaseService';
import { useToast } from '@/components/ui/use-toast';

// Define types
export type Child = {
  id: string;
  name: string;
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
  createChart: (chart: Omit<ChoreChart, 'id' | 'createdAt' | 'updatedAt'>) => ChoreChart;
  updateChart: (chart: ChoreChart) => void;
  deleteChart: (id: string) => void;
  getChoreById: (templateId: string, choreId: string) => Chore | undefined;
  addChoreToTemplate: (templateId: string, chore: Omit<Chore, 'id'>) => void;
  isLoading: boolean;
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
  
  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('choreTemplates', JSON.stringify(templates));
  }, [templates]);
  
  useEffect(() => {
    localStorage.setItem('choreCharts', JSON.stringify(charts));
  }, [charts]);
  
  // Load charts from Supabase on initial load
  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setIsLoading(true);
        const data = await getChartsFromDb();
        
        // Convert database charts to our application format
        // This is a placeholder for now - actual implementation will depend on your data structure
        // setCharts(convertDbChartsToAppFormat(data));
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
    
    // Uncomment when ready to fetch from Supabase
    // fetchCharts();
  }, []);
  
  const getTemplateById = (id: string) => {
    return templates.find(template => template.id === id);
  };
  
  const getChartById = (id: string) => {
    return charts.find(chart => chart.id === id);
  };
  
  const createChart = async (chart: Omit<ChoreChart, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    
    // Create chart in local state
    const newChart: ChoreChart = {
      ...chart,
      id: `chart-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    
    setCharts(prev => [...prev, newChart]);
    
    try {
      // Create chart in database
      const dbChart = await createChartInDb({
        name: newChart.name,
        template_id: newChart.templateId,
      });
      
      // Add children to database
      for (const child of chart.children) {
        await addChildToDb({
          name: child.name,
          chart_id: dbChart.id,
        });
      }
      
      // Add custom chores if any
      if (chart.customChores && chart.customChores.length > 0) {
        for (const chore of chart.customChores) {
          await addChoreToDb({
            name: chore.name,
            description: chore.description,
            icon: chore.icon,
            frequency: chore.schedule.frequency,
            days_of_week: chore.schedule.daysOfWeek,
            chart_id: dbChart.id,
            category: chore.category,
          });
        }
      }
      
      // For now, we'll keep using the local version
      // Later we can update the chart with the database IDs
      
    } catch (error) {
      console.error('Error creating chart in database:', error);
      toast({
        title: "Database Error",
        description: "Chart created locally but could not be saved to the database.",
        variant: "destructive",
      });
    }
    
    return newChart;
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
