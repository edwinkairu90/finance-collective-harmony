
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBudgetScenarios } from "./BudgetScenarioData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const BudgetScenarioFinancials: React.FC = () => {
  const scenarios = getBudgetScenarios();
  
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

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Financial Comparison</CardTitle>
        <CardDescription>Revenue, gross profit, expenses and net profit across different scenarios</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
