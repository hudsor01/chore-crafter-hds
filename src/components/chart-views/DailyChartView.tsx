
import { Chore, Child, ChoreAssignment } from "@/models/ChoreTypes";

type DailyChartViewProps = {
  chartName: string;
  chores: Chore[];
  children: Child[];
  assignments: ChoreAssignment[];
};

export const DailyChartView = ({ chartName, chores, children, assignments }: DailyChartViewProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{chartName}</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2 text-left">Chore</th>
            {children.map(child => (
              <th key={child.id} className="border p-2 text-center">{child.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chores.map(chore => (
            <tr key={chore.id} className="border-b">
              <td className="border p-2">
                <div className="flex items-center">
                  <span className="mr-2">{chore.icon}</span>
                  <div>
                    <div className="font-medium">{chore.name}</div>
                    {chore.description && (
                      <div className="text-xs text-gray-500">{chore.description}</div>
                    )}
                  </div>
                </div>
              </td>
              {children.map(child => {
                const isAssigned = assignments.some(
                  a => a.choreId === chore.id && a.childId === child.id
                );
                return (
                  <td key={child.id} className="border p-2 text-center">
                    {isAssigned ? (
                      <div className="mx-auto w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        ✓
                      </div>
                    ) : (
                      <div className="mx-auto w-6 h-6 rounded-full border-2 border-gray-300"></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
