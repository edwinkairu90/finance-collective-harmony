
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
  
  const opexData = scenarios.map(scenario => ({
    name: scenario.name,
    value: scenario.financials.opex,
    color: scenario.color,
    category: "Operating Expenses"
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
      name: "Operating Expenses",
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

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Financial Comparison</CardTitle>
        <CardDescription>Revenue, expenses and profit across different scenarios</CardDescription>
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
                fill="#3498db" 
                name="Base Case" 
              />
              <Bar 
                dataKey="Worst Case" 
                fill="#e74c3c" 
                name="Worst Case" 
              />
              <Bar 
                dataKey="Best Case" 
                fill="#2ecc71" 
                name="Best Case" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
