
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
        <TableHead className="w-[180px] font-semibold">Revenue Category</TableHead>
        {monthlyRevenueDrivers.map(item => (
          <TableHead key={item.month} className="text-center font-semibold">{item.month}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
