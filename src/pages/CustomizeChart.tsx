import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChores, Child, ChoreTemplate, ChoreAssignment, Chore } from "@/contexts/ChoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Plus, Trash, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const CustomizeChart = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getTemplateById, createChart } = useChores();
  
  // State
  const [chartName, setChartName] = useState<string>("");
  const [template, setTemplate] = useState<ChoreTemplate | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [newChildName, setNewChildName] = useState<string>("");
  const [assignments, setAssignments] = useState<ChoreAssignment[]>([]);
  
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
  
  const handleSaveChart = () => {
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
    
    const newChart = createChart({
      name: chartName,
      templateId: template.id,
      children: children,
      assignments: assignments,
    });
    
    toast({
      title: "Chart Created!",
      description: `"${chartName}" has been created successfully.`,
    });
    
    navigate(`/view/${newChart.id}`);
  };
  
  if (!template) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Customize Your Chore Chart</h1>
        <p className="text-gray-600">
          Add children, assign chores, and customize your {template.name} chart.
        </p>
      </header>
      
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Chart Details</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="assign">Assign Chores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chart Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="chart-name">Chart Name</Label>
                <Input
                  id="chart-name"
                  value={chartName}
                  onChange={(e) => setChartName(e.target.value)}
                  placeholder="Enter a name for your chart"
                />
              </div>
              
              <div>
                <Label>Template</Label>
                <div className="flex items-center p-2 border rounded-md bg-gray-50">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{template.name}</span>
                  <Badge variant="outline" className="ml-2">{template.type}</Badge>
                </div>
              </div>
              
              <div>
                <Label>Included Chores</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {template.chores.map((chore) => (
                    <div key={chore.id} className="flex items-center p-2 border rounded-md">
                      <span>{chore.icon}</span>
                      <span className="ml-2">{chore.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="children" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Children</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Enter child's name"
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddChild();
                    }
                  }}
                />
                <Button onClick={handleAddChild}>
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
              
              {children.length > 0 ? (
                <div className="space-y-2">
                  {children.map((child) => (
                    <div key={child.id} className="flex justify-between items-center p-2 border rounded-md">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-blue-600" />
                        <span>{child.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteChild(child.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>No children added yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assign" className="space-y-4">
          {children.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Assign Chores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-2">Chore</th>
                        {children.map((child) => (
                          <th key={child.id} className="text-center p-2">
                            {child.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {template.chores.map((chore) => (
                        <tr key={chore.id} className="border-t">
                          <td className="p-2">
                            <div className="flex items-center">
                              <span className="mr-2">{chore.icon}</span>
                              <div>
                                <div>{chore.name}</div>
                                <div className="text-xs text-gray-500">
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
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">Please add children before assigning chores.</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => {
                    // Find the children tab trigger and click it
                    const childrenTab = document.querySelector('[data-value="children"]');
                    if (childrenTab) {
                      (childrenTab as HTMLElement).click();
                    }
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
        <Button variant="outline" onClick={() => navigate('/templates')}>
          Cancel
        </Button>
        <Button onClick={handleSaveChart}>
          <Check className="mr-2 h-4 w-4" /> Create Chart
        </Button>
      </div>
    </div>
  );
};

export default CustomizeChart;
