
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { MonthlyRevenueData } from "./types/revenueTypes";
import { calculateMonthlyTotal } from "./utils/revenueCalculations";

interface MonthlyRevenueTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const MonthlyRevenueTable: React.FC<MonthlyRevenueTableProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
          <TableRow>
            <TableHead className="w-[180px]">Revenue Category</TableHead>
            {monthlyRevenueDrivers.map(item => (
              <TableHead key={item.month} className="text-center">{item.month}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-purple-600 dark:text-purple-400">Enterprise New Clients</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`enterprise-clients-${item.month}`} className="text-center font-medium">
                {item.enterprise.newClients}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-purple-600 dark:text-purple-400">Enterprise MRR</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`enterprise-mrr-${item.month}`} className="text-center font-medium">
                ${formatCurrency(item.enterprise.subscriptionRevenue)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-blue-600 dark:text-blue-400">Mid-Market New Clients</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`midmarket-clients-${item.month}`} className="text-center font-medium">
                {item.midMarket.newClients}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-blue-600 dark:text-blue-400">Mid-Market MRR</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`midmarket-mrr-${item.month}`} className="text-center font-medium">
                ${formatCurrency(item.midMarket.subscriptionRevenue)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-emerald-600 dark:text-emerald-400">SMB New Clients</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`smb-clients-${item.month}`} className="text-center font-medium">
                {item.smb.newClients}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-emerald-600 dark:text-emerald-400">SMB MRR</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`smb-mrr-${item.month}`} className="text-center font-medium">
                ${formatCurrency(item.smb.subscriptionRevenue)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-blue-600 dark:text-blue-400">Implementation Revenue</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`implementation-${item.month}`} className="text-center font-medium">
                ${formatCurrency(item.implementationRevenue)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
            <TableCell className="font-medium text-amber-600 dark:text-amber-400">Other Revenue</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`other-${item.month}`} className="text-center font-medium">
                ${formatCurrency(item.otherRevenue)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow className="bg-slate-50 dark:bg-slate-800/20 border-t-2 border-slate-200">
            <TableCell className="font-bold text-teal-700 dark:text-teal-400">Monthly Total</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`total-${item.month}`} className="text-center font-bold text-teal-700 dark:text-teal-400">
                ${formatCurrency(calculateMonthlyTotal(item.month, monthlyRevenueDrivers))}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
