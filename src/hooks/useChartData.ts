
import { useState, useEffect } from 'react';
import { ChoreChart, Child, Chore, ChoreFrequency } from "@/contexts/types/choreTypes";
import { 
  getChartsFromDb, 
  getChildrenByChartId, 
  getChoresByChartId 
} from '@/services/supabaseService';
import { useToast } from '@/components/ui/use-toast';

export const useChartData = (userId?: string) => {
  const [charts, setCharts] = useState<ChoreChart[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCharts = async () => {
      if (!userId) return;
      
      try {
        setIsLoading(true);
        const chartsData = await getChartsFromDb(userId);
        
        // Process the charts from the database
        const processedCharts: ChoreChart[] = await Promise.all(
          chartsData.map(async (chart: any) => {
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
              
              // Only add birthdate if it exists in the database
              if ('birthdate' in dbChild && dbChild.birthdate !== null) {
                child.birthdate = dbChild.birthdate as string;
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
  }, [userId, toast]);

  return { charts, setCharts, isLoading };
};
