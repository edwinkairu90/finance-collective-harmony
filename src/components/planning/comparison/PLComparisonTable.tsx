
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScenarioItem } from "@/types/planning";

interface PLComparisonTableProps {
  scenarios: ScenarioItem[];
}

export const PLComparisonTable: React.FC<PLComparisonTableProps> = ({ scenarios }) => {
  // Define P&L line items for comparison
  const plLineItems = [
    { name: "Revenue", accessor: "revenue" },
    { name: "Expenses", accessor: "expenses" },
    { name: "Profit", accessor: "profit", isTotal: true }
  ];

  return (
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
  );
};
