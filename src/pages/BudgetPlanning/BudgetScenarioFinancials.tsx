
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgetScenarios } from "./BudgetScenarioData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScenarioFactorsEditor } from "./ScenarioFactorsEditor";
import { ScenarioAssumptionsEditor } from "./ScenarioAssumptionsEditor";
import { ScenarioFactor } from "@/types/budgetScenarios";

export const BudgetScenarioFinancials: React.FC = () => {
  const scenarios = getBudgetScenarios();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("chart");
  const [selectedScenario, setSelectedScenario] = useState<string>("base-case");
  const [editMode, setEditMode] = useState(false);
  
  // Format data for the bar chart
  const revenueData = scenarios.map(scenario => ({
    name: scenario.name,
    value: scenario.financials.revenue,
    color: scenario.color,
    category: "Revenue"
  }));
  
  const grossProfitData = scenarios.map(scenario => ({
    name: scenario.name,
    value: scenario.financials.grossProfit,
    color: scenario.color,
    category: "Gross Profit"
  }));
  
  const opexData = scenarios.map(scenario => ({
    name: scenario.name,
    value: scenario.financials.opex,
    color: scenario.color,
    category: "Opex"
  }));
  
  const profitData = scenarios.map(scenario => ({
    name: scenario.name,
    value: scenario.financials.profit,
    color: scenario.color,
    category: "Net Profit"
  }));
  
  // Combined data for grouped bar chart
  const combinedData = [
    {
      name: "Revenue",
      "Base Case": scenarios.find(s => s.id === "base-case")?.financials.revenue || 0,
      "Worst Case": scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0,
      "Best Case": scenarios.find(s => s.id === "best-case")?.financials.revenue || 0,
    },
    {
      name: "Gross Profit",
      "Base Case": scenarios.find(s => s.id === "base-case")?.financials.grossProfit || 0,
      "Worst Case": scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0,
      "Best Case": scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0,
    },
    {
      name: "Opex",
      "Base Case": scenarios.find(s => s.id === "base-case")?.financials.opex || 0,
      "Worst Case": scenarios.find(s => s.id === "worst-case")?.financials.opex || 0,
      "Best Case": scenarios.find(s => s.id === "best-case")?.financials.opex || 0,
    },
    {
      name: "Net Profit",
      "Base Case": scenarios.find(s => s.id === "base-case")?.financials.profit || 0,
      "Worst Case": scenarios.find(s => s.id === "worst-case")?.financials.profit || 0,
      "Best Case": scenarios.find(s => s.id === "best-case")?.financials.profit || 0,
    }
  ];

  // Format currency for Y-axis
  const formatYAxis = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  // Get scenario colors for the bars
  const baseScenario = scenarios.find(s => s.id === "base-case");
  const worstScenario = scenarios.find(s => s.id === "worst-case");
  const bestScenario = scenarios.find(s => s.id === "best-case");

  // Get the current scenario data
  const currentScenario = scenarios.find(s => s.id === selectedScenario);

  // Handle save of factors and assumptions
  const handleSaveFactors = (factors: ScenarioFactor[]) => {
    // In a real app, this would save to a database or context
    toast({
      title: "Factors updated",
      description: "The scenario factors have been updated successfully",
    });
    setEditMode(false);
  };

  const handleSaveAssumptions = (assumptions: string[]) => {
    // In a real app, this would save to a database or context
    toast({
      title: "Assumptions updated",
      description: "The scenario assumptions have been updated successfully",
    });
    setEditMode(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Financial Comparison</CardTitle>
            <CardDescription>Revenue, gross profit, expenses and net profit across different scenarios</CardDescription>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="factors">Factors</TabsTrigger>
              <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="chart" className="space-y-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={combinedData} margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={formatYAxis} 
                  width={80}
                />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
                  labelFormatter={(label) => `${label}`}
                />
                <Legend />
                <Bar 
                  dataKey="Base Case" 
                  fill={baseScenario?.color || "#1F4D46"} 
                  name="Base Case" 
                />
                <Bar 
                  dataKey="Worst Case" 
                  fill={worstScenario?.color || "#4DC1CB"} 
                  name="Worst Case" 
                />
                <Bar 
                  dataKey="Best Case" 
                  fill={bestScenario?.color || "#F8D25B"} 
                  name="Best Case" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="factors" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedScenario("base-case")}
                className={selectedScenario === "base-case" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                Base Case
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedScenario("worst-case")}
                className={selectedScenario === "worst-case" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                Worst Case
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedScenario("best-case")}
                className={selectedScenario === "best-case" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                Best Case
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {editMode ? "Save" : "Edit Factors"}
            </Button>
          </div>

          {currentScenario && editMode ? (
            <ScenarioFactorsEditor 
              scenarioId={currentScenario.id as any}
              factors={currentScenario.factors}
              onSave={handleSaveFactors}
            />
          ) : (
            <div className="space-y-4">
              {currentScenario?.factors.map((factor, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{factor.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      factor.impact > 0 ? 'bg-green-100 text-green-800' : 
                      factor.impact < 0 ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {factor.impact > 0 ? '+' : ''}{factor.impact}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{factor.description}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="assumptions" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedScenario("base-case")}
                className={selectedScenario === "base-case" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                Base Case
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedScenario("worst-case")}
                className={selectedScenario === "worst-case" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                Worst Case
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedScenario("best-case")}
                className={selectedScenario === "best-case" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
              >
                Best Case
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {editMode ? "Save" : "Edit Assumptions"}
            </Button>
          </div>

          {currentScenario && editMode ? (
            <ScenarioAssumptionsEditor 
              scenarioId={currentScenario.id as any}
              assumptions={currentScenario.assumptions}
              onSave={handleSaveAssumptions}
            />
          ) : (
            <ul className="list-disc pl-5 space-y-2">
              {currentScenario?.assumptions.map((assumption, index) => (
                <li key={index} className="text-sm">{assumption}</li>
              ))}
            </ul>
          )}
        </TabsContent>
      </CardContent>
    </Card>
  );
};
