
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'n',
      ctrlKey: true,
      action: () => navigate('/templates'),
      description: 'New Chart (Ctrl+N)'
    },
    {
      key: 's',
      ctrlKey: true,
      action: () => {
        // Trigger auto-save
        const event = new CustomEvent('trigger-save');
        window.dispatchEvent(event);
        toast({
          title: "Saved!",
          description: "Your changes have been saved.",
          duration: 2000,
        });
      },
      description: 'Save (Ctrl+S)'
    },
    {
      key: 'p',
      ctrlKey: true,
      action: () => {
        window.print();
      },
      description: 'Print (Ctrl+P)'
    },
    {
      key: '?',
      action: () => {
        const event = new CustomEvent('show-shortcuts');
        window.dispatchEvent(event);
      },
      description: 'Show shortcuts (?)'
    },
    {
      key: 'h',
      ctrlKey: true,
      action: () => navigate('/'),
      description: 'Home (Ctrl+H)'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchedShortcut = shortcuts.find(shortcut => {
        const keyMatch = shortcut.key.toLowerCase() === event.key.toLowerCase();
        const ctrlMatch = shortcut.ctrlKey ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        
        return keyMatch && ctrlMatch;
      });

      if (matchedShortcut) {
        event.preventDefault();
        matchedShortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, toast]);

  return shortcuts;
};
