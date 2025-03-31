
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { MonthlyRevenueData } from "../types/revenueTypes";
import { calculateSegmentTotalRevenue, calculateTotalClients, calculateTotalSubscription } from "../utils/revenueCalculations";

interface SMBSegmentTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const SMBSegmentTable: React.FC<SMBSegmentTableProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <>
      <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
        <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
            SMB
          </Badge>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Existing Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-clients-${item.month}`} className="text-center">
            {item.smb.clients}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">New Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-new-clients-${item.month}`} className="text-center">
            {item.smb.newClients}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Total Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-total-clients-${item.month}`} className="text-center">
            {calculateTotalClients(item.smb)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Monthly Subscription/Client</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-subscription-per-client-${item.month}`} className="text-center">
            {formatCurrency(item.smb.monthlySubscriptionPerClient)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Total Subscription</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-total-subscription-${item.month}`} className="text-center">
            {formatCurrency(calculateTotalSubscription(item.smb))}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Implementation Fee</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-implementation-${item.month}`} className="text-center">
            {formatCurrency(item.smb.implementationFee)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Expansion Revenue</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-expansion-${item.month}`} className="text-center">
            {formatCurrency(item.smb.expansionRevenue)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow className="bg-slate-50/70 dark:bg-slate-800/20">
        <TableCell className="font-semibold pl-6 text-emerald-700 dark:text-emerald-400">Total SMB Revenue</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`smb-total-${item.month}`} className="text-center font-semibold text-emerald-700 dark:text-emerald-400">
            {formatCurrency(calculateSegmentTotalRevenue(item.smb))}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};
