
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MonthlyRevenueData } from "../types/revenueTypes";

interface TableHeaderProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const RevenueTableHeader: React.FC<TableHeaderProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
      <TableRow>
        <TableHead className="w-[180px] text-sm text-slate-600 dark:text-slate-300 font-medium">Revenue Category</TableHead>
        {monthlyRevenueDrivers.map(item => (
          <TableHead key={item.month} className="text-center text-sm text-slate-600 dark:text-slate-300 font-medium">{item.month}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
