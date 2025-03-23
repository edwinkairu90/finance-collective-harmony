
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBudgetScenarios } from "./BudgetScenarioData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BudgetScenarioComparison: React.FC = () => {
  const scenarios = getBudgetScenarios();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  
  // Find departments across all scenarios
  const allDepartments = scenarios.flatMap(s => s.departments)
    .filter((dept, index, self) => 
      index === self.findIndex(d => d.id === dept.id)
    )
    .sort((a, b) => b.budget - a.budget);

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

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
                <TableHead className="w-[40px]"></TableHead>
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
                <TableCell colSpan={scenarios.length + 4} className="py-2">
                  Financial Metrics
                </TableCell>
              </TableRow>
              
              {/* Revenue Row */}
              <TableRow>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0"
                    onClick={() => toggleRowExpansion('revenue')}
                  >
                    {expandedRows['revenue'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </TableCell>
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
              
              {/* Revenue Detail Rows */}
              {expandedRows['revenue'] && (
                <>
                  {scenarios[0].factors.map(factor => (
                    <TableRow key={`revenue-factor-${factor.id}`} className="bg-muted/10">
                      <TableCell></TableCell>
                      <TableCell className="pl-8 text-sm text-muted-foreground">
                        {factor.name}
                      </TableCell>
                      {scenarios.map(scenario => {
                        const scenarioFactor = scenario.factors.find(f => f.id === factor.id);
                        const impact = scenarioFactor ? 
                          (scenario.financials.revenue * (scenarioFactor.impact / 100)) : 0;
                        
                        return (
                          <TableCell key={`revenue-impact-${scenario.id}-${factor.id}`} className="text-right text-sm">
                            {scenarioFactor ? 
                              `${scenarioFactor.impact > 0 ? '+' : ''}${scenarioFactor.impact.toFixed(1)}% (${impact > 0 ? '+' : ''}$${formatCurrency(impact)})` : 
                              'N/A'}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-right text-sm">
                        {/* Variance calculation for this factor across scenarios */}
                        ${formatCurrency(
                          ((scenarios.find(s => s.id === "best-case")?.factors.find(f => f.id === factor.id)?.impact || 0) - 
                           (scenarios.find(s => s.id === "worst-case")?.factors.find(f => f.id === factor.id)?.impact || 0)) / 100 * 
                          (scenarios.find(s => s.id === "base-case")?.financials.revenue || 0)
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {((
                          (scenarios.find(s => s.id === "best-case")?.factors.find(f => f.id === factor.id)?.impact || 0) - 
                          (scenarios.find(s => s.id === "worst-case")?.factors.find(f => f.id === factor.id)?.impact || 0)
                        ).toFixed(1))}%
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
              
              {/* Cost of Sales (calculated as revenue - gross profit) */}
              <TableRow>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0"
                    onClick={() => toggleRowExpansion('cos')}
                  >
                    {expandedRows['cos'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </TableCell>
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
              
              {/* Cost of Sales Detail Rows */}
              {expandedRows['cos'] && (
                <>
                  {scenarios[0].assumptions.slice(0, 2).map((assumption, idx) => (
                    <TableRow key={`cos-assumption-${idx}`} className="bg-muted/10">
                      <TableCell></TableCell>
                      <TableCell className="pl-8 text-sm text-muted-foreground">
                        {assumption.substring(0, 30)}
                      </TableCell>
                      {scenarios.map((scenario) => {
                        const costOfSales = scenario.financials.revenue - scenario.financials.grossProfit;
                        // Simplified assumption: we're attributing costs proportionally to the first 2 assumptions
                        const impact = costOfSales / 2;
                        
                        return (
                          <TableCell key={`cos-impact-${scenario.id}-${idx}`} className="text-right text-sm">
                            ${formatCurrency(impact)}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-right text-sm">
                        {/* Variance calculation */}
                        ${formatCurrency(
                          (((scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) - 
                           (scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0)) - 
                          ((scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0) - 
                           (scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0))) / 2
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {(() => {
                          const baseCaseCOS = (scenarios.find(s => s.id === "base-case")?.financials.revenue || 0) -
                                            (scenarios.find(s => s.id === "base-case")?.financials.grossProfit || 0);
                          const bestCaseCOS = (scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) -
                                            (scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0);
                          const worstCaseCOS = (scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0) -
                                             (scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0);
                          
                          return ((bestCaseCOS - worstCaseCOS) / (baseCaseCOS || 1) * 100 / 2).toFixed(1) + '%';
                        })()}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
              
              {/* Gross Profit Row */}
              <TableRow className="border-b-2 border-gray-300">
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0"
                    onClick={() => toggleRowExpansion('gross-profit')}
                  >
                    {expandedRows['gross-profit'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </TableCell>
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
              
              {/* Gross Profit Detail Rows */}
              {expandedRows['gross-profit'] && (
                <TableRow className="bg-muted/10">
                  <TableCell></TableCell>
                  <TableCell className="pl-8 text-sm text-muted-foreground">
                    Gross Margin
                  </TableCell>
                  {scenarios.map(scenario => {
                    const grossMargin = (scenario.financials.grossProfit / scenario.financials.revenue * 100).toFixed(1);
                    return (
                      <TableCell key={`gm-${scenario.id}`} className="text-right text-sm">
                        {grossMargin}%
                      </TableCell>
                    );
                  })}
                  <TableCell className="text-right text-sm">
                    {(
                      (scenarios.find(s => s.id === "best-case")?.financials.grossProfit || 0) / 
                      (scenarios.find(s => s.id === "best-case")?.financials.revenue || 1) * 100 -
                      (scenarios.find(s => s.id === "worst-case")?.financials.grossProfit || 0) / 
                      (scenarios.find(s => s.id === "worst-case")?.financials.revenue || 1) * 100
                    ).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    N/A
                  </TableCell>
                </TableRow>
              )}
              
              {/* Department budget section header */}
              <TableRow className="bg-muted/30 font-semibold">
                <TableCell colSpan={scenarios.length + 4} className="py-2">
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
                  <React.Fragment key={dept.id}>
                    <TableRow>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 p-0"
                          onClick={() => toggleRowExpansion(`dept-${dept.id}`)}
                        >
                          {expandedRows[`dept-${dept.id}`] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </Button>
                      </TableCell>
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
                    
                    {/* Department Details */}
                    {expandedRows[`dept-${dept.id}`] && (
                      <>
                        {scenarios[0].factors.slice(0, 2).map((factor, idx) => (
                          <TableRow key={`dept-detail-${dept.id}-${idx}`} className="bg-muted/10">
                            <TableCell></TableCell>
                            <TableCell className="pl-8 text-sm text-muted-foreground">
                              {factor.name} Impact
                            </TableCell>
                            {scenarios.map(scenario => {
                              const budget = scenario.departments.find(d => d.id === dept.id)?.budget || 0;
                              const scenarioFactor = scenario.factors.find(f => f.id === factor.id);
                              
                              // Calculate approximate impact on this department
                              const impact = scenarioFactor ? 
                                budget * (scenarioFactor.impact / 100) / 2 : 0; // Divide by 2 to distribute impact
                              
                              return (
                                <TableCell key={`dept-impact-${scenario.id}-${dept.id}-${idx}`} className="text-right text-sm">
                                  ${formatCurrency(impact)}
                                </TableCell>
                              );
                            })}
                            <TableCell className="text-right text-sm">
                              ${formatCurrency(
                                ((scenarios.find(s => s.id === "best-case")?.departments.find(d => d.id === dept.id)?.budget || 0) - 
                                 (scenarios.find(s => s.id === "worst-case")?.departments.find(d => d.id === dept.id)?.budget || 0)) / 4
                              )}
                            </TableCell>
                            <TableCell className="text-right text-sm">
                              {variancePercent / 2}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                );
              })}
              
              {/* Total Row */}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell></TableCell>
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
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 p-0"
                    onClick={() => toggleRowExpansion('net-profit')}
                  >
                    {expandedRows['net-profit'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </TableCell>
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
              
              {/* Net Profit Detail Rows */}
              {expandedRows['net-profit'] && (
                <>
                  <TableRow className="bg-muted/10">
                    <TableCell></TableCell>
                    <TableCell className="pl-8 text-sm text-muted-foreground">
                      Revenue
                    </TableCell>
                    {scenarios.map(scenario => (
                      <TableCell key={`np-revenue-${scenario.id}`} className="text-right text-sm">
                        ${formatCurrency(scenario.financials.revenue)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right text-sm">
                      ${formatCurrency(
                        (scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) - 
                        (scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0)
                      )}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {((
                        ((scenarios.find(s => s.id === "best-case")?.financials.revenue || 0) - 
                         (scenarios.find(s => s.id === "worst-case")?.financials.revenue || 0)) /
                        (scenarios.find(s => s.id === "base-case")?.financials.revenue || 1) * 100
                      ).toFixed(1))}%
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/10">
                    <TableCell></TableCell>
                    <TableCell className="pl-8 text-sm text-muted-foreground">
                      OPEX
                    </TableCell>
                    {scenarios.map(scenario => (
                      <TableCell key={`np-opex-${scenario.id}`} className="text-right text-sm">
                        ${formatCurrency(scenario.financials.opex)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right text-sm">
                      ${formatCurrency(
                        (scenarios.find(s => s.id === "best-case")?.financials.opex || 0) - 
                        (scenarios.find(s => s.id === "worst-case")?.financials.opex || 0)
                      )}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {((
                        ((scenarios.find(s => s.id === "best-case")?.financials.opex || 0) - 
                         (scenarios.find(s => s.id === "worst-case")?.financials.opex || 0)) /
                        (scenarios.find(s => s.id === "base-case")?.financials.opex || 1) * 100
                      ).toFixed(1))}%
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
