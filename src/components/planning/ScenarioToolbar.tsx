
import React from "react";
import { Button } from "@/components/ui/button";
import { ScenarioItem } from "@/types/planning";
import { BarChart3, Download, PenLine, GitCompare } from "lucide-react";

interface ScenarioToolbarProps {
  selectedScenario: ScenarioItem | null;
  showImpactAnalysis: boolean;
  selectedScenariosForComparison: ScenarioItem[];
  editingAssumptions: boolean;
  onToggleImpactAnalysis: () => void;
  onExportScenario: () => void;
  onStartEditAssumptions: () => void;
  onCompareScenarios: () => void;
}

export const ScenarioToolbar: React.FC<ScenarioToolbarProps> = ({
  selectedScenario,
  showImpactAnalysis,
  selectedScenariosForComparison,
  editingAssumptions,
  onToggleImpactAnalysis,
  onExportScenario,
  onStartEditAssumptions,
  onCompareScenarios
}) => {
  return (
    <div className="flex gap-2">
      {selectedScenario && (
        <>
          <Button 
            variant="outline" 
            onClick={onToggleImpactAnalysis}
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            {showImpactAnalysis ? "Hide Impact" : "Show Impact"}
          </Button>
          <Button 
            variant="outline" 
            onClick={onExportScenario}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            onClick={onStartEditAssumptions}
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
        onClick={onCompareScenarios}
        className="flex items-center gap-1"
        disabled={selectedScenariosForComparison.length < 2}
      >
        <GitCompare className="h-4 w-4" />
        Compare ({selectedScenariosForComparison.length})
      </Button>
    </div>
  );
};
