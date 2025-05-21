
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { ChoreTemplate } from "@/contexts/types/choreTypes";

type ChartDetailsProps = {
  template: ChoreTemplate;
  chartName: string;
  setChartName: (name: string) => void;
};

export const ChartDetails = ({ template, chartName, setChartName }: ChartDetailsProps) => {
  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardTitle>Chart Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div>
          <Label htmlFor="chart-name">Chart Name</Label>
          <Input
            id="chart-name"
            value={chartName}
            onChange={(e) => setChartName(e.target.value)}
            placeholder="Enter a name for your chart"
            className="border-purple-200"
          />
        </div>
        
        <div>
          <Label>Template</Label>
          <div className="flex items-center p-2 border rounded-md bg-purple-50 border-purple-200">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            <span>{template.name}</span>
            <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-800 border-purple-300">
              {template.type}
            </Badge>
          </div>
        </div>
        
        <div>
          <Label>Included Chores</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {template.chores.map((chore) => (
              <div key={chore.id} className="flex items-center p-2 border border-purple-200 rounded-md bg-white hover:bg-purple-50 transition-colors">
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
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
