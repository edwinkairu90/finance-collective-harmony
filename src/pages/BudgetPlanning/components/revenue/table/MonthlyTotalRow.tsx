
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { MonthlyRevenueData } from "../types/revenueTypes";
import { calculateMonthlyTotal } from "../utils/revenueCalculations";

interface MonthlyTotalRowProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const MonthlyTotalRow: React.FC<MonthlyTotalRowProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <TableRow className="bg-slate-100 dark:bg-slate-800/30 border-t border-slate-300 dark:border-slate-700">
      <TableCell className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Monthly Total Revenue</TableCell>
      {monthlyRevenueDrivers.map(item => (
        <TableCell key={`total-${item.month}`} className="text-center font-semibold text-slate-800 dark:text-slate-200 text-sm">
          {formatCurrency(calculateMonthlyTotal(item.month, monthlyRevenueDrivers))}
        </TableCell>
      ))}
    </TableRow>
  );
};
