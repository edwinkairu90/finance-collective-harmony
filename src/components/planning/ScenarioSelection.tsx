
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { ScenarioList } from "./ScenarioList";
import { ScenarioCreator } from "./ScenarioCreator";
import { ScenarioItem } from "@/types/planning";
import { GitCompare } from "lucide-react";

interface ScenarioSelectionProps {
  activeTab: string;
  scenarios: ScenarioItem[];
  selectedScenario: ScenarioItem | null;
  selectedScenariosForComparison: ScenarioItem[];
  showComparisonView: boolean;
  onSelect: (scenario: ScenarioItem) => void;
  onToggleComparisonSelection: (scenario: ScenarioItem) => void;
  onClearComparisonSelection: () => void;
  onCompareScenarios: () => void;
  onCreateScenario: (scenario: ScenarioItem) => void;
  isScenarioSelected: (scenario: ScenarioItem) => boolean;
}

export const ScenarioSelection: React.FC<ScenarioSelectionProps> = ({
  activeTab,
  scenarios,
  selectedScenario,
  selectedScenariosForComparison,
  showComparisonView,
  onSelect,
  onToggleComparisonSelection,
  onClearComparisonSelection,
  onCompareScenarios,
  onCreateScenario,
  isScenarioSelected
}) => {
  return (
    <>
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
                onClick={onClearComparisonSelection}
              >
                Clear Selection
              </Button>
              <Button 
                size="sm" 
                onClick={onCompareScenarios}
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
          onSelect={onSelect} 
          selectedScenario={selectedScenario}
          selectableForComparison
          onToggleComparisonSelection={onToggleComparisonSelection}
          selectedForComparison={isScenarioSelected}
        />
      </TabsContent>
      
      <TabsContent value="create">
        <ScenarioCreator onCreateScenario={onCreateScenario} />
      </TabsContent>
    </>
  );
};
