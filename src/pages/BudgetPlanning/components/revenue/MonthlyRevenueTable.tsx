import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { MonthlyRevenueData } from "./types/revenueTypes";
import { calculateMonthlyTotal } from "./utils/revenueCalculations";
import { Badge } from "@/components/ui/badge";

interface MonthlyRevenueTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const MonthlyRevenueTable: React.FC<MonthlyRevenueTableProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700">
      <Table>
        <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
          <TableRow>
            <TableHead className="w-[180px] font-semibold">Revenue Category</TableHead>
            {monthlyRevenueDrivers.map(item => (
              <TableHead key={item.month} className="text-center font-semibold">{item.month}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Enterprise Section */}
          <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
            <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                Enterprise
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">New Clients</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`enterprise-clients-${item.month}`} className="text-center">
                {item.enterprise.newClients}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">Revenue</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`enterprise-mrr-${item.month}`} className="text-center">
                ${formatCurrency(item.enterprise.subscriptionRevenue)}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Mid-Market Section */}
          <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
            <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                Mid-Market
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">New Clients</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`midmarket-clients-${item.month}`} className="text-center">
                {item.midMarket.newClients}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">Revenue</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`midmarket-mrr-${item.month}`} className="text-center">
                ${formatCurrency(item.midMarket.subscriptionRevenue)}
              </TableCell>
            ))}
          </TableRow>
          
          {/* SMB Section */}
          <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
            <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                SMB
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">New Clients</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`smb-clients-${item.month}`} className="text-center">
                {item.smb.newClients}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">Revenue</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`smb-mrr-${item.month}`} className="text-center">
                ${formatCurrency(item.smb.subscriptionRevenue)}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Other Revenue Streams */}
          <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
            <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800">
                Other Revenue
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">Implementation</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`implementation-${item.month}`} className="text-center">
                ${formatCurrency(item.implementationRevenue)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="font-medium pl-6">Other</TableCell>
            {monthlyRevenueDrivers.map(item => (
              <TableCell key={`other-${item.month}`} className="text-center">
                ${formatCurrency(item.otherRevenue)}
              </TableCell>
            ))}
          </TableRow>
          
          {/* Total Row */}
          <TableRow className="bg-slate-100 dark:bg-slate-800/30 border-t border-slate-300 dark:border-slate-700">
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
