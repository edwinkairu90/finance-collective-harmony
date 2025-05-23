import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BudgetTimeline } from "./BudgetTimeline";
import { COLORS, getTotalBudget } from "./BudgetData";
import { BudgetScenarioComparison } from "./BudgetScenarioComparison";
import { BudgetScenarioFinancials } from "./BudgetScenarioFinancials";
import { BudgetScenarioType } from "@/types/budgetScenarios";
import { getBudgetScenarios, getScenarioById } from "./BudgetScenarioData";
import { formatCurrency } from "@/lib/format";

export const BudgetOverview = () => {
  // Still maintain the activeScenario state but with a default value
  const [activeScenario] = useState<BudgetScenarioType>("base-case");
  const scenario = getScenarioById(activeScenario);
  const scenarios = getBudgetScenarios();
  
  const chartData = scenario ? scenario.departments.map(dept => ({
    name: dept.name,
    value: dept.budget
  })) : [];

  return (
    <>
      <Card>
        <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
          <CardTitle className="text-xl font-montserrat font-semibold text-slate-800 dark:text-slate-200">FY 2025 Budget Allocation</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300">Current budget allocation based on the base case scenario</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(value as number), undefined]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Total Budget: {formatCurrency(scenario?.totalBudget || 0)}
          </div>
          {scenario && (
            <div className="text-sm">
              <div className="flex space-x-4">
                <div className="text-green-600">Revenue: {formatCurrency(scenario.financials.revenue)}</div>
                <div className="text-blue-600">Gross Profit: {formatCurrency(scenario.financials.grossProfit)}</div>
                <div className="text-red-600">Expenses: {formatCurrency(scenario.financials.opex)}</div>
                <div className={scenario.financials.profit >= 0 ? "text-green-600" : "text-red-600"}>
                  Net Profit: {formatCurrency(scenario.financials.profit)}
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
      
      <BudgetScenarioFinancials scenarios={scenarios} />

      <div className="grid grid-cols-1 gap-4 mt-4">
        <BudgetScenarioComparison />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <BudgetTimeline />
        <QuickActions />
      </div>
    </>
  );
};

const QuickActions = () => {
  return (
    <Card>
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-xl font-montserrat font-semibold text-slate-800 dark:text-slate-200">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="justify-start">Import Data</Button>
          <Button variant="outline" className="justify-start">Export Budget</Button>
          <Button variant="outline" className="justify-start">Department Comparison</Button>
          <Button variant="outline" className="justify-start">Historical Analysis</Button>
          <Button variant="outline" className="justify-start">Share Budget</Button>
          <Button variant="outline" className="justify-start">Send Reminders</Button>
        </div>
      </CardContent>
    </Card>
  );
};
