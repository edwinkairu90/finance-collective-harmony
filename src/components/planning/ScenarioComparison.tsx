
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScenarioItem } from "@/types/planning";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScenarioComparisonProps {
  scenarios: ScenarioItem[];
  onClose: () => void;
  onExport?: () => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ 
  scenarios, 
  onClose,
  onExport
}) => {
  if (scenarios.length < 2) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Scenario Comparison</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Please select at least two scenarios to compare</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Define P&L line items for comparison
  const plLineItems = [
    { name: "Revenue", accessor: "revenue" },
    { name: "Expenses", accessor: "expenses" },
    { name: "Profit", accessor: "profit", isTotal: true }
  ];

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Scenario Comparison</CardTitle>
          <div className="flex gap-2">
            {onExport && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onExport}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Comparing {scenarios.length} scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* P&L Comparison Table */}
          <div>
            <h3 className="text-md font-medium mb-3">Profit & Loss Statement Comparison</h3>
            <ScrollArea className="h-auto max-h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Line Item</TableHead>
                    {scenarios.map((scenario) => (
                      <TableHead key={scenario.id}>{scenario.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plLineItems.map((item) => (
                    <TableRow key={item.name} className={item.isTotal ? "font-medium bg-muted/30" : ""}>
                      <TableCell className={item.isTotal ? "font-medium" : ""}>
                        {item.name}
                      </TableCell>
                      {scenarios.map((scenario) => {
                        const value = scenario.budgetImpact[item.accessor as keyof typeof scenario.budgetImpact];
                        return (
                          <TableCell 
                            key={`${scenario.id}-${item.accessor}`}
                            className={
                              item.isTotal && value >= 0 
                                ? 'text-green-600 font-medium' 
                                : item.isTotal && value < 0 
                                ? 'text-red-600 font-medium' 
                                : ''
                            }
                          >
                            ${value.toLocaleString()}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Scenario Summary Table */}
          <div>
            <h3 className="text-md font-medium mb-3">Scenario Overview</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Revenue Impact</TableHead>
                  <TableHead>Expense Impact</TableHead>
                  <TableHead>Profit Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.map((scenario, index) => (
                  <TableRow key={scenario.id}>
                    <TableCell className="font-medium">{scenario.name}</TableCell>
                    <TableCell>{scenario.type.replace('-', ' ')}</TableCell>
                    <TableCell>{scenario.timeline}</TableCell>
                    <TableCell>${scenario.budgetImpact.revenue.toLocaleString()}</TableCell>
                    <TableCell>${scenario.budgetImpact.expenses.toLocaleString()}</TableCell>
                    <TableCell 
                      className={
                        scenario.budgetImpact.profit >= 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }
                    >
                      ${scenario.budgetImpact.profit.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
