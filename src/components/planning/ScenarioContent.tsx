
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScenarioContext } from "./context/ScenarioContext";
import { ScenarioToolbar } from "./ScenarioToolbar";
import { ScenarioSelection } from "./ScenarioSelection";
import { ScenarioImpactAnalysis } from "./ScenarioImpactAnalysis";
import { ScenarioComparison } from "./ScenarioComparison";

export const ScenarioContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedScenario,
    showImpactAnalysis,
    editingAssumptions,
    editedAssumptions,
    newAssumption,
    showComparisonView,
    selectedScenariosForComparison,
    
    // Actions
    handleAssumptionChange,
    handleRemoveAssumption,
    setNewAssumption,
    handleAddAssumption,
    handleSaveAssumptions,
    handleCancelEditAssumptions,
    handleExportComparison,
    handleCloseComparison,
  } = useScenarioContext();

  return (
    <>
      <div className="flex justify-end mb-4">
        <ScenarioToolbar />
      </div>
      
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

      {!showComparisonView && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="existing">Existing Scenarios</TabsTrigger>
            <TabsTrigger value="create">Create New Scenario</TabsTrigger>
          </TabsList>
          
          <ScenarioSelection />
        </Tabs>
      )}
    </>
  );
};
