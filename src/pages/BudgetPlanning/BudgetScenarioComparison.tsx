
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBudgetScenarios } from "./BudgetScenarioData";
import { ScrollArea } from "@/components/ui/scroll-area";

export const BudgetScenarioComparison: React.FC = () => {
  const scenarios = getBudgetScenarios();
  
  // Find departments across all scenarios
  const allDepartments = scenarios.flatMap(s => s.departments)
    .filter((dept, index, self) => 
      index === self.findIndex(d => d.id === dept.id)
    )
    .sort((a, b) => b.budget - a.budget);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Comparison</CardTitle>
        <CardDescription>How different scenarios impact department budgets</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Department</TableHead>
                {scenarios.map(scenario => (
                  <TableHead 
                    key={scenario.id}
                    className="text-right"
                    style={{ color: scenario.color }}
                  >
                    {scenario.name}
                  </TableHead>
                ))}
                <TableHead className="text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allDepartments.map(dept => {
                const baseCase = scenarios.find(s => s.id === "base-case")?.departments.find(d => d.id === dept.id)?.budget || 0;
                const bestCase = scenarios.find(s => s.id === "best-case")?.departments.find(d => d.id === dept.id)?.budget || 0;
                const worstCase = scenarios.find(s => s.id === "worst-case")?.departments.find(d => d.id === dept.id)?.budget || 0;
                const variance = bestCase - worstCase;
                const variancePercent = baseCase > 0 ? Math.round((variance / baseCase) * 100) : 0;
                
                return (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    {scenarios.map(scenario => {
                      const budget = scenario.departments.find(d => d.id === dept.id)?.budget || 0;
                      return (
                        <TableCell key={`${dept.id}-${scenario.id}`} className="text-right">
                          ${budget.toLocaleString()}
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-right font-medium">
                      ${variance.toLocaleString()} ({variancePercent}%)
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {/* Total Row */}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>Total Budget</TableCell>
                {scenarios.map(scenario => (
                  <TableCell key={`total-${scenario.id}`} className="text-right">
                    ${scenario.totalBudget.toLocaleString()}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  ${(scenarios.find(s => s.id === "best-case")?.totalBudget || 0 - 
                     scenarios.find(s => s.id === "worst-case")?.totalBudget || 0).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
