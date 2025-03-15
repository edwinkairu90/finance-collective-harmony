
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ScenarioList } from "./ScenarioList";
import { ScenarioCreator } from "./ScenarioCreator";
import { ScenarioItem } from "@/types/planning";
import { sampleScenarios } from "@/data/planningData";

export const ScenarioPlanner: React.FC = () => {
  const { toast } = useToast();
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(sampleScenarios);
  const [activeTab, setActiveTab] = useState("existing");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem | null>(null);

  const handleCreateScenario = (scenario: ScenarioItem) => {
    setScenarios([...scenarios, scenario]);
    
    toast({
      title: "Scenario Created",
      description: `${scenario.name} has been created successfully.`,
    });
    
    setActiveTab("existing");
  };

  const handleCompareScenarios = () => {
    toast({
      title: "Compare Feature",
      description: "Scenario comparison feature is coming soon.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Scenario Planning</CardTitle>
            <CardDescription>Create and manage budget scenarios for strategic planning</CardDescription>
          </div>
          <Button 
            variant="outline" 
            onClick={handleCompareScenarios}
            disabled={scenarios.length < 2}
          >
            Compare Scenarios
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="existing">Existing Scenarios</TabsTrigger>
            <TabsTrigger value="create">Create New Scenario</TabsTrigger>
          </TabsList>
          
          <TabsContent value="existing">
            <ScenarioList 
              scenarios={scenarios} 
              onSelect={setSelectedScenario} 
              selectedScenario={selectedScenario}
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
