
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { BudgetScenario } from "@/types/budgetScenarios";
import { formatCurrency } from "@/lib/utils";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface BudgetScenarioFinancialsProps {
  scenarios: BudgetScenario[];
}

export const BudgetScenarioFinancials: React.FC<BudgetScenarioFinancialsProps> = ({ scenarios }) => {
  // Format data for different charts
  
  // New approach: Format data for comparing all metrics side by side
  const allMetricsData = scenarios.map(scenario => ({
    name: scenario.name,
    Revenue: scenario.financials.revenue,
    "Gross Profit": scenario.financials.grossProfit,
    OPEX: scenario.financials.opex,
    "Net Profit": scenario.financials.profit,
    color: scenario.color
  }));
  
  // Original individual metric data formats
  const revenueChartData = scenarios.map(scenario => ({
    name: scenario.name,
    Revenue: scenario.financials.revenue,
    fill: scenario.color
  }));

  const opexChartData = scenarios.map(scenario => ({
    name: scenario.name,
    OPEX: scenario.financials.opex,
    fill: scenario.color
  }));

  const profitChartData = scenarios.map(scenario => ({
    name: scenario.name,
    Profit: scenario.financials.profit,
    fill: scenario.color
  }));

  const marginChartData = scenarios.map(scenario => ({
    name: scenario.name,
    'Gross Margin': (scenario.financials.grossProfit / scenario.financials.revenue) * 100,
    'Profit Margin': (scenario.financials.profit / scenario.financials.revenue) * 100
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Financial Comparison</CardTitle>
        <CardDescription>
          Compare key financial metrics across budget scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all-metrics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all-metrics">All Metrics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="opex">OPEX</TabsTrigger>
            <TabsTrigger value="profit">Profit</TabsTrigger>
            <TabsTrigger value="margins">Margins</TabsTrigger>
          </TabsList>

          <TabsContent value="all-metrics">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart 
                data={allMetricsData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `$${value / 1000}k`} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip 
                  formatter={(value) => [`$${formatCurrency(value as number)}`, undefined]} 
                />
                <Legend />
                <Bar 
                  dataKey="Revenue" 
                  name="Revenue" 
                  fill="#1F4D46" // Dark teal (Base case color)
                  stackId="a"
                />
                <Bar 
                  dataKey="Gross Profit" 
                  name="Gross Profit" 
                  fill="#4DC1CB" // Medium teal (Worst case color)
                  stackId="b"
                />
                <Bar 
                  dataKey="OPEX" 
                  name="OPEX" 
                  fill="#F8D25B" // Yellow (Best case color)
                  stackId="c"
                />
                <Bar 
                  dataKey="Net Profit" 
                  name="Net Profit" 
                  fill="#A855F7" // Purple (Custom color)
                  stackId="d"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => [`$${formatCurrency(value as number)}`, 'Revenue']} />
                <Legend />
                {scenarios.map((scenario, index) => (
                  <Bar 
                    key={index}
                    dataKey="Revenue" 
                    name={`${scenario.name} Revenue`} 
                    fill={scenario.color} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="opex">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={opexChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => [`$${formatCurrency(value as number)}`, 'OPEX']} />
                <Legend />
                {scenarios.map((scenario, index) => (
                  <Bar 
                    key={index} 
                    dataKey="OPEX" 
                    name={`${scenario.name} OPEX`} 
                    fill={scenario.color} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="profit">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => [`$${formatCurrency(value as number)}`, 'Profit']} />
                <Legend />
                {scenarios.map((scenario, index) => (
                  <Bar 
                    key={index} 
                    dataKey="Profit" 
                    name={`${scenario.name} Profit`} 
                    fill={scenario.color} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="margins">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marginChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Gross Margin" 
                  stroke="#4caf50" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="Profit Margin" 
                  stroke="#ff9800" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

