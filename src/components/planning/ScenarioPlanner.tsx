import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ScenarioList } from "./ScenarioList";
import { ScenarioCreator } from "./ScenarioCreator";
import { ScenarioItem } from "@/types/planning";
import { sampleScenarios } from "@/data/planningData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, BarChart3, PenLine, Save, Plus, X, Columns, GitCompare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScenarioComparison } from "./ScenarioComparison";

export const ScenarioPlanner: React.FC = () => {
  const { toast } = useToast();
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(sampleScenarios);
  const [activeTab, setActiveTab] = useState("existing");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem | null>(null);
  const [showImpactAnalysis, setShowImpactAnalysis] = useState(false);
  const [editingAssumptions, setEditingAssumptions] = useState(false);
  const [editedAssumptions, setEditedAssumptions] = useState<string[]>([]);
  const [newAssumption, setNewAssumption] = useState("");
  const [selectedScenariosForComparison, setSelectedScenariosForComparison] = useState<ScenarioItem[]>([]);
  const [showComparisonView, setShowComparisonView] = useState(false);
  
  const handleCreateScenario = (scenario: ScenarioItem) => {
    setScenarios([...scenarios, scenario]);
    
    toast({
      title: "Scenario Created",
      description: `${scenario.name} has been created successfully.`,
    });
    
    setActiveTab("existing");
  };

  const handleExportScenario = () => {
    if (!selectedScenario) {
      toast({
        title: "No Scenario Selected",
        description: "Please select a scenario to export.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Scenario Exported",
      description: `${selectedScenario.name} has been exported to Excel.`,
    });
  };

  const toggleImpactAnalysis = () => {
    if (!selectedScenario) {
      toast({
        title: "No Scenario Selected",
        description: "Please select a scenario to view impact analysis.",
        variant: "destructive",
      });
      return;
    }
    setShowImpactAnalysis(!showImpactAnalysis);
  };

  const handleStartEditAssumptions = () => {
    if (!selectedScenario) {
      toast({
        title: "No Scenario Selected",
        description: "Please select a scenario to edit assumptions.",
        variant: "destructive",
      });
      return;
    }
    setEditedAssumptions([...selectedScenario.assumptions]);
    setEditingAssumptions(true);
  };

  const handleSaveAssumptions = () => {
    if (!selectedScenario) return;
    
    // Filter out empty assumptions
    const filteredAssumptions = editedAssumptions.filter(a => a.trim() !== "");
    
    // Create updated scenario with new assumptions
    const updatedScenario = {
      ...selectedScenario,
      assumptions: filteredAssumptions
    };
    
    // Update the selected scenario
    setSelectedScenario(updatedScenario);
    
    // Update the scenario in the list
    const updatedScenarios = scenarios.map(s => 
      s.id === updatedScenario.id ? updatedScenario : s
    );
    setScenarios(updatedScenarios);
    
    setEditingAssumptions(false);
    
    toast({
      title: "Assumptions Updated",
      description: "Your changes to key assumptions have been saved.",
    });
  };

  const handleCancelEditAssumptions = () => {
    setEditingAssumptions(false);
  };

  const handleCompareScenarios = () => {
    if (selectedScenariosForComparison.length < 2) {
      toast({
        title: "Selection Required",
        description: "Please select at least two scenarios to compare.",
        variant: "destructive",
      });
      return;
    }
    
    setShowComparisonView(true);
  };
  
  const handleToggleScenarioSelection = (scenario: ScenarioItem) => {
    setSelectedScenariosForComparison(prev => {
      // Check if scenario is already selected
      const isAlreadySelected = prev.some(s => s.id === scenario.id);
      
      if (isAlreadySelected) {
        // Remove from selection
        return prev.filter(s => s.id !== scenario.id);
      } else {
        // Add to selection
        return [...prev, scenario];
      }
    });
  };
  
  const handleCloseComparison = () => {
    setShowComparisonView(false);
  };
  
  const handleExportComparison = () => {
    toast({
      title: "Comparison Exported",
      description: `Comparison of ${selectedScenariosForComparison.length} scenarios has been exported.`,
    });
  };

  const isScenarioSelected = (scenario: ScenarioItem) => {
    return selectedScenariosForComparison.some(s => s.id === scenario.id);
  };

  const handleAssumptionChange = (index: number, value: string) => {
    const newAssumptions = [...editedAssumptions];
    newAssumptions[index] = value;
    setEditedAssumptions(newAssumptions);
  };

  const handleRemoveAssumption = (index: number) => {
    const newAssumptions = editedAssumptions.filter((_, i) => i !== index);
    setEditedAssumptions(newAssumptions);
  };

  const handleAddAssumption = () => {
    if (newAssumption.trim() === "") return;
    setEditedAssumptions([...editedAssumptions, newAssumption]);
    setNewAssumption("");
  };

  // Transform department data for the chart
  const getDepartmentImpactData = () => {
    if (!selectedScenario) return [];
    
    return selectedScenario.departments.map(dept => ({
      name: dept.name,
      impact: dept.budgetChange
    }));
  };

  // Get financial impact data for the chart
  const getFinancialImpactData = () => {
    if (!selectedScenario) return [];
    
    return [
      { name: 'Revenue', value: selectedScenario.budgetImpact.revenue },
      { name: 'Expenses', value: selectedScenario.budgetImpact.expenses },
      { name: 'Profit', value: selectedScenario.budgetImpact.profit }
    ];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Scenario Planning</CardTitle>
            <CardDescription>Create and manage budget scenarios for strategic planning</CardDescription>
          </div>
          <div className="flex gap-2">
            {selectedScenario && (
              <>
                <Button 
                  variant="outline" 
                  onClick={toggleImpactAnalysis}
                  className="flex items-center gap-1"
                >
                  <BarChart3 className="h-4 w-4" />
                  {showImpactAnalysis ? "Hide Impact" : "Show Impact"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleExportScenario}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleStartEditAssumptions}
                  className="flex items-center gap-1"
                  disabled={editingAssumptions}
                >
                  <PenLine className="h-4 w-4" />
                  Edit Assumptions
                </Button>
              </>
            )}
            <Button 
              variant={selectedScenariosForComparison.length > 0 ? "default" : "outline"}
              onClick={handleCompareScenarios}
              className="flex items-center gap-1"
              disabled={selectedScenariosForComparison.length < 2}
            >
              <GitCompare className="h-4 w-4" />
              Compare ({selectedScenariosForComparison.length})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showComparisonView && (
          <ScenarioComparison 
            scenarios={selectedScenariosForComparison}
            onClose={handleCloseComparison}
            onExport={handleExportComparison}
          />
        )}

        {selectedScenario && showImpactAnalysis && (
          <div className="mb-6 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Impact Analysis: {selectedScenario.name}</CardTitle>
                <CardDescription>{selectedScenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Departmental Budget Impact</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getDepartmentImpactData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Budget Impact']} />
                          <Legend />
                          <Bar dataKey="impact" name="Budget Impact" fill="#0ea5e9" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium mb-2">Financial Impact</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getFinancialImpactData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                          <Legend />
                          <Bar dataKey="value" name="Amount" fill="#0ea5e9" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-medium">Key Assumptions</h3>
                    {editingAssumptions && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={handleSaveAssumptions}>
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEditAssumptions}>
                          <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {editingAssumptions ? (
                    <div className="space-y-2">
                      {editedAssumptions.map((assumption, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={assumption}
                            onChange={(e) => handleAssumptionChange(index, e.target.value)}
                            className="flex-grow"
                          />
                          <Button 
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveAssumption(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 mt-2">
                        <Input
                          value={newAssumption}
                          onChange={(e) => setNewAssumption(e.target.value)}
                          placeholder="Add a new assumption"
                          className="flex-grow"
                        />
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={handleAddAssumption}
                          disabled={newAssumption.trim() === ""}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedScenario.assumptions.map((assumption, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{assumption}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="existing">Existing Scenarios</TabsTrigger>
            <TabsTrigger value="create">Create New Scenario</TabsTrigger>
          </TabsList>
          
          <TabsContent value="existing">
            {!showComparisonView && selectedScenariosForComparison.length > 0 && (
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {selectedScenariosForComparison.length} scenario{selectedScenariosForComparison.length !== 1 ? 's' : ''} selected for comparison
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedScenariosForComparison([])}
                  >
                    Clear Selection
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleCompareScenarios}
                    disabled={selectedScenariosForComparison.length < 2}
                  >
                    <GitCompare className="h-4 w-4 mr-1" />
                    Compare
                  </Button>
                </div>
              </div>
            )}
            <ScenarioList 
              scenarios={scenarios} 
              onSelect={setSelectedScenario} 
              selectedScenario={selectedScenario}
              selectableForComparison
              onToggleComparisonSelection={handleToggleScenarioSelection}
              selectedForComparison={isScenarioSelected}
            />
          </TabsContent>
          
          <TabsContent value="create">
            <ScenarioCreator onCreateScenario={handleCreateScenario} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
