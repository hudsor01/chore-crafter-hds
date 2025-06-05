
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface UseAutoSaveOptions {
  data: any;
  saveFunction: (data: any) => Promise<void>;
  delay?: number;
  storageKey?: string;
}

export const useAutoSave = ({ data, saveFunction, delay = 2000, storageKey }: UseAutoSaveOptions) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  const saveToLocalStorage = useCallback(() => {
    if (storageKey && data) {
      localStorage.setItem(storageKey, JSON.stringify({
        data,
        timestamp: new Date().toISOString()
      }));
    }
  }, [data, storageKey]);

  const performSave = useCallback(async () => {
    if (!data) return;
    
    setIsSaving(true);
    try {
      await saveFunction(data);
      saveToLocalStorage();
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
      toast({
        title: "Auto-save failed",
        description: "Your changes are stored locally as backup.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [data, saveFunction, saveToLocalStorage, toast]);

  // Auto-save on data change
  useEffect(() => {
    if (!data) return;

    const timeoutId = setTimeout(() => {
      performSave();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [data, delay, performSave]);

  // Manual save trigger
  useEffect(() => {
    const handleManualSave = () => performSave();
    window.addEventListener('trigger-save', handleManualSave);
    return () => window.removeEventListener('trigger-save', handleManualSave);
  }, [performSave]);

  // Load from localStorage on mount
  const loadFromLocalStorage = useCallback(() => {
    if (!storageKey) return null;
    
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.data;
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return null;
  }, [storageKey]);

  return {
    isSaving,
    lastSaved,
    loadFromLocalStorage,
    manualSave: performSave
  };
};
