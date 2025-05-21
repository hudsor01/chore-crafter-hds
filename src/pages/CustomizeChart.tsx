import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChores, Child, ChoreTemplate, ChoreAssignment, Chore } from "@/contexts/ChoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Plus, Trash, Calendar, User, ListCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { AddCustomChoreForm } from "@/components/AddCustomChoreForm";

const CustomizeChart = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getTemplateById, createChart, addChoreToTemplate } = useChores();
  
  // State
  const [chartName, setChartName] = useState<string>("");
  const [template, setTemplate] = useState<ChoreTemplate | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [newChildName, setNewChildName] = useState<string>("");
  const [assignments, setAssignments] = useState<ChoreAssignment[]>([]);
  const [activeTab, setActiveTab] = useState<string>("details");
  const [customChores, setCustomChores] = useState<Chore[]>([]);
  const [isAddingCustomChore, setIsAddingCustomChore] = useState(false);
  
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
  
  const handleAddChild = () => {
    if (newChildName.trim() === "") {
      toast({
        title: "Name Required",
        description: "Please enter a name for the child.",
        variant: "destructive",
      });
      return;
    }
    
    const newChild: Child = {
      id: `child-${Date.now()}`,
      name: newChildName.trim(),
    };
    
    setChildren([...children, newChild]);
    setNewChildName("");
  };
  
  const handleDeleteChild = (childId: string) => {
    setChildren(children.filter(child => child.id !== childId));
    
    // Also remove any assignments for this child
    setAssignments(assignments.filter(assignment => assignment.childId !== childId));
  };
  
  const toggleAssignment = (choreId: string, childId: string) => {
    const existingAssignment = assignments.find(
      a => a.choreId === choreId && a.childId === childId
    );
    
    if (existingAssignment) {
      setAssignments(assignments.filter(
        a => !(a.choreId === choreId && a.childId === childId)
      ));
    } else {
      setAssignments([...assignments, { choreId, childId }]);
    }
  };
  
  const isAssigned = (choreId: string, childId: string) => {
    return assignments.some(
      a => a.choreId === choreId && a.childId === childId
    );
  };
  
  const handleAddCustomChore = (chore: Omit<Chore, "id">) => {
    const newChore: Chore = {
      ...chore,
      id: `custom-chore-${Date.now()}`,
    };
    
    setCustomChores([...customChores, newChore]);
    setIsAddingCustomChore(false);
    
    toast({
      title: "Chore Added",
      description: `"${newChore.name}" has been added to your chart.`,
    });
  };
  
  const handleDeleteCustomChore = (choreId: string) => {
    setCustomChores(customChores.filter(chore => chore.id !== choreId));
    
    // Also remove any assignments for this chore
    setAssignments(assignments.filter(assignment => assignment.choreId !== choreId));
  };
  
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
                  <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-800 border-purple-300">{template.type}</Badge>
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
        </TabsContent>
        
        <TabsContent value="children" className="space-y-4">
          <Card className="border-purple-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle>Add Children</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex space-x-2">
                <Input
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Enter child's name"
                  className="flex-1 border-purple-200"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddChild();
                    }
                  }}
                />
                <Button onClick={handleAddChild} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              
              {children.length > 0 ? (
                <div className="space-y-2">
                  {children.map((child) => (
                    <div key={child.id} className="flex justify-between items-center p-2 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-purple-600" />
                        <span className="font-medium">{child.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteChild(child.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 bg-purple-50 rounded-lg border border-dashed border-purple-300">
                  <User className="h-10 w-10 mx-auto mb-2 text-purple-400" />
                  <p>No children added yet</p>
                  <p className="text-sm text-purple-400 mt-1">Add children to assign chores to them</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chores" className="space-y-4">
          <Card className="border-purple-200 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle>Custom Chores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {isAddingCustomChore ? (
                <AddCustomChoreForm 
                  onAddChore={handleAddCustomChore}
                  onCancel={() => setIsAddingCustomChore(false)}
                />
              ) : (
                <Button 
                  onClick={() => setIsAddingCustomChore(true)} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Custom Chore
                </Button>
              )}
              
              {customChores.length > 0 && (
                <div className="mt-4">
                  <Label className="mb-2 block">Your Custom Chores</Label>
                  <div className="space-y-2">
                    {customChores.map((chore) => (
                      <div key={chore.id} className="flex justify-between items-center p-2 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors">
                        <div className="flex items-center">
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCustomChore(chore.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!isAddingCustomChore && customChores.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-purple-50 rounded-lg border border-dashed border-purple-300">
                  <ListCheck className="h-10 w-10 mx-auto mb-2 text-purple-400" />
                  <p>No custom chores added yet</p>
                  <p className="text-sm text-purple-400 mt-1">Add custom chores to personalize your chart</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assign" className="space-y-4">
          {children.length > 0 ? (
            <Card className="border-purple-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                <CardTitle>Assign Chores</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2 text-purple-800">Chore</th>
                        {children.map((child) => (
                          <th key={child.id} className="text-center p-2 text-purple-800">
                            {child.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allChores.map((chore) => (
                        <tr key={chore.id} className="border-t border-purple-100 hover:bg-purple-50 transition-colors">
                          <td className="p-2">
                            <div className="flex items-center">
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
                          </td>
                          {children.map((child) => (
                            <td key={child.id} className="text-center p-2">
                              <Checkbox
                                className="border-purple-300 text-purple-600 data-[state=checked]:bg-purple-600"
                                checked={isAssigned(chore.id, child.id)}
                                onCheckedChange={() => toggleAssignment(chore.id, child.id)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-purple-200 shadow-md">
              <CardContent className="text-center py-8">
                <ListCheck className="h-12 w-12 mx-auto mb-2 text-purple-400" />
                <p className="text-gray-500 mb-4">Please add children before assigning chores.</p>
                <Button 
                  variant="outline" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    setActiveTab("children");
                  }}
                >
                  Go to Children Tab
                </Button>
              </CardContent>
            </Card>
          )}
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
