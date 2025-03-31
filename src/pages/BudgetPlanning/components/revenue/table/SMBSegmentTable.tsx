
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { MonthlyRevenueData, SegmentData } from "../types/revenueTypes";
import { calculateSegmentTotalRevenue, calculateTotalClients, calculateTotalSubscription } from "../utils/revenueCalculations";
import { EditableCell } from "./EditableCell";

interface SMBSegmentTableProps {
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

export const SMBSegmentTable: React.FC<SMBSegmentTableProps> = ({
  monthlyRevenueDrivers,
  editingCell,
  onStartEdit,
  onSaveEdit
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
          <EditableCell
            key={`smb-new-clients-${item.month}`}
            value={item.smb.newClients}
            isEditing={
              editingCell?.month === item.month &&
              editingCell?.segment === "smb" &&
              editingCell?.field === "newClients"
            }
            onStartEdit={() => onStartEdit(item.month, "smb", "newClients")}
            onSave={(value) => onSaveEdit(item.month, "smb", "newClients", value)}
          />
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
          <EditableCell
            key={`smb-subscription-per-client-${item.month}`}
            value={item.smb.monthlySubscriptionPerClient}
            isEditing={
              editingCell?.month === item.month &&
              editingCell?.segment === "smb" &&
              editingCell?.field === "monthlySubscriptionPerClient"
            }
            onStartEdit={() => onStartEdit(item.month, "smb", "monthlySubscriptionPerClient")}
            onSave={(value) => onSaveEdit(item.month, "smb", "monthlySubscriptionPerClient", value)}
            formatting="currency"
          />
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
          <EditableCell
            key={`smb-expansion-${item.month}`}
            value={item.smb.expansionRevenue}
            isEditing={
              editingCell?.month === item.month &&
              editingCell?.segment === "smb" &&
              editingCell?.field === "expansionRevenue"
            }
            onStartEdit={() => onStartEdit(item.month, "smb", "expansionRevenue")}
            onSave={(value) => onSaveEdit(item.month, "smb", "expansionRevenue", value)}
            formatting="currency"
          />
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
