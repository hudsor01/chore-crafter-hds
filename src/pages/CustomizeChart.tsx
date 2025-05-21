
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChores } from "@/contexts/ChoreContext";
import { Child, ChoreTemplate, ChoreAssignment, Chore } from "@/contexts/types/choreTypes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartDetails } from "@/components/chart-customizer/ChartDetails";
import { ChildrenManager } from "@/components/chart-customizer/ChildrenManager";
import { CustomChoresManager } from "@/components/chart-customizer/CustomChoresManager";
import { ChoreAssignmentManager } from "@/components/chart-customizer/ChoreAssignmentManager";

const CustomizeChart = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getTemplateById, createChart } = useChores();
  
  // State
  const [chartName, setChartName] = useState<string>("");
  const [template, setTemplate] = useState<ChoreTemplate | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [assignments, setAssignments] = useState<ChoreAssignment[]>([]);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [customChores, setCustomChores] = useState<Chore[]>([]);
  
  useEffect(() => {
    if (!templateId) {
      navigate("/templates");
      return;
    }
    
    const templateData = getTemplateById(templateId);
    if (!templateData) {
      toast({
        title: "Template not found",
        description: "The requested template could not be found.",
        variant: "destructive",
      });
      navigate("/templates");
      return;
    }
    
    setTemplate(templateData);
    setChartName(`${templateData.name} Chart`);
  }, [templateId, getTemplateById, navigate, toast]);
  
  const handleSaveChart = async () => {
    if (!template) return;
    
    if (chartName.trim() === "") {
      toast({
        title: "Chart Name Required",
        description: "Please enter a name for your chart.",
        variant: "destructive",
      });
      return;
    }
    
    if (children.length === 0) {
      toast({
        title: "No Children Added",
        description: "Add at least one child to create a chart.",
        variant: "destructive",
      });
      return;
    }
    
    if (assignments.length === 0) {
      toast({
        title: "No Chores Assigned",
        description: "Assign at least one chore to a child.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const newChart = await createChart({
        name: chartName,
        templateId: template.id,
        children: children,
        assignments: assignments,
        customChores: customChores.length > 0 ? customChores : undefined,
      });
      
      toast({
        title: "Chart Created!",
        description: `"${chartName}" has been created successfully.`,
      });
      
      navigate(`/view/${newChart.id}`);
    } catch (error) {
      console.error("Error creating chart:", error);
      toast({
        title: "Error",
        description: "There was a problem creating your chart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!template) {
    return <div>Loading...</div>;
  }
  
  // Combine template chores with custom chores
  const allChores = [...template.chores, ...customChores];
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Customize Your Chore Chart</h1>
        <p className="text-gray-600">
          Add children, assign chores, and customize your {template.name} chart.
        </p>
      </header>
      
      <Tabs 
        defaultValue="details" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-purple-100 border border-purple-200">
          <TabsTrigger value="details" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Chart Details</TabsTrigger>
          <TabsTrigger value="children" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Children</TabsTrigger>
          <TabsTrigger value="chores" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Manage Chores</TabsTrigger>
          <TabsTrigger value="assign" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Assign Chores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <ChartDetails 
            template={template} 
            chartName={chartName} 
            setChartName={setChartName} 
          />
        </TabsContent>
        
        <TabsContent value="children" className="space-y-4">
          <ChildrenManager 
            children={children}
            setChildren={setChildren}
          />
        </TabsContent>
        
        <TabsContent value="chores" className="space-y-4">
          <CustomChoresManager 
            customChores={customChores}
            setCustomChores={setCustomChores}
          />
        </TabsContent>
        
        <TabsContent value="assign" className="space-y-4">
          <ChoreAssignmentManager
            children={children}
            allChores={allChores}
            assignments={assignments}
            setAssignments={setAssignments}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button variant="outline" onClick={() => navigate('/templates')} className="border-purple-300 text-purple-700 hover:bg-purple-50">
          Cancel
        </Button>
        <Button onClick={handleSaveChart} className="bg-purple-600 hover:bg-purple-700">
          <Check className="mr-2 h-4 w-4" /> Create Chart
        </Button>
      </div>
    </div>
  );
};

export default CustomizeChart;
