
import { supabase } from "@/integrations/supabase/client";

// Authentication Functions
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

// Chart Functions
export const createChartInDb = async (chart: {
  name: string;
  template_id?: string;
  user_id?: string;
}) => {
  const { data, error } = await supabase
    .from('chore_charts')
    .insert(chart)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getChartsFromDb = async (userId?: string) => {
  let query = supabase
    .from('chore_charts')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query;

  if (error) throw error;
  return data;
};

// Children Functions
export const addChildToDb = async (child: {
  name: string;
  chart_id: string;
  birthdate?: string;
}) => {
  const { data, error } = await supabase
    .from('children')
    .insert(child)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getChildrenByChartId = async (chartId: string) => {
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('chart_id', chartId);

  if (error) throw error;
  return data;
};

// Chores Functions
export const addChoreToDb = async (chore: {
  name: string;
  description?: string;
  icon?: string;
  frequency: string;
  days_of_week?: string[];
  specific_dates?: string[];
  chart_id: string;
  category?: string;
}) => {
  const { data, error } = await supabase
    .from('chores')
    .insert(chore)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getChoresByChartId = async (chartId: string) => {
  const { data, error } = await supabase
    .from('chores')
    .select('*')
    .eq('chart_id', chartId);

  if (error) throw error;
  return data;
};

// Assignment Functions
export const addAssignmentToDb = async (assignment: {
  chore_id: string;
  child_id: string;
}) => {
  const { data, error } = await supabase
    .from('chore_assignments')
    .insert(assignment)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAssignmentsByChartId = async (chartId: string) => {
  const { data, error } = await supabase
    .from('chore_assignments')
    .select('*, chores(*), children(*)')
    .eq('chores.chart_id', chartId);

  if (error) throw error;
  return data;
};

// Email Functions
export const sendChoreChartEmail = async (to: string, subject: string, chartData: any) => {
  const { data, error } = await supabase.functions.invoke('send-chore-chart-email', {
    body: { to, subject, chartData }
  });
  
  if (error) throw error;
  return data;
};

// AI Chore Suggestions
export const getAgeAppropriateChores = async (age: number) => {
  const { data, error } = await supabase.functions.invoke('chore-suggestions', {
    body: { age }
  });
  
  if (error) throw error;
  return data;
};
