
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScenarioItem } from "@/types/planning";
import { formatCurrency } from "@/lib/format";

interface ScenarioOverviewTableProps {
  scenarios: ScenarioItem[];
}

export const ScenarioOverviewTable: React.FC<ScenarioOverviewTableProps> = ({ scenarios }) => {
  return (
    <div>
      <h3 className="text-md font-medium mb-3">Scenario Overview</h3>
      <Table>
        <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
          <TableRow>
            <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Scenario</TableHead>
            <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Type</TableHead>
            <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Timeline</TableHead>
            <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Revenue Impact</TableHead>
            <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Expense Impact</TableHead>
            <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Profit Impact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scenarios.map((scenario) => (
            <TableRow key={scenario.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
              <TableCell className="font-medium text-slate-800 dark:text-slate-200 text-sm">{scenario.name}</TableCell>
              <TableCell className="text-slate-800 dark:text-slate-200 text-sm">{scenario.type.replace('-', ' ')}</TableCell>
              <TableCell className="text-slate-800 dark:text-slate-200 text-sm">{scenario.timeline}</TableCell>
              <TableCell className="text-slate-800 dark:text-slate-200 text-sm">{formatCurrency(scenario.budgetImpact.revenue)}</TableCell>
              <TableCell className="text-slate-800 dark:text-slate-200 text-sm">{formatCurrency(scenario.budgetImpact.expenses)}</TableCell>
              <TableCell 
                className={
                  scenario.budgetImpact.profit >= 0 
                    ? 'text-green-600 text-sm' 
                    : 'text-red-600 text-sm'
                }
              >
                {formatCurrency(scenario.budgetImpact.profit)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
