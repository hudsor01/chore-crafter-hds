
import { Chore, Child } from "@/contexts/types/choreTypes";

type CustomChartViewProps = {
  chartName: string;
  children: Child[];
  getAssignedChoresForChild: (childId: string) => Chore[];
};

export const CustomChartView = ({ chartName, children, getAssignedChoresForChild }: CustomChartViewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{chartName}</h2>
      
      {children.map(child => {
        const assignedChores = getAssignedChoresForChild(child.id);
        
        return (
          <div key={child.id} className="mb-6">
            <h3 className="text-xl font-semibold mb-2 pb-1 border-b">{child.name}'s Chores</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {assignedChores.length > 0 ? (
                assignedChores.map(chore => (
                  <div key={chore.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center mb-1">
                      <span className="mr-2 text-lg">{chore.icon}</span>
                      <span className="font-medium">{chore.name}</span>
                    </div>
                    {chore.description && (
                      <p className="text-sm text-gray-600 mt-1">{chore.description}</p>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      {chore.schedule.frequency === 'daily' ? 'Every day' : 
                       chore.schedule.frequency === 'weekly' && chore.schedule.daysOfWeek ? 
                       chore.schedule.daysOfWeek.map(day => 
                         day.charAt(0).toUpperCase() + day.slice(1)).join(', ') : 
                       chore.schedule.frequency}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-4 text-gray-400">
                  No chores assigned
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
