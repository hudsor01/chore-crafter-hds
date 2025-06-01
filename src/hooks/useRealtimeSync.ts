
import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useRealtimeSync = (onDataChange?: () => void) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleRealtimeChange = useCallback((payload: any) => {
    console.log('Realtime change detected:', payload);
    if (onDataChange) {
      onDataChange();
    }
    
    // Show toast for certain changes
    if (payload.eventType === 'INSERT') {
      if (payload.table === 'chore_completions') {
        toast({
          title: "Chore completed!",
          description: "A chore has been marked as completed.",
        });
      }
    }
  }, [onDataChange, toast]);

  useEffect(() => {
    if (!user) return;

    // Subscribe to changes in all chore-related tables
    const channel = supabase
      .channel('chart-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chore_charts'
        },
        handleRealtimeChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'children'
        },
        handleRealtimeChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chores'
        },
        handleRealtimeChange
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chore_completions'
        },
        handleRealtimeChange
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, handleRealtimeChange]);
};
