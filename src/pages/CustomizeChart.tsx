import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChores } from "@/contexts/ChoreContext";
import {
  Child,
  ChoreTemplate,
  ChoreAssignment,
  Chore,
} from "@/contexts/types/choreTypes";
import { Button } from "@/components/ui/button";
import {
  Check,
  Save,
  Share2,
  ArrowLeft,
  Sparkles,
  Users,
  ClipboardList,
  UserCheck,
  Eye,
  Wand2,
  Heart,
  Target,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartDetails } from "@/components/chart-customizer/ChartDetails";
import { ChildrenManager } from "@/components/chart-customizer/ChildrenManager";
import { CustomChoresManager } from "@/components/chart-customizer/CustomChoresManager";
import { DragDropChoreAssignment } from "@/components/chart-customizer/DragDropChoreAssignment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
  const [currentStep, setCurrentStep] = useState<number>(1);
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
        title: "Chart Created Successfully! 🎉",
        description: `"${chartName}" is ready to use!`,
      });

      navigate(`/chart/${newChart.id}`);
    } catch (error) {
      console.error("Error creating chart:", error);
      toast({
        title: "Error",
        description:
          "There was a problem creating your chart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveDraft = () => {
    const draftData = {
      templateId,
      chartName,
      children,
      assignments,
      customChores,
    };
    localStorage.setItem("choreChartDraft", JSON.stringify(draftData));
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
    if (template && (template.chores.length > 0 || customChores.length > 0))
      progress += 25;
    return progress;
  };

  const getStepStatus = (step: number) => {
    switch (step) {
      case 1:
        return chartName.trim()
          ? "completed"
          : currentStep === 1
            ? "active"
            : "pending";
      case 2:
        return children.length > 0
          ? "completed"
          : currentStep === 2
            ? "active"
            : "pending";
      case 3:
        return customChores.length > 0 || template?.chores.length > 0
          ? "completed"
          : currentStep === 3
            ? "active"
            : "pending";
      case 4:
        return assignments.length > 0
          ? "completed"
          : currentStep === 4
            ? "active"
            : "pending";
      default:
        return "pending";
    }
  };

  const getNextAction = () => {
    if (!chartName.trim()) return { text: "Name your chart", step: 1 };
    if (children.length === 0) return { text: "Add your children", step: 2 };
    if (customChores.length === 0 && template?.chores.length === 0)
      return { text: "Add chores", step: 3 };
    if (assignments.length === 0) return { text: "Assign chores", step: 4 };
    return { text: "Ready to create!", step: 5 };
  };

  const steps = [
    {
      number: 1,
      title: "Chart Details",
      description: "Name and customize your chart",
      icon: <BookOpen className="h-5 w-5" />,
      content: "details",
    },
    {
      number: 2,
      title: "Add Children",
      description: "Who will be using this chart?",
      icon: <Users className="h-5 w-5" />,
      content: "children",
    },
    {
      number: 3,
      title: "Manage Chores",
      description: "Add custom chores or use template chores",
      icon: <ClipboardList className="h-5 w-5" />,
      content: "chores",
    },
    {
      number: 4,
      title: "Assign & Create",
      description: "Assign chores to children",
      icon: <UserCheck className="h-5 w-5" />,
      content: "assign",
    },
  ];

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-200 border-t-cyan-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your template...</p>
        </div>
      </div>
    );
  }

  const allChores = [...template.chores, ...customChores];
  const nextAction = getNextAction();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-cyan-50 to-teal-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/templates")}
                  className="text-slate-300 hover:text-cyan-300 hover:bg-slate-600/50 p-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Badge className="bg-slate-600/50 text-cyan-300 border-slate-500">
                  {template.type.charAt(0).toUpperCase() +
                    template.type.slice(1)}{" "}
                  Template
                </Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-cyan-300">
                Customize Your {template.name}
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl">
                Let's create a personalized chore chart that works perfectly for
                your family.
              </p>
            </div>

            {/* Progress Summary */}
            <div className="bg-slate-600/30 backdrop-blur-sm rounded-xl p-6 min-w-[280px] border border-slate-500/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 font-medium">
                  Setup Progress
                </span>
                <span className="text-cyan-300 font-bold text-lg">
                  {calculateProgress()}%
                </span>
              </div>
              <Progress
                value={calculateProgress()}
                className="mb-3 bg-slate-600/50"
              />
              <div className="flex items-center text-slate-300 text-sm">
                <Target className="h-4 w-4 mr-2 text-cyan-300" />
                {nextAction.text}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {steps.map((step, index) => {
              const status = getStepStatus(step.number);
              const isActive = currentStep === step.number;
              const isCompleted = status === "completed";

              return (
                <div
                  key={step.number}
                  className={`flex-1 cursor-pointer transition-all duration-300 ${
                    isActive ? "transform scale-105" : ""
                  }`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  <Card
                    className={`h-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-cyan-100 shadow-lg"
                        : isActive
                          ? "border-teal-400 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-md"
                          : "border-slate-200 bg-white hover:border-cyan-300 hover:shadow-sm"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                            isCompleted
                              ? "bg-cyan-500 text-white shadow-lg"
                              : isActive
                                ? "bg-teal-500 text-white shadow-md"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-semibold text-sm lg:text-base transition-colors ${
                              isCompleted
                                ? "text-cyan-700"
                                : isActive
                                  ? "text-teal-700"
                                  : "text-slate-700"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-xs lg:text-sm text-slate-600 leading-tight">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-white to-cyan-50 border-cyan-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600 mb-1">
                {children.length}
              </div>
              <div className="text-sm text-slate-600">Children</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-teal-50 border-teal-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-600 mb-1">
                {allChores.length}
              </div>
              <div className="text-sm text-slate-600">Available Chores</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-600 mb-1">
                {assignments.length}
              </div>
              <div className="text-sm text-slate-600">Assignments</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-cyan-50 border-cyan-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600 mb-1 capitalize">
                {template.type}
              </div>
              <div className="text-sm text-slate-600">Template</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Step Content */}
          <div className="xl:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-200">
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  {steps[currentStep - 1]?.icon}
                  {steps[currentStep - 1]?.title}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {steps[currentStep - 1]?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {currentStep === 1 && (
                  <ChartDetails
                    template={template}
                    chartName={chartName}
                    setChartName={setChartName}
                  />
                )}

                {currentStep === 2 && (
                  <ChildrenManager
                    children={children}
                    setChildren={setChildren}
                  />
                )}

                {currentStep === 3 && (
                  <CustomChoresManager
                    customChores={customChores}
                    setCustomChores={setCustomChores}
                  />
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    {children.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">
                          No Children Added Yet
                        </h3>
                        <p className="text-slate-500 mb-4">
                          Add children first before assigning chores.
                        </p>
                        <Button
                          onClick={() => setCurrentStep(2)}
                          className="bg-cyan-600 hover:bg-cyan-700"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Add Children
                        </Button>
                      </div>
                    ) : allChores.length === 0 ? (
                      <div className="text-center py-12">
                        <ClipboardList className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">
                          No Chores Available
                        </h3>
                        <p className="text-slate-500 mb-4">
                          Add some chores before making assignments.
                        </p>
                        <Button
                          onClick={() => setCurrentStep(3)}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Add Chores
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-slate-800 mb-2">
                            Assign Chores to Children
                          </h3>
                          <p className="text-slate-600">
                            Drag chores from the list to assign them to
                            children, or use the assign buttons.
                          </p>
                        </div>
                        <DragDropChoreAssignment
                          children={children}
                          allChores={allChores}
                          assignments={assignments}
                          setAssignments={setAssignments}
                        />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Navigation Actions */}
            <Card className="bg-gradient-to-br from-white to-slate-50 border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-slate-800">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="w-full justify-start text-slate-600 hover:text-slate-800 border-slate-300"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Step
                  </Button>
                )}

                {currentStep < 4 && (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="w-full justify-start bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700"
                  >
                    Next Step
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="w-full justify-start text-slate-600 hover:text-slate-800 border-slate-300"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="w-full justify-start text-slate-600 hover:text-slate-800 border-slate-300"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {isPreviewMode ? "Edit Mode" : "Preview Chart"}
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-teal-800 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-teal-600" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Heart className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-teal-800 mb-1">
                      Start Simple
                    </p>
                    <p className="text-teal-700">
                      Begin with 2-3 age-appropriate chores and build up
                      gradually.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-teal-800 mb-1">
                      Be Specific
                    </p>
                    <p className="text-teal-700">
                      Clear instructions help children succeed and feel
                      confident.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wand2 className="h-4 w-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-teal-800 mb-1">
                      Celebrate Success
                    </p>
                    <p className="text-teal-700">
                      Positive reinforcement builds lasting habits and
                      motivation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-6 bg-white rounded-xl shadow-lg border border-slate-200">
          <div className="text-center sm:text-left">
            <p className="text-slate-600 text-sm">
              Ready to create your chart? Make sure all steps are complete.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Progress: {calculateProgress()}% complete
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/templates")}
              className="border-slate-300 text-slate-600 hover:text-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChart}
              disabled={calculateProgress() < 100}
              className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-8 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="mr-2 h-4 w-4" />
              Create Chart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeChart;
