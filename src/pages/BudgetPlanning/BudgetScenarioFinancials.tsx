
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { BudgetScenario } from "@/types/budgetScenarios";
import { formatCurrency } from "@/lib/utils";

interface BudgetScenarioFinancialsProps {
  scenarios: BudgetScenario[];
}

export const BudgetScenarioFinancials: React.FC<BudgetScenarioFinancialsProps> = ({ scenarios }) => {
  // Format data for different charts
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
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="opex">OPEX</TabsTrigger>
            <TabsTrigger value="profit">Profit</TabsTrigger>
            <TabsTrigger value="margins">Margins</TabsTrigger>
          </TabsList>

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
