
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChores } from "@/contexts/ChoreContext";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import html2pdf from "html2pdf.js";
import { ChartHeader } from "@/components/chart-views/ChartHeader";
import { DailyChartView } from "@/components/chart-views/DailyChartView";
import { WeeklyChartView } from "@/components/chart-views/WeeklyChartView";
import { CustomChartView } from "@/components/chart-views/CustomChartView";
import { ChartActionBar } from "@/components/chart-views/ChartActionBar";
import { ChartDetails } from "@/components/chart-views/ChartDetails";
import { useRealtimeSync } from "@/hooks/useRealtimeSync";

const ViewChart = () => {
  const { chartId } = useParams<{ chartId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getChartById, getTemplateById } = useChores();
  
  const [chart, setChart] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  
  const chartRef = useRef<HTMLDivElement>(null);

  // Enable real-time sync for this chart
  useRealtimeSync(() => {
    // Refresh chart data when changes occur
    if (chartId) {
      const updatedChart = getChartById(chartId);
      if (updatedChart) {
        setChart(updatedChart);
      }
    }
  });
  
  useEffect(() => {
    if (!chartId) {
      navigate("/");
      return;
    }
    
    const chartData = getChartById(chartId);
    if (!chartData) {
      toast({
        title: "Chart not found",
        description: "The requested chart could not be found.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    setChart(chartData);
    
    const templateData = getTemplateById(chartData.templateId);
    if (templateData) {
      setTemplate(templateData);
    }
  }, [chartId, getChartById, getTemplateById, navigate, toast]);
  
  const getAssignedChoresForChild = (childId: string) => {
    if (!chart || !template) return [];
    
    return chart.assignments
      .filter(assignment => assignment.childId === childId)
      .map(assignment => {
        const chore = template.chores.find(c => c.id === assignment.choreId);
        return chore;
      })
      .filter(Boolean);
  };
  
  const handleGeneratePdf = () => {
    if (!chartRef.current) return;
    
    toast({
      title: "Preparing your chart...",
      description: "The PDF is being generated.",
    });
    
    const options = {
      margin: 10,
      filename: `${chart?.name || 'chore-chart'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    
    html2pdf().set(options).from(chartRef.current).save().then(() => {
      toast({
        title: "Success!",
        description: "Your chore chart PDF has been generated and should download automatically.",
      });
    }).catch(err => {
      console.error("PDF generation error:", err);
      toast({
        title: "Error",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    });
  };

  const handlePrint = () => {
    window.print();
  };
  
  const renderChoreChart = () => {
    if (!chart || !template) return null;
  
    switch (template.type) {
      case 'daily':
        return <DailyChartView 
          chartName={chart.name} 
          chores={template.chores} 
          children={chart.children}
          assignments={chart.assignments}
          chartId={chart.id}
        />;
      case 'weekly':
        return <WeeklyChartView 
          chartName={chart.name} 
          children={chart.children}
          getAssignedChoresForChild={getAssignedChoresForChild}
        />;
      default:
        return <CustomChartView 
          chartName={chart.name} 
          children={chart.children}
          getAssignedChoresForChild={getAssignedChoresForChild}
        />;
    }
  };
  
  if (!chart || !template) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p>Loading chart...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 lg:space-y-6 print:p-0 px-4 lg:px-0">
      <ChartActionBar
        onBack={() => navigate('/dashboard')}
        onPrint={handlePrint}
        onDownloadPdf={handleGeneratePdf}
        onCreateSimilar={() => navigate(`/customize/${template.id}`)}
        templateId={template.id}
      />
      
      <ChartHeader
        chartName={chart.name}
        createdAt={chart.createdAt}
        templateType={template.type}
      />
      
      <div className="print:hidden">
        <Tabs defaultValue="preview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Live Chart</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview">
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div ref={chartRef} className="p-2 lg:p-4 bg-white border print:border-0 rounded-lg overflow-x-auto">
                  {renderChoreChart()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <ChartDetails children={chart.children} chores={template.chores} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="hidden print:block">
        <div ref={chartRef}>
          {renderChoreChart()}
        </div>
      </div>
    </div>
  );
};

export default ViewChart;
