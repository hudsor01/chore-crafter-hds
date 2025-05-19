
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChores, ChoreChart, ChoreTemplate } from "@/contexts/ChoreContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, Edit, Printer, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import html2pdf from "html2pdf.js";

const ViewChart = () => {
  const { chartId } = useParams<{ chartId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getChartById, getTemplateById, getChoreById } = useChores();
  
  const [chart, setChart] = useState<ChoreChart | null>(null);
  const [template, setTemplate] = useState<ChoreTemplate | null>(null);
  
  const chartRef = useRef<HTMLDivElement>(null);
  
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
  
  if (!chart || !template) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="space-y-6 print:p-0">
      <div className="print:hidden flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button onClick={handleGeneratePdf}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>
      
      <header className="print:text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{chart.name}</h1>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>Created on {new Date(chart.createdAt).toLocaleDateString()}</span>
          <Badge variant="outline">{template.type}</Badge>
        </div>
      </header>
      
      <div className="print:hidden">
        <Tabs defaultValue="preview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview">
            <Card>
              <CardContent className="p-6">
                <div ref={chartRef} className="p-4 bg-white border print:border-0 rounded-lg">
                  {renderChoreChart(chart, template, getAssignedChoresForChild)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Chart Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Children</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {chart.children.map((child) => (
                      <div key={child.id} className="border rounded-md p-2">
                        {child.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">Chores</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {template.chores.map((chore) => (
                      <div key={chore.id} className="border rounded-md p-2 flex items-center">
                        <span className="mr-2">{chore.icon}</span>
                        <span>{chore.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="hidden print:block">
        <div ref={chartRef}>
          {renderChoreChart(chart, template, getAssignedChoresForChild)}
        </div>
      </div>
      
      <div className="print:hidden flex justify-between">
        <Button variant="outline" onClick={() => navigate(`/customize/${template.id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Create Similar Chart
        </Button>
      </div>
    </div>
  );
};

function renderChoreChart(
  chart: ChoreChart, 
  template: ChoreTemplate, 
  getAssignedChoresForChild: (childId: string) => any[]
) {
  if (template.type === 'daily') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">{chart.name}</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2 text-left">Chore</th>
              {chart.children.map(child => (
                <th key={child.id} className="border p-2 text-center">{child.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {template.chores.map(chore => (
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
                {chart.children.map(child => {
                  const isAssigned = chart.assignments.some(
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
  } else if (template.type === 'weekly') {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">{chart.name}</h2>
        
        {chart.children.map(child => {
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
  } else {
    // Custom chart layout
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">{chart.name}</h2>
        
        {chart.children.map(child => {
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
  }
}

export default ViewChart;
