
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
};

export type ChoreChart = {
  id: string;
  name: string;
  templateId: string;
  children: Child[];
  assignments: ChoreAssignment[];
  createdAt: string;
  updatedAt: string;
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
  
  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('choreTemplates', JSON.stringify(templates));
  }, [templates]);
  
  useEffect(() => {
    localStorage.setItem('choreCharts', JSON.stringify(charts));
  }, [charts]);
  
  const getTemplateById = (id: string) => {
    return templates.find(template => template.id === id);
  };
  
  const getChartById = (id: string) => {
    return charts.find(chart => chart.id === id);
  };
  
  const createChart = (chart: Omit<ChoreChart, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newChart: ChoreChart = {
      ...chart,
      id: `chart-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setCharts(prev => [...prev, newChart]);
    return newChart;
  };
  
  const updateChart = (chart: ChoreChart) => {
    const updatedChart = {
      ...chart,
      updatedAt: new Date().toISOString(),
    };
    setCharts(prev => prev.map(c => c.id === updatedChart.id ? updatedChart : c));
  };
  
  const deleteChart = (id: string) => {
    setCharts(prev => prev.filter(c => c.id !== id));
  };
  
  const getChoreById = (templateId: string, choreId: string) => {
    const template = getTemplateById(templateId);
    return template?.chores.find(chore => chore.id === choreId);
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
