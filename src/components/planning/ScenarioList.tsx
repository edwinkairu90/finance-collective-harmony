
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScenarioItem } from "@/types/planning";
import { TrendingUp, Rocket, Target, MoreHorizontal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface ScenarioListProps {
  scenarios: ScenarioItem[];
  onSelect: (scenario: ScenarioItem) => void;
  selectedScenario: ScenarioItem | null;
}

export const ScenarioList: React.FC<ScenarioListProps> = ({ scenarios, onSelect, selectedScenario }) => {
  if (scenarios.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No scenarios created yet.</p>
        <Button variant="link" onClick={() => {}}>Create your first scenario</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <ScrollArea className="h-[400px] pr-3">
          <div className="space-y-2">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id}
                className={`p-3 border rounded-md cursor-pointer hover:bg-accent/50 transition-colors ${
                  selectedScenario?.id === scenario.id ? "bg-accent" : ""
                }`}
                onClick={() => onSelect(scenario)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getScenarioIcon(scenario.type)}
                      <h3 className="font-medium text-sm">{scenario.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{scenario.timeline}</p>
                  </div>
                  <Badge 
                    variant={
                      scenario.status === "approved" ? "default" : 
                      scenario.status === "in-review" ? "secondary" :
                      scenario.status === "rejected" ? "destructive" : "outline"
                    }
                    className="capitalize"
                  >
                    {scenario.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="lg:col-span-2 border rounded-lg">
        {selectedScenario ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedScenario.name}</h2>
                <p className="text-muted-foreground">{selectedScenario.description}</p>
              </div>
              <Badge className="capitalize">{selectedScenario.type.replace("-", " ")}</Badge>
            </div>

            <Separator className="my-4" />

            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="impact">Budget Impact</TabsTrigger>
                <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Timeline</h3>
                    <p>{selectedScenario.timeline}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Created By</h3>
                    <p>{selectedScenario.createdBy} on {selectedScenario.createdAt}</p>
                  </div>
                
                  <div>
                    <h3 className="font-medium mb-2">Status</h3>
                    <Badge className="capitalize">{selectedScenario.status}</Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="impact">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Revenue Impact</p>
                      <p className={`text-xl font-bold ${selectedScenario.budgetImpact.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${selectedScenario.budgetImpact.revenue.toLocaleString()}
                      </p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Expense Impact</p>
                      <p className="text-xl font-bold text-amber-600">
                        ${selectedScenario.budgetImpact.expenses.toLocaleString()}
                      </p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Profit Impact</p>
                      <p className={`text-xl font-bold ${selectedScenario.budgetImpact.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${selectedScenario.budgetImpact.profit.toLocaleString()}
                      </p>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Departmental Impact</h3>
                    <div className="space-y-2">
                      {selectedScenario.departments.map((dept) => (
                        <div key={dept.name} className="flex justify-between items-center p-2 bg-muted rounded-md">
                          <span>{dept.name}</span>
                          <span className={dept.budgetChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                            ${dept.budgetChange.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assumptions">
                <div>
                  <h3 className="font-medium mb-2">Key Assumptions</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedScenario.assumptions.map((assumption, index) => (
                      <li key={index} className="text-muted-foreground">{assumption}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end mt-6 space-x-2">
              <Button variant="outline">Edit Scenario</Button>
              <Button>Run Analysis</Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground p-4">
            <p>Select a scenario from the list to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

const getScenarioIcon = (type: string) => {
  switch (type) {
    case 'expansion':
      return <TrendingUp className="h-4 w-4" />;
    case 'product-launch':
      return <Rocket className="h-4 w-4" />;
    case 'cost-reduction':
      return <Target className="h-4 w-4" />;
    default:
      return <MoreHorizontal className="h-4 w-4" />;
  }
};
