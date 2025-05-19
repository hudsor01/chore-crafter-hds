
import { supabase } from "@/integrations/supabase/client";
import { ChoreChart, Child, Chore, ChoreAssignment } from "@/contexts/ChoreContext";

// Chart Functions
export const createChartInDb = async (chart: {
  name: string;
  template_id?: string;
}) => {
  const { data, error } = await supabase
    .from('chore_charts')
    .insert(chart)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getChartsFromDb = async () => {
  const { data, error } = await supabase
    .from('chore_charts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Children Functions
export const addChildToDb = async (child: {
  name: string;
  chart_id: string;
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
  specific_dates?: Date[];
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
