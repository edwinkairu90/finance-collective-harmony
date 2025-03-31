
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
      <TableCell className="font-bold text-teal-700 dark:text-teal-400 text-xs">Monthly Total Revenue</TableCell>
      {monthlyRevenueDrivers.map(item => (
        <TableCell key={`total-${item.month}`} className="text-center font-bold text-teal-700 dark:text-teal-400 text-xs">
          {formatCurrency(calculateMonthlyTotal(item.month, monthlyRevenueDrivers))}
        </TableCell>
      ))}
    </TableRow>
  );
};
