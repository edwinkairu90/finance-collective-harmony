
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScenarioItem } from "@/types/planning";
import { ScenarioLineItemsRow } from "./ScenarioLineItemsRow";

interface PLComparisonTableProps {
  scenarios: ScenarioItem[];
}

export const PLComparisonTable: React.FC<PLComparisonTableProps> = ({ scenarios }) => {
  // Ensure we have at least two scenarios to compare
  if (scenarios.length < 2) {
    return <div>At least two scenarios are needed for comparison</div>;
  }

  // Use the first scenario as the base for comparison
  const baseScenario = scenarios[0];
  const compareScenario = scenarios[1];

  // Define P&L line items for comparison
  const plLineItems = [
    { name: "Revenue", accessor: "revenue" },
    { name: "Cost of Sales", accessor: "costOfSales" },
    { name: "Gross Profit", accessor: "grossProfit", isTotal: true },
    // Department budgets would be displayed in the middle
    { name: "Total Budget", accessor: "totalBudget", isTotal: true },
    { name: "Net Profit", accessor: "profit", isTotal: true }
  ];

  // Get department list from the base scenario
  const departments = baseScenario.budgetImpact.departments 
    ? Object.keys(baseScenario.budgetImpact.departments) 
    : [];

  return (
    <div>
      <h3 className="text-md font-medium mb-3">Profit & Loss Statement Comparison</h3>
      <ScrollArea className="h-auto max-h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Line Item</TableHead>
              <TableHead>{baseScenario.name}</TableHead>
              <TableHead>{compareScenario.name}</TableHead>
              <TableHead>Variance</TableHead>
              <TableHead>% Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Revenue, Cost of Sales, and Gross Profit */}
            {plLineItems.slice(0, 3).map((item) => (
              <ScenarioLineItemsRow
                key={item.accessor}
                title={item.name}
                baseScenario={baseScenario}
                compareScenario={compareScenario}
                category={item.accessor}
                accessor={item.accessor}
                isTotal={item.isTotal}
              />
            ))}
            
            {/* Department budgets */}
            {departments.map((dept) => (
              <ScenarioLineItemsRow
                key={dept}
                title={`${dept} Department`}
                baseScenario={baseScenario}
                compareScenario={compareScenario}
                category="departments"
                accessor="budget"
                department={dept}
                indentLevel={1}
              />
            ))}
            
            {/* Total Budget and Net Profit */}
            {plLineItems.slice(3).map((item) => (
              <ScenarioLineItemsRow
                key={item.accessor}
                title={item.name}
                baseScenario={baseScenario}
                compareScenario={compareScenario}
                category={item.accessor}
                accessor={item.accessor}
                isTotal={item.isTotal}
              />
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
