
import { Chore, Child } from "@/models/ChoreTypes";

type WeeklyChartViewProps = {
  chartName: string;
  children: Child[];
  getAssignedChoresForChild: (childId: string) => Chore[];
};

export const WeeklyChartView = ({ chartName, children, getAssignedChoresForChild }: WeeklyChartViewProps) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{chartName}</h2>
      
      {children.map(child => {
        const assignedChores = getAssignedChoresForChild(child.id);
        
        return (
          <div key={child.id} className="mb-8">
            <h3 className="text-xl font-semibold mb-2">{child.name}'s Schedule</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  {daysOfWeek.map(day => (
                    <th key={day} className="border p-2 text-center">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {daysOfWeek.map((day, index) => {
                    const dayLower = day.toLowerCase() as any;
                    const dayChores = assignedChores.filter(chore => 
                      chore.schedule.daysOfWeek?.includes(dayLower)
                    );
                    
                    return (
                      <td key={day} className="border p-2 align-top min-h-[100px]">
                        <div className="min-h-[100px]">
                          {dayChores.length > 0 ? (
                            <ul className="space-y-2">
                              {dayChores.map(chore => (
                                <li key={chore.id} className="flex items-center">
                                  <span className="mr-1">{chore.icon}</span>
                                  <span className="text-sm">{chore.name}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-center text-gray-400 pt-4">No chores</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};
