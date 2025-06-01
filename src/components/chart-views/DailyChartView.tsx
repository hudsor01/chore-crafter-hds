
import { Chore, Child, ChoreAssignment } from "@/models/ChoreTypes";
import { Button } from "@/components/ui/button";
import { Check, X, Star } from "lucide-react";
import { useChoreCompletions } from "@/hooks/useChoreCompletions";

type DailyChartViewProps = {
  chartName: string;
  chores: Chore[];
  children: Child[];
  assignments: ChoreAssignment[];
  chartId?: string;
  isReadOnly?: boolean;
};

export const DailyChartView = ({ 
  chartName, 
  chores, 
  children, 
  assignments, 
  chartId,
  isReadOnly = false 
}: DailyChartViewProps) => {
  const { 
    markChoreComplete, 
    verifyCompletion, 
    removeCompletion,
    isChoreCompletedToday,
    getCompletionsForChore,
    isLoading 
  } = useChoreCompletions(chartId);

  const handleToggleComplete = async (choreId: string, childId: string) => {
    if (isReadOnly) return;
    
    if (isChoreCompletedToday(choreId, childId)) {
      const completions = getCompletionsForChore(choreId, childId);
      const todayCompletion = completions.find(comp => 
        new Date(comp.completed_at).toDateString() === new Date().toDateString()
      );
      if (todayCompletion) {
        await removeCompletion(todayCompletion.id);
      }
    } else {
      await markChoreComplete(choreId, childId);
    }
  };

  const handleVerifyCompletion = async (choreId: string, childId: string) => {
    if (isReadOnly) return;
    
    const completions = getCompletionsForChore(choreId, childId);
    const todayCompletion = completions.find(comp => 
      new Date(comp.completed_at).toDateString() === new Date().toDateString()
    );
    if (todayCompletion && !todayCompletion.verified_by_parent) {
      await verifyCompletion(todayCompletion.id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{chartName}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-3 text-left min-w-[200px]">Chore</th>
              {children.map(child => (
                <th key={child.id} className="border p-3 text-center min-w-[120px]">
                  {child.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chores.map(chore => (
              <tr key={chore.id} className="border-b hover:bg-gray-50">
                <td className="border p-3">
                  <div className="flex items-center">
                    <span className="mr-2 text-lg">{chore.icon}</span>
                    <div>
                      <div className="font-medium">{chore.name}</div>
                      {chore.description && (
                        <div className="text-xs text-gray-500 mt-1">{chore.description}</div>
                      )}
                    </div>
                  </div>
                </td>
                {children.map(child => {
                  const isAssigned = assignments.some(
                    a => a.choreId === chore.id && a.childId === child.id
                  );
                  const isCompleted = isChoreCompletedToday(chore.id, child.id);
                  const completions = getCompletionsForChore(chore.id, child.id);
                  const todayCompletion = completions.find(comp => 
                    new Date(comp.completed_at).toDateString() === new Date().toDateString()
                  );
                  const isVerified = todayCompletion?.verified_by_parent;
                  
                  return (
                    <td key={child.id} className="border p-3 text-center">
                      {isAssigned ? (
                        <div className="flex flex-col items-center space-y-2">
                          <Button
                            variant={isCompleted ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleToggleComplete(chore.id, child.id)}
                            disabled={isReadOnly || isLoading}
                            className={`w-8 h-8 p-0 ${
                              isCompleted 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'border-gray-300 hover:bg-green-50'
                            }`}
                          >
                            {isCompleted ? <Check className="h-4 w-4" /> : null}
                          </Button>
                          
                          {isCompleted && !isVerified && !isReadOnly && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVerifyCompletion(chore.id, child.id)}
                              disabled={isLoading}
                              className="w-6 h-6 p-0 text-yellow-500 hover:text-yellow-600"
                              title="Verify completion"
                            >
                              <Star className="h-3 w-3" />
                            </Button>
                          )}
                          
                          {isVerified && (
                            <div title="Verified by parent">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-8 h-8 mx-auto rounded-full border-2 border-gray-200"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {!isReadOnly && (
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>• Click the circle to mark a chore as complete</p>
          <p>• Click the star to verify completion as a parent</p>
          <p>• Click the checkmark again to unmark completion</p>
        </div>
      )}
    </div>
  );
};
