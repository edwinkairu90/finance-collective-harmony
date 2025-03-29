
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, PenLine, GitCompare } from "lucide-react";
import { useScenarioContext } from "./context/ScenarioContext";

export const ScenarioToolbar: React.FC = () => {
  const {
    selectedScenario,
    showImpactAnalysis,
    selectedScenariosForComparison,
    editingAssumptions,
    toggleImpactAnalysis,
    handleExportScenario,
    handleStartEditAssumptions,
    handleCompareScenarios
  } = useScenarioContext();

  return (
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
  );
};
