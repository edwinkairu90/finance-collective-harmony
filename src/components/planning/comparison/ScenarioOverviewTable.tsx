
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScenarioItem } from "@/types/planning";

interface ScenarioOverviewTableProps {
  scenarios: ScenarioItem[];
}

export const ScenarioOverviewTable: React.FC<ScenarioOverviewTableProps> = ({ scenarios }) => {
  return (
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
          {scenarios.map((scenario) => (
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
  );
};
