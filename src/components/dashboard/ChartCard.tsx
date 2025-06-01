
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, Eye } from 'lucide-react';
import { ChoreChart } from '@/contexts/types/choreTypes';

interface ChartCardProps {
  chart: ChoreChart;
  onView: () => void;
  onEmail: () => void;
  onRotate: () => void;
}

export const ChartCard = ({ chart, onView, onEmail, onRotate }: ChartCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg truncate">{chart.name}</CardTitle>
        <CardDescription>
          Created {new Date(chart.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Children:</span>
            <span className="ml-1 font-medium">{chart.children.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Chores:</span>
            <span className="ml-1 font-medium">{chart.customChores?.length || 0}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onView}
            className="flex-1 min-w-[70px]"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEmail}
            className="px-2"
          >
            <Mail className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRotate}
            className="px-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
