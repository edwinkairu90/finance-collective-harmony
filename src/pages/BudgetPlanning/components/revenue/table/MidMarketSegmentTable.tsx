
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { MonthlyRevenueData, SegmentData } from "../types/revenueTypes";
import { calculateSegmentTotalRevenue, calculateTotalClients, calculateTotalSubscription } from "../utils/revenueCalculations";
import { EditableCell } from "./EditableCell";

interface MidMarketSegmentTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
  editingCell: {
    month: string;
    segment: "enterprise" | "midMarket" | "smb";
    field: keyof SegmentData;
  } | null;
  onStartEdit: (
    month: string,
    segment: "enterprise" | "midMarket" | "smb", 
    field: keyof SegmentData
  ) => void;
  onSaveEdit: (
    month: string,
    segment: "enterprise" | "midMarket" | "smb",
    field: keyof SegmentData,
    value: number
  ) => void;
}

export const MidMarketSegmentTable: React.FC<MidMarketSegmentTableProps> = ({
  monthlyRevenueDrivers,
  editingCell,
  onStartEdit,
  onSaveEdit
}) => {
  return (
    <>
      <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
        <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
            Mid-Market
          </Badge>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Existing Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`midmarket-clients-${item.month}`} className="text-center">
            {item.midMarket.clients}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">New Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <EditableCell
            key={`midmarket-new-clients-${item.month}`}
            value={item.midMarket.newClients}
            isEditing={
              editingCell?.month === item.month &&
              editingCell?.segment === "midMarket" &&
              editingCell?.field === "newClients"
            }
            onStartEdit={() => onStartEdit(item.month, "midMarket", "newClients")}
            onSave={(value) => onSaveEdit(item.month, "midMarket", "newClients", value)}
          />
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Total Clients</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`midmarket-total-clients-${item.month}`} className="text-center">
            {calculateTotalClients(item.midMarket)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Monthly Subscription/Client</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <EditableCell
            key={`midmarket-subscription-per-client-${item.month}`}
            value={item.midMarket.monthlySubscriptionPerClient}
            isEditing={
              editingCell?.month === item.month &&
              editingCell?.segment === "midMarket" &&
              editingCell?.field === "monthlySubscriptionPerClient"
            }
            onStartEdit={() => onStartEdit(item.month, "midMarket", "monthlySubscriptionPerClient")}
            onSave={(value) => onSaveEdit(item.month, "midMarket", "monthlySubscriptionPerClient", value)}
            formatting="currency"
          />
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Total Subscription</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`midmarket-total-subscription-${item.month}`} className="text-center">
            {formatCurrency(calculateTotalSubscription(item.midMarket))}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Implementation Fee</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`midmarket-implementation-${item.month}`} className="text-center">
            {formatCurrency(item.midMarket.implementationFee)}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="font-medium pl-6">Expansion Revenue</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <EditableCell
            key={`midmarket-expansion-${item.month}`}
            value={item.midMarket.expansionRevenue}
            isEditing={
              editingCell?.month === item.month &&
              editingCell?.segment === "midMarket" &&
              editingCell?.field === "expansionRevenue"
            }
            onStartEdit={() => onStartEdit(item.month, "midMarket", "expansionRevenue")}
            onSave={(value) => onSaveEdit(item.month, "midMarket", "expansionRevenue", value)}
            formatting="currency"
          />
        ))}
      </TableRow>
      <TableRow className="bg-slate-50/70 dark:bg-slate-800/20">
        <TableCell className="font-semibold pl-6 text-blue-700 dark:text-blue-400">Total Mid-Market Revenue</TableCell>
        {monthlyRevenueDrivers.map(item => (
          <TableCell key={`midmarket-total-${item.month}`} className="text-center font-semibold text-blue-700 dark:text-blue-400">
            {formatCurrency(calculateSegmentTotalRevenue(item.midMarket))}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
};
