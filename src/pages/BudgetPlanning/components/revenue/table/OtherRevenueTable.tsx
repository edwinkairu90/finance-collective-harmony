
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { MonthlyRevenueData } from "../types/revenueTypes";

interface OtherRevenueTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const OtherRevenueTable: React.FC<OtherRevenueTableProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <>
      <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
        <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800">
            Other Revenue
          </Badge>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Miscellaneous Revenue</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`other-${item.month}`} className="text-center">
            {formatCurrency(item.otherRevenue)}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};
