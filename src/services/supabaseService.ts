
import { supabase } from '@/integrations/supabase/client';

// Define the data structure returned from the database - keep it simple to avoid circular references
export interface ChartData {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  template_id: string | null;
  user_id: string | null;
}

// Export DbChore interface for use in other files
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

// Export DbChoreCompletion interface
export interface DbChoreCompletion {
  id: string;
  chore_id: string;
  child_id: string;
  completed_at: string;
  notes?: string | null;
  verified_by_parent: boolean;
  created_at: string;
}

export const getChartsFromDb = async (userId?: string): Promise<ChartData[]> => {
  try {
    let query = supabase.from('chore_charts').select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    // Explicitly map the data to avoid type inference issues
    return data?.map(chart => ({
      id: chart.id,
      created_at: chart.created_at,
      updated_at: chart.updated_at,
      name: chart.name,
      template_id: chart.template_id,
      user_id: chart.user_id,
    })) || [];
  } catch (error) {
    console.error('Error fetching charts from DB:', error);
    return [];
  }
};

// Types for the data being sent to the database
interface CreateChartData {
  name: string;
  template_id: string | null;
  user_id: string;
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

interface CreateChoreCompletionData {
  chore_id: string;
  child_id: string;
  notes?: string | null;
  verified_by_parent?: boolean;
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

export const createChoreCompletion = async (completionData: CreateChoreCompletionData): Promise<DbChoreCompletion> => {
  try {
    const { data, error } = await supabase
      .from('chore_completions')
      .insert([completionData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as DbChoreCompletion;
  } catch (error) {
    console.error('Error creating chore completion:', error);
    throw error;
  }
};

export const getChoreCompletions = async (chartId: string): Promise<DbChoreCompletion[]> => {
  try {
    const { data, error } = await supabase
      .from('chore_completions')
      .select(`
        *,
        chores!inner(chart_id)
      `)
      .eq('chores.chart_id', chartId);
    
    if (error) {
      throw error;
    }
    
    return (data || []).map(item => ({
      id: item.id,
      chore_id: item.chore_id,
      child_id: item.child_id,
      completed_at: item.completed_at,
      notes: item.notes,
      verified_by_parent: item.verified_by_parent,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error('Error fetching chore completions:', error);
    return [];
  }
};

export const updateChoreCompletion = async (completionId: string, updates: Partial<CreateChoreCompletionData>): Promise<DbChoreCompletion> => {
  try {
    const { data, error } = await supabase
      .from('chore_completions')
      .update(updates)
      .eq('id', completionId)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as DbChoreCompletion;
  } catch (error) {
    console.error('Error updating chore completion:', error);
    throw error;
  }
};

export const deleteChoreCompletion = async (completionId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('chore_completions')
      .delete()
      .eq('id', completionId);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting chore completion:', error);
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
