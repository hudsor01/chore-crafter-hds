
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash, User } from "lucide-react";
import { Child } from "@/contexts/types/choreTypes";
import { useToast } from "@/components/ui/use-toast";

type ChildrenManagerProps = {
  children: Child[];
  setChildren: (children: Child[]) => void;
};

export const ChildrenManager = ({ children, setChildren }: ChildrenManagerProps) => {
  const [newChildName, setNewChildName] = useState<string>("");
  const { toast } = useToast();

  const handleAddChild = () => {
    if (newChildName.trim() === "") {
      toast({
        title: "Name Required",
        description: "Please enter a name for the child.",
        variant: "destructive",
      });
      return;
    }
    
    const newChild: Child = {
      id: `child-${Date.now()}`,
      name: newChildName.trim(),
    };
    
    setChildren([...children, newChild]);
    setNewChildName("");
  };
  
  const handleDeleteChild = (childId: string) => {
    setChildren(children.filter(child => child.id !== childId));
  };

  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle>Add Children</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex space-x-2">
          <Input
            value={newChildName}
            onChange={(e) => setNewChildName(e.target.value)}
            placeholder="Enter child's name"
            className="flex-1 border-purple-200"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddChild();
              }
            }}
          />
          <Button onClick={handleAddChild} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" /> Add
          </Button>
        </div>
        
        {children.length > 0 ? (
          <div className="space-y-2">
            {children.map((child) => (
              <div key={child.id} className="flex justify-between items-center p-2 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="font-medium">{child.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteChild(child.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 bg-purple-50 rounded-lg border border-dashed border-purple-300">
            <User className="h-10 w-10 mx-auto mb-2 text-purple-400" />
            <p>No children added yet</p>
            <p className="text-sm text-purple-400 mt-1">Add children to assign chores to them</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
