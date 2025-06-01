
import { useState, useEffect } from 'react';
import { 
  createChoreCompletion, 
  getChoreCompletions, 
  updateChoreCompletion, 
  deleteChoreCompletion,
  DbChoreCompletion 
} from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';

export const useChoreCompletions = (chartId?: string) => {
  const [completions, setCompletions] = useState<DbChoreCompletion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCompletions = async () => {
    if (!chartId) return;
    
    try {
      setIsLoading(true);
      const data = await getChoreCompletions(chartId);
      setCompletions(data);
    } catch (error) {
      console.error('Error fetching completions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch chore completions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletions();
  }, [chartId]);

  const markChoreComplete = async (choreId: string, childId: string, notes?: string) => {
    try {
      setIsLoading(true);
      const newCompletion = await createChoreCompletion({
        chore_id: choreId,
        child_id: childId,
        notes,
        verified_by_parent: false,
      });
      
      setCompletions(prev => [...prev, newCompletion]);
      
      toast({
        title: "Chore completed!",
        description: "Great job! The chore has been marked as complete.",
      });
    } catch (error) {
      console.error('Error marking chore complete:', error);
      toast({
        title: "Error",
        description: "Failed to mark chore as complete.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCompletion = async (completionId: string) => {
    try {
      const updatedCompletion = await updateChoreCompletion(completionId, {
        verified_by_parent: true,
      });
      
      setCompletions(prev => 
        prev.map(comp => 
          comp.id === completionId ? updatedCompletion : comp
        )
      );
      
      toast({
        title: "Completion verified",
        description: "The chore completion has been verified by parent.",
      });
    } catch (error) {
      console.error('Error verifying completion:', error);
      toast({
        title: "Error",
        description: "Failed to verify completion.",
        variant: "destructive",
      });
    }
  };

  const removeCompletion = async (completionId: string) => {
    try {
      await deleteChoreCompletion(completionId);
      setCompletions(prev => prev.filter(comp => comp.id !== completionId));
      
      toast({
        title: "Completion removed",
        description: "The chore completion has been removed.",
      });
    } catch (error) {
      console.error('Error removing completion:', error);
      toast({
        title: "Error",
        description: "Failed to remove completion.",
        variant: "destructive",
      });
    }
  };

  const isChoreCompletedToday = (choreId: string, childId: string) => {
    const today = new Date().toDateString();
    return completions.some(completion => 
      completion.chore_id === choreId && 
      completion.child_id === childId &&
      new Date(completion.completed_at).toDateString() === today
    );
  };

  const getCompletionsForChore = (choreId: string, childId: string) => {
    return completions.filter(completion => 
      completion.chore_id === choreId && completion.child_id === childId
    );
  };

  return {
    completions,
    isLoading,
    markChoreComplete,
    verifyCompletion,
    removeCompletion,
    isChoreCompletedToday,
    getCompletionsForChore,
    refetch: fetchCompletions,
  };
};
