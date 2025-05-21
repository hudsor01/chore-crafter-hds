
// Define core types for the chore chart application
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

export type ChoreContextType = {
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
