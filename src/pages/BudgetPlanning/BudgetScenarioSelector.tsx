
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Package, Pencil } from "lucide-react";
import { BudgetScenarioType, ScenarioFactor } from "@/types/budgetScenarios";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScenarioFactorsEditor } from "./ScenarioFactorsEditor";
import { ScenarioAssumptionsEditor } from "./ScenarioAssumptionsEditor";
import { getScenarioById, updateScenarioFactors, updateScenarioAssumptions } from "./BudgetScenarioData";

interface BudgetScenarioSelectorProps {
  activeScenario: BudgetScenarioType;
  onScenarioChange: (scenario: BudgetScenarioType) => void;
}

export const BudgetScenarioSelector: React.FC<BudgetScenarioSelectorProps> = ({ 
  activeScenario, 
  onScenarioChange 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("factors");
  
  const scenario = getScenarioById(activeScenario);

  const handleSaveFactors = (updatedFactors: ScenarioFactor[]) => {
    // In a real app, this would update state through context or redux
    // For demo purposes, we'll just call the update function
    updateScenarioFactors(activeScenario, updatedFactors);
  };

  const handleSaveAssumptions = (updatedAssumptions: string[]) => {
    // In a real app, this would update state through context or redux
    // For demo purposes, we'll just call the update function
    updateScenarioAssumptions(activeScenario, updatedAssumptions);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Budget Scenarios</CardTitle>
            <CardDescription>View different budget projections</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDetails(!showDetails)}
          >
            <Pencil className="h-4 w-4 mr-1" /> 
            {showDetails ? "Hide Details" : "Edit Factors"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={activeScenario} 
          onValueChange={(value) => onScenarioChange(value as BudgetScenarioType)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="base-case" id="base-case" />
            <Label htmlFor="base-case" className="flex items-center cursor-pointer">
              <Package className="h-5 w-5 mr-2 text-slate-500" />
              <div>
                <span className="font-medium">Base Case</span>
                <p className="text-sm text-muted-foreground">Expected budget based on current projections</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="worst-case" id="worst-case" />
            <Label htmlFor="worst-case" className="flex items-center cursor-pointer">
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
              <div>
                <span className="font-medium">Worst Case</span>
                <p className="text-sm text-muted-foreground">Conservative budget with 15% reduction</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="best-case" id="best-case" />
            <Label htmlFor="best-case" className="flex items-center cursor-pointer">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              <div>
                <span className="font-medium">Best Case</span>
                <p className="text-sm text-muted-foreground">Optimistic budget with 10% increase</p>
              </div>
            </Label>
          </div>
        </RadioGroup>

        {showDetails && scenario && (
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="factors">Key Factors</TabsTrigger>
                <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="factors" className="mt-4">
                <ScenarioFactorsEditor 
                  scenarioId={activeScenario}
                  factors={scenario.factors}
                  onSave={handleSaveFactors}
                />
              </TabsContent>
              
              <TabsContent value="assumptions" className="mt-4">
                <ScenarioAssumptionsEditor
                  scenarioId={activeScenario}
                  assumptions={scenario.assumptions}
                  onSave={handleSaveAssumptions}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
