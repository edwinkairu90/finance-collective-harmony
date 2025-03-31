
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { MonthlyRevenueData } from "../types/revenueTypes";
import { formatCurrency } from "@/lib/format";

interface OtherRevenueTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const OtherRevenueTable: React.FC<OtherRevenueTableProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <>
      <TableRow className="bg-slate-50 dark:bg-slate-800/50">
        <TableCell 
          colSpan={monthlyRevenueDrivers.length + 1} 
          className="font-medium text-slate-800 dark:text-slate-300"
        >
          Other Revenue
        </TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">Additional Revenue</TableCell>
        {monthlyRevenueDrivers.map((item) => (
          <TableCell key={`${item.month}-other`} className="text-center text-sm">
            {formatCurrency(item.otherRevenue)}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};
