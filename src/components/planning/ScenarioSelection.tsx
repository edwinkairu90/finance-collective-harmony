
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { ScenarioList } from "./ScenarioList";
import { ScenarioCreator } from "./ScenarioCreator";
import { GitCompare } from "lucide-react";
import { useScenarioContext } from "./context/ScenarioContext";

export const ScenarioSelection: React.FC = () => {
  const {
    activeTab,
    scenarios,
    selectedScenario,
    selectedScenariosForComparison,
    showComparisonView,
    setSelectedScenario,
    toggleScenarioSelection,
    clearComparisonSelection,
    handleCompareScenarios,
    handleCreateScenario,
    isScenarioSelected
  } = useScenarioContext();

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
                onClick={clearComparisonSelection}
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
          onToggleComparisonSelection={toggleScenarioSelection}
          selectedForComparison={isScenarioSelected}
        />
      </TabsContent>
      
      <TabsContent value="create">
        <ScenarioCreator onCreateScenario={handleCreateScenario} />
      </TabsContent>
    </>
  );
};
