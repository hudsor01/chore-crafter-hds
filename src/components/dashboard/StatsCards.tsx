
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChoreChart } from '@/contexts/types/choreTypes';

interface StatsCardsProps {
  charts: ChoreChart[];
  onCreateChart: () => void;
}

export const StatsCards = ({ charts, onCreateChart }: StatsCardsProps) => {
  const totalChildren = charts.reduce((total, chart) => total + chart.children.length, 0);
  const totalChores = charts.reduce((total, chart) => total + (chart.customChores?.length || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Charts</CardTitle>
          <CardDescription>Active charts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{charts.length}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Children</CardTitle>
          <CardDescription>Across all charts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalChildren}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Total Chores</CardTitle>
          <CardDescription>Custom chores</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalChores}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={onCreateChart} 
            className="w-full"
            size="sm"
          >
            Create New Chart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
