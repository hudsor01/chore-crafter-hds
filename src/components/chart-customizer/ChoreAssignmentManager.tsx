
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ListCheck } from "lucide-react";
import { Chore, Child, ChoreAssignment } from "@/contexts/types/choreTypes";

type ChoreAssignmentManagerProps = {
  children: Child[];
  allChores: Chore[];
  assignments: ChoreAssignment[];
  setAssignments: (assignments: ChoreAssignment[]) => void;
  setActiveTab: (tab: string) => void;
};

export const ChoreAssignmentManager = ({
  children,
  allChores,
  assignments,
  setAssignments,
  setActiveTab
}: ChoreAssignmentManagerProps) => {
  const toggleAssignment = (choreId: string, childId: string) => {
    const existingAssignment = assignments.find(
      a => a.choreId === choreId && a.childId === childId
    );
    
    if (existingAssignment) {
      setAssignments(assignments.filter(
        a => !(a.choreId === choreId && a.childId === childId)
      ));
    } else {
      setAssignments([...assignments, { choreId, childId }]);
    }
  };
  
  const isAssigned = (choreId: string, childId: string) => {
    return assignments.some(
      a => a.choreId === choreId && a.childId === childId
    );
  };

  if (children.length === 0) {
    return (
      <Card className="border-purple-200 shadow-md">
        <CardContent className="text-center py-8">
          <ListCheck className="h-12 w-12 mx-auto mb-2 text-purple-400" />
          <p className="text-gray-500 mb-4">Please add children before assigning chores.</p>
          <Button 
            variant="outline" 
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
            onClick={() => setActiveTab("children")}
          >
            Go to Children Tab
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle>Assign Chores</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 text-purple-800">Chore</th>
                {children.map((child) => (
                  <th key={child.id} className="text-center p-2 text-purple-800">
                    {child.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allChores.map((chore) => (
                <tr key={chore.id} className="border-t border-purple-100 hover:bg-purple-50 transition-colors">
                  <td className="p-2">
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
                  </td>
                  {children.map((child) => (
                    <td key={child.id} className="text-center p-2">
                      <Checkbox
                        className="border-purple-300 text-purple-600 data-[state=checked]:bg-purple-600"
                        checked={isAssigned(chore.id, child.id)}
                        onCheckedChange={() => toggleAssignment(chore.id, child.id)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
