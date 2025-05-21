
import { useState, useEffect } from 'react';
import { ChoreTemplate } from '@/models/ChoreTypes';
import { defaultTemplates } from '@/data/defaultTemplates';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

export const useTemplates = () => {
  return useLocalStorage<ChoreTemplate[]>('choreTemplates', defaultTemplates);
};
