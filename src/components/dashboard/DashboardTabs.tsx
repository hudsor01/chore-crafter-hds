
import React, { memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import AgeBasedSuggestions from '../AgeBasedSuggestions';
import { StatsCards } from './StatsCards';
import { ChartCard } from './ChartCard';
import { SiblingLeaderboard } from './SiblingLeaderboard';
import { ExportData } from './ExportData';
import { Child } from '@/contexts/ChoreContext';

interface DashboardTabsProps {
  charts: any[];
  children: Child[];
  completions: any[];
  selectedChild: Child | null;
  onCreateChart: () => void;
  onViewChart: (id: string) => void;
  onEmailChart: (id: string) => void;
  onRotateChores: (id: string) => void;
  onSelectChild: (child: Child) => void;
  calculateAge: (birthdate: string) => number;
}

const ChartsTab = memo(({ charts, onCreateChart, onViewChart, onEmailChart, onRotateChores }: any) => (
  <TabsContent value="charts" className="space-y-4 mt-4">
    <h2 className="text-xl font-bold mb-4">Your Chore Charts</h2>
    
    {charts.length > 0 ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {charts.map((chart: any) => (
          <ChartCard
            key={chart.id}
            chart={chart}
            onView={() => onViewChart(chart.id)}
            onEmail={() => onEmailChart(chart.id)}
            onRotate={() => onRotateChores(chart.id)}
          />
        ))}
      </div>
    ) : (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-gray-500 mb-4">
            You haven't created any charts yet.
          </p>
          <div className="flex justify-center">
            <Button onClick={onCreateChart}>
              Create Your First Chart
            </Button>
          </div>
        </CardContent>
      </Card>
    )}
  </TabsContent>
));

ChartsTab.displayName = 'ChartsTab';

const ChildrenTab = memo(({ children, onSelectChild, calculateAge }: any) => (
  <TabsContent value="children" className="mt-4 space-y-4">
    <h2 className="text-xl font-bold mb-4">All Children</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children.map((child: Child, index: number) => (
        <Card key={`${child.id}-${index}`} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">{child.name}</h3>
            {child.birthdate && (
              <p className="text-sm text-gray-500 mb-3">
                Age: {calculateAge(child.birthdate)} years
              </p>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSelectChild(child)}
              disabled={!child.birthdate}
              className="w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Get Suggestions
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </TabsContent>
));

ChildrenTab.displayName = 'ChildrenTab';

const SuggestionsTab = memo(({ selectedChild }: { selectedChild: Child | null }) => (
  <TabsContent value="suggestions" className="mt-4">
    <h2 className="text-xl font-bold mb-4">AI Chore Suggestions</h2>
    
    {selectedChild ? (
      <AgeBasedSuggestions 
        child={selectedChild}
        onAddChore={(chore) => {
          console.log('Add chore to chart:', chore);
        }}
      />
    ) : (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-gray-500">
            Select a child from the "Children" tab to get age-appropriate chore suggestions.
          </p>
        </CardContent>
      </Card>
    )}
  </TabsContent>
));

SuggestionsTab.displayName = 'SuggestionsTab';

const DashboardTabs = memo((props: DashboardTabsProps) => {
  const {
    charts,
    children,
    completions,
    selectedChild,
    onCreateChart,
    onViewChart,
    onEmailChart,
    onRotateChores,
    onSelectChild,
    calculateAge
  } = props;

  return (
    <Tabs defaultValue="charts" className="w-full">
      <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="children">Children</TabsTrigger>
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        <TabsTrigger value="exports">Export</TabsTrigger>
        <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
      </TabsList>
      
      <ChartsTab 
        charts={charts}
        onCreateChart={onCreateChart}
        onViewChart={onViewChart}
        onEmailChart={onEmailChart}
        onRotateChores={onRotateChores}
      />
      
      <ChildrenTab 
        children={children}
        onSelectChild={onSelectChild}
        calculateAge={calculateAge}
      />
      
      <TabsContent value="leaderboard" className="mt-4">
        <h2 className="text-xl font-bold mb-4">Family Competition</h2>
        <SiblingLeaderboard 
          children={children}
          completions={completions}
        />
      </TabsContent>
      
      <TabsContent value="exports" className="mt-4">
        <h2 className="text-xl font-bold mb-4">Export Your Data</h2>
        <ExportData 
          charts={charts}
          completions={completions}
        />
      </TabsContent>
      
      <SuggestionsTab selectedChild={selectedChild} />
    </Tabs>
  );
});

DashboardTabs.displayName = 'DashboardTabs';

export default DashboardTabs;
