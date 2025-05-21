
import { ChoreChart, Child, Chore, ChoreFrequency } from '../types/choreTypes';
import { 
  createChartInDb, 
  addChildToDb, 
  addChoreToDb, 
  getChartsFromDb,
  getChildrenByChartId,
  getChoresByChartId,
  sendChoreChartEmail,
  getAgeAppropriateChores
} from '@/services/supabaseService';

export const fetchChartsFromDb = async (userId?: string): Promise<ChoreChart[]> => {
  if (!userId) return [];
  
  try {
    const charts = await getChartsFromDb(userId);
    
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
        const appChildren: Child[] = children.map((dbChild: any) => {
          // Create a child object with only the properties that exist in the database
          const child: Child = {
            id: dbChild.id,
            name: dbChild.name,
          };
          
          // Check if birthdate exists before trying to use it
          if ('birthdate' in dbChild && dbChild.birthdate !== null && dbChild.birthdate !== undefined) {
            child.birthdate = String(dbChild.birthdate);
          }
          
          return child;
        });
        
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
    
    return processedCharts;
  } catch (error) {
    console.error('Error in fetchChartsFromDb:', error);
    throw error;
  }
};

export const createChartInDatabase = async (
  chart: Omit<ChoreChart, 'id' | 'createdAt' | 'updatedAt'>,
  userId?: string | null
): Promise<ChoreChart> => {
  try {
    // Create chart in database
    const dbChart = await createChartInDb({
      name: chart.name,
      template_id: chart.templateId,
      user_id: userId || undefined,
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
      children: dbChildren.map(dbChild => {
        // Create a child object with only the properties that exist in the database
        const child: Child = {
          id: dbChild.id,
          name: dbChild.name,
        };
        
        // Check if birthdate exists before trying to use it
        if ('birthdate' in dbChild && dbChild.birthdate !== null && dbChild.birthdate !== undefined) {
          child.birthdate = String(dbChild.birthdate);
        }
        
        return child;
      }),
      createdAt: dbChart.created_at,
      updatedAt: dbChart.updated_at,
    };
    
    return newChart;
  } catch (error) {
    console.error('Error in createChartInDatabase:', error);
    throw error;
  }
};

export const sendChoreChartEmailToUser = async (chartId: string, emailTo: string, chartData: any): Promise<void> => {
  try {
    await sendChoreChartEmail(emailTo, `Chore Chart: ${chartData.name}`, chartData);
  } catch (error) {
    console.error('Error sending chore chart email:', error);
    throw error;
  }
};

export const fetchAgeAppropriateChores = async (age: number): Promise<Chore[]> => {
  try {
    const { chores } = await getAgeAppropriateChores(age);
    return chores;
  } catch (error) {
    console.error('Error fetching age-appropriate chores:', error);
    throw error;
  }
};
