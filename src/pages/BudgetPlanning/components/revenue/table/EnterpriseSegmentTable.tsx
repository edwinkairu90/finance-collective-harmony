
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { MonthlyRevenueData, SegmentData } from "../types/revenueTypes";
import { calculateSegmentTotalRevenue, calculateTotalClients, calculateTotalSubscription } from "../utils/revenueCalculations";

interface EnterpriseSegmentTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const EnterpriseSegmentTable: React.FC<EnterpriseSegmentTableProps> = ({
  monthlyRevenueDrivers
}) => {
  return (
    <>
      <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
        <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
            Enterprise
          </Badge>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Existing Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-clients-${item.month}`} className="text-center">
            {item.enterprise.clients}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">New Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-new-clients-${item.month}`} className="text-center">
            {item.enterprise.newClients}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Total Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-total-clients-${item.month}`} className="text-center">
            {calculateTotalClients(item.enterprise)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Monthly Subscription/Client</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-subscription-per-client-${item.month}`} className="text-center">
            {formatCurrency(item.enterprise.monthlySubscriptionPerClient)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Total Subscription</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-total-subscription-${item.month}`} className="text-center">
            {formatCurrency(calculateTotalSubscription(item.enterprise))}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Implementation Fee</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-implementation-${item.month}`} className="text-center">
            {formatCurrency(item.enterprise.implementationFee)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Expansion Revenue</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-expansion-${item.month}`} className="text-center">
            {formatCurrency(item.enterprise.expansionRevenue)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow className="bg-slate-50/70 dark:bg-slate-800/20">
        <TableCell className="font-semibold pl-6 text-purple-700 dark:text-purple-400">Total Enterprise Revenue</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`enterprise-total-${item.month}`} className="text-center font-semibold text-purple-700 dark:text-purple-400">
            {formatCurrency(calculateSegmentTotalRevenue(item.enterprise))}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};
