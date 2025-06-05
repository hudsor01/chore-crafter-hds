
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Keyboard } from "lucide-react";
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

const ShortcutsDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shortcuts = useKeyboardShortcuts();

  useEffect(() => {
    const handleShowShortcuts = () => setIsOpen(true);
    window.addEventListener('show-shortcuts', handleShowShortcuts);
    return () => window.removeEventListener('show-shortcuts', handleShowShortcuts);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Keyboard className="h-5 w-5 mr-2" />
            Keyboard Shortcuts
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
              <span className="text-sm font-medium">{shortcut.description.split('(')[0].trim()}</span>
              <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">
                {shortcut.description.match(/\(([^)]+)\)/)?.[1] || shortcut.key}
              </kbd>
            </div>
          ))}
          <div className="pt-4 text-xs text-slate-500 text-center">
            Press <kbd className="px-1 bg-slate-100 rounded">?</kbd> anytime to show this dialog
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortcutsDialog;
