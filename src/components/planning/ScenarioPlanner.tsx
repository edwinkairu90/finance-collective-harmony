
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ScenarioItem } from "@/types/planning";
import { sampleScenarios } from "@/data/planningData";
import { ScenarioToolbar } from "./ScenarioToolbar";
import { ScenarioSelection } from "./ScenarioSelection";
import { ScenarioImpactAnalysis } from "./ScenarioImpactAnalysis";
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

  const handleClearComparisonSelection = () => {
    setSelectedScenariosForComparison([]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Scenario Planning</CardTitle>
            <CardDescription>Create and manage budget scenarios for strategic planning</CardDescription>
          </div>
          <ScenarioToolbar 
            selectedScenario={selectedScenario}
            showImpactAnalysis={showImpactAnalysis}
            selectedScenariosForComparison={selectedScenariosForComparison}
            editingAssumptions={editingAssumptions}
            onToggleImpactAnalysis={toggleImpactAnalysis}
            onExportScenario={handleExportScenario}
            onStartEditAssumptions={handleStartEditAssumptions}
            onCompareScenarios={handleCompareScenarios}
          />
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
          <ScenarioImpactAnalysis 
            scenario={selectedScenario}
            editingAssumptions={editingAssumptions}
            editedAssumptions={editedAssumptions}
            newAssumption={newAssumption}
            onAssumptionChange={handleAssumptionChange}
            onRemoveAssumption={handleRemoveAssumption}
            onNewAssumptionChange={setNewAssumption}
            onAddAssumption={handleAddAssumption}
            onSaveAssumptions={handleSaveAssumptions}
            onCancelEditAssumptions={handleCancelEditAssumptions}
          />
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="existing">Existing Scenarios</TabsTrigger>
            <TabsTrigger value="create">Create New Scenario</TabsTrigger>
          </TabsList>
          
          <ScenarioSelection 
            activeTab={activeTab}
            scenarios={scenarios}
            selectedScenario={selectedScenario}
            selectedScenariosForComparison={selectedScenariosForComparison}
            showComparisonView={showComparisonView}
            onSelect={setSelectedScenario}
            onToggleComparisonSelection={handleToggleScenarioSelection}
            onClearComparisonSelection={handleClearComparisonSelection}
            onCompareScenarios={handleCompareScenarios}
            onCreateScenario={handleCreateScenario}
            isScenarioSelected={isScenarioSelected}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};
