
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BudgetTimeline } from "./BudgetTimeline";
import { COLORS, getTotalBudget } from "./BudgetData";
import { BudgetScenarioSelector } from "./BudgetScenarioSelector";
import { BudgetScenarioComparison } from "./BudgetScenarioComparison";
import { BudgetScenarioType } from "@/types/budgetScenarios";
import { getBudgetScenarios, getScenarioById } from "./BudgetScenarioData";

export const BudgetOverview = () => {
  const [activeScenario, setActiveScenario] = useState<BudgetScenarioType>("base-case");
  const scenario = getScenarioById(activeScenario);
  
  const chartData = scenario ? scenario.departments.map(dept => ({
    name: dept.name,
    value: dept.budget
  })) : [];

  return (
    <>
      <BudgetScenarioSelector 
        activeScenario={activeScenario}
        onScenarioChange={setActiveScenario}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>FY 2025 Budget Allocation - {scenario?.name}</CardTitle>
          <CardDescription>{scenario?.description}</CardDescription>
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
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Total Budget: ${scenario?.totalBudget.toLocaleString() || 0}
          </div>
        </CardFooter>
      </Card>

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
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
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
