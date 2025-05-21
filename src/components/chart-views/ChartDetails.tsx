
import { Chore, Child } from "@/models/ChoreTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChartDetailsProps = {
  children: Child[];
  chores: Chore[];
};

export const ChartDetails = ({ children, chores }: ChartDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800">Children</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {children.map((child) => (
              <div key={child.id} className="border rounded-md p-2">
                {child.name}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800">Chores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {chores.map((chore) => (
              <div key={chore.id} className="border rounded-md p-2 flex items-center">
                <span className="mr-2">{chore.icon}</span>
                <span>{chore.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
