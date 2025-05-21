
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash, ListCheck } from "lucide-react";
import { Chore } from "@/contexts/types/choreTypes";
import { AddCustomChoreForm } from "@/components/AddCustomChoreForm";

type CustomChoresManagerProps = {
  customChores: Chore[];
  setCustomChores: (chores: Chore[]) => void;
};

export const CustomChoresManager = ({ customChores, setCustomChores }: CustomChoresManagerProps) => {
  const [isAddingCustomChore, setIsAddingCustomChore] = useState(false);

  const handleAddCustomChore = (chore: Omit<Chore, "id">) => {
    const newChore: Chore = {
      ...chore,
      id: `custom-chore-${Date.now()}`,
    };
    
    setCustomChores([...customChores, newChore]);
    setIsAddingCustomChore(false);
  };
  
  const handleDeleteCustomChore = (choreId: string) => {
    setCustomChores(customChores.filter(chore => chore.id !== choreId));
  };

  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle>Custom Chores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {isAddingCustomChore ? (
          <AddCustomChoreForm 
            onAddChore={handleAddCustomChore}
            onCancel={() => setIsAddingCustomChore(false)}
          />
        ) : (
          <Button 
            onClick={() => setIsAddingCustomChore(true)} 
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Custom Chore
          </Button>
        )}
        
        {customChores.length > 0 && (
          <div className="mt-4">
            <Label className="mb-2 block">Your Custom Chores</Label>
            <div className="space-y-2">
              {customChores.map((chore) => (
                <div key={chore.id} className="flex justify-between items-center p-2 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">{chore.icon}</span>
                    <div>
                      <div className="font-medium text-purple-900">{chore.name}</div>
                      <div className="text-xs text-purple-600">
                        {chore.schedule.frequency === 'daily' ? 'Every day' : 
                         chore.schedule.frequency === 'weekly' && chore.schedule.daysOfWeek ? 
                         chore.schedule.daysOfWeek.map(day => 
                           day.charAt(0).toUpperCase() + day.slice(1)).join(', ') : 
                         chore.schedule.frequency}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCustomChore(chore.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!isAddingCustomChore && customChores.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-purple-50 rounded-lg border border-dashed border-purple-300">
            <ListCheck className="h-10 w-10 mx-auto mb-2 text-purple-400" />
            <p>No custom chores added yet</p>
            <p className="text-sm text-purple-400 mt-1">Add custom chores to personalize your chart</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
