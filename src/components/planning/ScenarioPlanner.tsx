
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ScenarioList } from "./ScenarioList";
import { ScenarioCreator } from "./ScenarioCreator";
import { ScenarioItem } from "@/types/planning";
import { sampleScenarios } from "@/data/planningData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, BarChart3 } from "lucide-react";

export const ScenarioPlanner: React.FC = () => {
  const { toast } = useToast();
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(sampleScenarios);
  const [activeTab, setActiveTab] = useState("existing");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioItem | null>(null);
  const [showImpactAnalysis, setShowImpactAnalysis] = useState(false);

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

  // Transform department data for the chart
  const getDepartmentImpactData = () => {
    if (!selectedScenario) return [];
    
    return selectedScenario.departments.map(dept => ({
      name: dept.name,
      impact: dept.budgetChange
    }));
  };

  // Get financial impact data for the chart
  const getFinancialImpactData = () => {
    if (!selectedScenario) return [];
    
    return [
      { name: 'Revenue', value: selectedScenario.budgetImpact.revenue },
      { name: 'Expenses', value: selectedScenario.budgetImpact.expenses },
      { name: 'Profit', value: selectedScenario.budgetImpact.profit }
    ];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Scenario Planning</CardTitle>
            <CardDescription>Create and manage budget scenarios for strategic planning</CardDescription>
          </div>
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
              </>
            )}
            <Button 
              variant="outline" 
              onClick={handleCompareScenarios}
              disabled={scenarios.length < 2}
            >
              Compare Scenarios
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {selectedScenario && showImpactAnalysis && (
          <div className="mb-6 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Impact Analysis: {selectedScenario.name}</CardTitle>
                <CardDescription>{selectedScenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-md font-medium mb-2">Departmental Budget Impact</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getDepartmentImpactData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Budget Impact']} />
                          <Legend />
                          <Bar dataKey="impact" name="Budget Impact" fill="#0ea5e9" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-medium mb-2">Financial Impact</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getFinancialImpactData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                          <Legend />
                          <Bar dataKey="value" name="Amount" fill="#0ea5e9" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-medium mb-2">Key Assumptions</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedScenario.assumptions.map((assumption, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{assumption}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
