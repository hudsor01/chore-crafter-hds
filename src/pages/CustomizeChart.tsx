import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChores } from "@/contexts/ChoreContext";
import { Child, ChoreTemplate, ChoreAssignment, Chore } from "@/contexts/types/choreTypes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Save, Share2, Download, HelpCircle, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartDetails } from "@/components/chart-customizer/ChartDetails";
import { ChildrenManager } from "@/components/chart-customizer/ChildrenManager";
import { CustomChoresManager } from "@/components/chart-customizer/CustomChoresManager";
import { ChoreAssignmentManager } from "@/components/chart-customizer/ChoreAssignmentManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DragDropChoreAssignment } from "@/components/chart-customizer/DragDropChoreAssignment";

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
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  
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

  const handleSaveDraft = () => {
    // Save current progress to localStorage
    const draftData = {
      templateId,
      chartName,
      children,
      assignments,
      customChores,
    };
    localStorage.setItem('choreChartDraft', JSON.stringify(draftData));
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved locally.",
    });
  };

  const calculateProgress = () => {
    let progress = 0;
    if (chartName.trim()) progress += 25;
    if (children.length > 0) progress += 25;
    if (assignments.length > 0) progress += 25;
    if (template && (template.chores.length > 0 || customChores.length > 0)) progress += 25;
    return progress;
  };

  const getNextStepSuggestion = () => {
    if (!chartName.trim()) return "Start by giving your chart a name";
    if (children.length === 0) return "Add children to your chart";
    if (customChores.length === 0 && template?.chores.length === 0) return "Add some chores";
    if (assignments.length === 0) return "Assign chores to children";
    return "Ready to create your chart!";
  };
  
  if (!template) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>;
  }
  
  // Combine template chores with custom chores
  const allChores = [...template.chores, ...customChores];
  
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-purple-800 mb-2">Customize Your Chore Chart</h1>
          <p className="text-gray-600">
            Add children, assign chores, and customize your {template.name} chart.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSaveDraft} className="text-purple-700 border-purple-300">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
        </div>
      </header>

      {/* Progress Indicator */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-purple-800">Setup Progress</CardTitle>
            <span className="text-sm font-medium text-purple-600">{calculateProgress()}% Complete</span>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={calculateProgress()} className="mb-2" />
          <div className="flex items-center text-sm text-gray-600">
            <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
            {getNextStepSuggestion()}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{children.length}</div>
            <div className="text-sm text-gray-600">Children</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{allChores.length}</div>
            <div className="text-sm text-gray-600">Total Chores</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{assignments.length}</div>
            <div className="text-sm text-gray-600">Assignments</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{template.type}</div>
            <div className="text-sm text-gray-600">Template Type</div>
          </div>
        </div>
      </div>
      
      <Tabs 
        defaultValue="details" 
        className="space-y-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-purple-100 border border-purple-200 w-full">
          <TabsTrigger value="details" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex-1">
            Chart Details
          </TabsTrigger>
          <TabsTrigger value="children" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex-1">
            Children ({children.length})
          </TabsTrigger>
          <TabsTrigger value="chores" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex-1">
            Manage Chores ({allChores.length})
          </TabsTrigger>
          <TabsTrigger value="assign" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex-1">
            Assignments ({assignments.length})
          </TabsTrigger>
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
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Assign Chores</h2>
              <p className="text-gray-600 mb-4">Drag chores from the available list to assign them to children</p>
            </div>
            
            <DragDropChoreAssignment
              children={children}
              allChores={allChores}
              assignments={assignments}
              setAssignments={setAssignments}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate('/templates')} className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Back to Templates
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
          >
            <Share2 className="mr-2 h-4 w-4" />
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button 
            onClick={handleSaveChart} 
            className="bg-purple-600 hover:bg-purple-700"
            disabled={calculateProgress() < 100}
          >
            <Check className="mr-2 h-4 w-4" /> 
            Create Chart
          </Button>
        </div>
      </div>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
            Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Age-Appropriate Chores</h4>
              <p className="text-gray-600">Match chores to your child's age and abilities for better success</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Start Small</h4>
              <p className="text-gray-600">Begin with 2-3 chores and gradually add more as habits form</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Clear Instructions</h4>
              <p className="text-gray-600">Make sure children understand exactly what each chore involves</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Celebrate Success</h4>
              <p className="text-gray-600">Acknowledge completed chores to build positive habits</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizeChart;
