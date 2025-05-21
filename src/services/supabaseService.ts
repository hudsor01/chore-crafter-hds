
import { supabase } from '@/integrations/supabase/client';
import { ChoreChart, DayOfWeek } from '@/contexts/types/choreTypes';

// Define the data structure returned from the database
export interface ChartData {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  template_id: string | null;
  user_id?: string | null;
}

export const getChartsFromDb = async (userId?: string): Promise<ChartData[]> => {
  try {
    const { data, error } = await supabase
      .from('chore_charts')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    
    return (data || []) as ChartData[];
  } catch (error) {
    console.error('Error fetching charts from DB:', error);
    return [];
  }
};

// Types for the data being sent to the database
interface CreateChartData {
  name: string;
  template_id: string | null;
  user_id?: string | null;
}

interface AddChildData {
  name: string;
  chart_id: string;
  birthdate?: string | null;
}

interface AddChoreData {
  name: string;
  description?: string | null;
  icon?: string | null;
  frequency: string;
  days_of_week?: string[] | null;
  specific_dates?: string[] | null;
  chart_id: string;
  category?: string | null;
}

// Types for the data being returned from the database
interface DbChart {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  template_id: string | null;
  user_id: string;
}

interface DbChild {
  id: string;
  created_at: string;
  name: string;
  chart_id: string;
  birthdate?: string | null;
}

export interface DbChore {
  id: string;
  created_at: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  frequency: string;
  days_of_week?: string[] | null;
  specific_dates?: string[] | null;
  chart_id: string;
  category?: string | null;
}

export const createChartInDb = async (chartData: CreateChartData): Promise<DbChart> => {
  try {
    const { data, error } = await supabase
      .from('chore_charts')
      .insert([chartData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as DbChart;
  } catch (error) {
    console.error('Error creating chart in DB:', error);
    throw error;
  }
};

export const addChildToDb = async (childData: AddChildData): Promise<DbChild> => {
  try {
    const { data, error } = await supabase
      .from('children')
      .insert([childData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as DbChild;
  } catch (error) {
    console.error('Error adding child to DB:', error);
    throw error;
  }
};

export const addChoreToDb = async (choreData: AddChoreData): Promise<DbChore> => {
  try {
    const { data, error } = await supabase
      .from('chores')
      .insert([choreData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as DbChore;
  } catch (error) {
    console.error('Error adding chore to DB:', error);
    throw error;
  }
};

export const getChildrenByChartId = async (chartId: string): Promise<DbChild[]> => {
  try {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('chart_id', chartId);
    
    if (error) {
      throw error;
    }
    
    return (data || []) as DbChild[];
  } catch (error) {
    console.error('Error fetching children from DB:', error);
    return [];
  }
};

export const getChoresByChartId = async (chartId: string): Promise<DbChore[]> => {
  try {
    const { data, error } = await supabase
      .from('chores')
      .select('*')
      .eq('chart_id', chartId);
    
    if (error) {
      throw error;
    }
    
    return (data || []) as DbChore[];
  } catch (error) {
    console.error('Error fetching chores from DB:', error);
    return [];
  }
};

export const sendChoreChartEmail = async (email: string, subject: string, body: any): Promise<void> => {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: {
        to: email,
        subject: subject,
        body: JSON.stringify(body),
      },
    });
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

interface AgeAppropriateChoresResponse {
  chores: DbChore[];
}

export const getAgeAppropriateChores = async (age: number): Promise<AgeAppropriateChoresResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-age-appropriate-chores', {
      body: { age },
    });
    
    if (error) {
      throw error;
    }
    
    return data as AgeAppropriateChoresResponse;
  } catch (error) {
    console.error('Error fetching age-appropriate chores:', error);
    throw error;
  }
};
