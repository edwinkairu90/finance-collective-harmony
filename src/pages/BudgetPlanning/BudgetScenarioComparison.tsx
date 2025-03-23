
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBudgetScenarios } from "./BudgetScenarioData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";

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
        <ScrollArea className="h-[450px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Line Item</TableHead>
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
                <TableHead className="text-right">% Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Financial metrics section */}
              <TableRow className="bg-muted/30 font-semibold">
                <TableCell colSpan={scenarios.length + 3} className="py-2">
                  Financial Metrics
                </TableCell>
              </TableRow>
              
              {/* Revenue Row */}
              <TableRow>
                <TableCell className="font-medium">Revenue</TableCell>
                {scenarios.map(scenario => (
                  <TableCell key={`revenue-${scenario.id}`} className="text-right">
                    ${formatCurrency(scenario.financials.revenue)}
                  </TableCell>
                ))}
                <TableCell className="text-right font-medium">
                  ${formatCurrency(
                    (scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) - 
                    (scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0)
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {((
                    ((scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) - 
                     (scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0)) /
                    (scenarios.find(s => s.id === "base-case")?.financials.revenue || 1) * 100
                  ).toFixed(1))}%
                </TableCell>
              </TableRow>
              
              {/* Cost of Sales (calculated as revenue - gross profit) */}
              <TableRow>
                <TableCell className="font-medium">Cost of Sales</TableCell>
                {scenarios.map(scenario => {
                  const costOfSales = scenario.financials.revenue - scenario.financials.grossProfit;
                  return (
                    <TableCell key={`cos-${scenario.id}`} className="text-right">
                      ${formatCurrency(costOfSales)}
                    </TableCell>
                  );
                })}
                <TableCell className="text-right font-medium">
                  ${formatCurrency(
                    ((scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) - 
                     (scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0)) - 
                    ((scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0) - 
                     (scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0))
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {(() => {
                    const baseCaseCOS = (scenarios.find(s => s.id === "base-case")?.financials.revenue || 0) -
                                      (scenarios.find(s => s.id === "base-case")?.financials.grossProfit || 0);
                    const bestCaseCOS = (scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) -
                                      (scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0);
                    const worstCaseCOS = (scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0) -
                                       (scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0);
                    
                    return ((bestCaseCOS - worstCaseCOS) / (baseCaseCOS || 1) * 100).toFixed(1) + '%';
                  })()}
                </TableCell>
              </TableRow>
              
              {/* Gross Profit Row */}
              <TableRow className="border-b-2 border-gray-300">
                <TableCell className="font-medium">Gross Profit</TableCell>
                {scenarios.map(scenario => (
                  <TableCell key={`gp-${scenario.id}`} className="text-right">
                    ${formatCurrency(scenario.financials.grossProfit)}
                  </TableCell>
                ))}
                <TableCell className="text-right font-medium">
                  ${formatCurrency(
                    (scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0) - 
                    (scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0)
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {((
                    ((scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0) - 
                     (scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0)) /
                    (scenarios.find(s => s.id === "base-case")?.financials.grossProfit || 1) * 100
                  ).toFixed(1))}%
                </TableCell>
              </TableRow>
              
              {/* Department budget section header */}
              <TableRow className="bg-muted/30 font-semibold">
                <TableCell colSpan={scenarios.length + 3} className="py-2">
                  Department Budgets
                </TableCell>
              </TableRow>
              
              {/* Department rows */}
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
                          ${formatCurrency(budget)}
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-right font-medium">
                      ${formatCurrency(variance)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {variancePercent}%
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {/* Total Row */}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>Total Budget</TableCell>
                {scenarios.map(scenario => (
                  <TableCell key={`total-${scenario.id}`} className="text-right">
                    ${formatCurrency(scenario.totalBudget)}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  ${formatCurrency(
                    (scenarios.find(s => s.id === "best-case")?.totalBudget || 0) - 
                    (scenarios.find(s => s.id === "worst-case")?.totalBudget || 0)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {((
                    ((scenarios.find(s => s.id === "best-case")?.totalBudget || 0) - 
                     (scenarios.find(s => s.id === "worst-case")?.totalBudget || 0)) /
                    (scenarios.find(s => s.id === "base-case")?.totalBudget || 1) * 100
                  ).toFixed(1))}%
                </TableCell>
              </TableRow>
              
              {/* Net Profit Row (last row) */}
              <TableRow className="bg-blue-50">
                <TableCell className="font-bold">Net Profit</TableCell>
                {scenarios.map(scenario => (
                  <TableCell 
                    key={`profit-${scenario.id}`} 
                    className={`text-right font-bold ${scenario.financials.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    ${formatCurrency(scenario.financials.profit)}
                  </TableCell>
                ))}
                <TableCell className="text-right font-bold">
                  ${formatCurrency(
                    (scenarios.find(s => s.id === "best-case")?.financials.profit || 0) - 
                    (scenarios.find(s => s.id === "worst-case")?.financials.profit || 0)
                  )}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {((
                    ((scenarios.find(s => s.id === "best-case")?.financials.profit || 0) - 
                     (scenarios.find(s => s.id === "worst-case")?.financials.profit || 0)) /
                    Math.abs(scenarios.find(s => s.id === "base-case")?.financials.profit || 1) * 100
                  ).toFixed(1))}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
