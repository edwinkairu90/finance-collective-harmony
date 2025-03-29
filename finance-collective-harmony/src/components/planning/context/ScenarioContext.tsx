
import React, { createContext, useContext, useState } from "react";
import { ScenarioItem } from "@/types/planning";
import { sampleScenarios } from "@/data/planningData";
import { useToast } from "@/components/ui/use-toast";

type ScenarioContextType = {
  scenarios: ScenarioItem[];
  selectedScenario: ScenarioItem | null;
  activeTab: string;
  showImpactAnalysis: boolean;
  editingAssumptions: boolean;
  editedAssumptions: string[];
  newAssumption: string;
  selectedScenariosForComparison: ScenarioItem[];
  showComparisonView: boolean;
  
  // Actions
  setScenarios: (scenarios: ScenarioItem[]) => void;
  setSelectedScenario: (scenario: ScenarioItem | null) => void;
  setActiveTab: (tab: string) => void;
  toggleImpactAnalysis: () => void;
  handleStartEditAssumptions: () => void;
  handleSaveAssumptions: () => void;
  handleCancelEditAssumptions: () => void;
  handleAssumptionChange: (index: number, value: string) => void;
  handleRemoveAssumption: (index: number) => void;
  setNewAssumption: (value: string) => void;
  handleAddAssumption: () => void;
  toggleScenarioSelection: (scenario: ScenarioItem) => void;
  clearComparisonSelection: () => void;
  handleCompareScenarios: () => void;
  handleCloseComparison: () => void;
  handleExportScenario: () => void;
  handleCreateScenario: (scenario: ScenarioItem) => void;
  isScenarioSelected: (scenario: ScenarioItem) => boolean;
  handleExportComparison: () => void;
};

export const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export const ScenarioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const toggleScenarioSelection = (scenario: ScenarioItem) => {
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

  const clearComparisonSelection = () => {
    setSelectedScenariosForComparison([]);
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

  const handleCloseComparison = () => {
    setShowComparisonView(false);
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

  const handleCreateScenario = (scenario: ScenarioItem) => {
    setScenarios([...scenarios, scenario]);
    
    toast({
      title: "Scenario Created",
      description: `${scenario.name} has been created successfully.`,
    });
    
    setActiveTab("existing");
  };

  const isScenarioSelected = (scenario: ScenarioItem) => {
    return selectedScenariosForComparison.some(s => s.id === scenario.id);
  };

  const handleExportComparison = () => {
    toast({
      title: "Comparison Exported",
      description: `Comparison of ${selectedScenariosForComparison.length} scenarios has been exported.`,
    });
  };

  const value = {
    scenarios,
    selectedScenario,
    activeTab,
    showImpactAnalysis,
    editingAssumptions,
    editedAssumptions,
    newAssumption,
    selectedScenariosForComparison,
    showComparisonView,
    
    // Actions
    setScenarios,
    setSelectedScenario,
    setActiveTab,
    toggleImpactAnalysis,
    handleStartEditAssumptions,
    handleSaveAssumptions,
    handleCancelEditAssumptions,
    handleAssumptionChange,
    handleRemoveAssumption,
    setNewAssumption,
    handleAddAssumption,
    toggleScenarioSelection: toggleScenarioSelection,
    clearComparisonSelection,
    handleCompareScenarios,
    handleCloseComparison,
    handleExportScenario,
    handleCreateScenario,
    isScenarioSelected,
    handleExportComparison,
  };

  return <ScenarioContext.Provider value={value}>{children}</ScenarioContext.Provider>;
};

export const useScenarioContext = () => {
  const context = useContext(ScenarioContext);
  if (context === undefined) {
    throw new Error("useScenarioContext must be used within a ScenarioProvider");
  }
  return context;
};
