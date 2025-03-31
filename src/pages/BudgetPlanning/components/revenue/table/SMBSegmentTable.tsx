
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { MonthlyRevenueData, SegmentData } from "../types/revenueTypes";
import { EditableCell } from "./EditableCell";
import { formatCurrency } from "@/lib/format";

interface SMBSegmentTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
  selectedProductId: string;
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
  selectedProductId,
  editingCell,
  onStartEdit,
  onSaveEdit
}) => {
  return (
    <>
      <TableRow className="bg-slate-50 dark:bg-slate-800/50">
        <TableCell 
          colSpan={monthlyRevenueDrivers.length + 1} 
          className="font-medium text-slate-800 dark:text-slate-300"
        >
          SMB Segment
        </TableCell>
      </TableRow>
      
      {/* Clients */}
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">Existing Clients</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          const value = product?.smb.clients || 0;
          
          return (
            <TableCell key={`${item.month}-smb-clients`} className="text-center text-sm">
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      
      {/* New Clients */}
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">New Clients</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          const value = product?.smb.newClients || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "smb" && 
            editingCell?.field === "newClients";
          
          return (
            <TableCell key={`${item.month}-smb-newClients`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "smb", "newClients")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "smb", "newClients", newValue)}
              />
            </TableCell>
          );
        })}
      </TableRow>
      
      {/* Monthly Subscription */}
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">Monthly Subscription Per Client</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          const value = product?.smb.monthlySubscriptionPerClient || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "smb" && 
            editingCell?.field === "monthlySubscriptionPerClient";
          
          return (
            <TableCell key={`${item.month}-smb-subscription`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "smb", "monthlySubscriptionPerClient")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "smb", "monthlySubscriptionPerClient", newValue)}
                formatter={(val) => formatCurrency(val)}
              />
            </TableCell>
          );
        })}
      </TableRow>
      
      {/* Implementation Fee */}
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">Implementation Fee Per Client</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          const value = product?.smb.implementationFee || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "smb" && 
            editingCell?.field === "implementationFee";
          
          return (
            <TableCell key={`${item.month}-smb-implementationFee`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "smb", "implementationFee")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "smb", "implementationFee", newValue)}
                formatter={(val) => formatCurrency(val)}
              />
            </TableCell>
          );
        })}
      </TableRow>
      
      {/* Expansion Revenue */}
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">Expansion Revenue</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          const value = product?.smb.expansionRevenue || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "smb" && 
            editingCell?.field === "expansionRevenue";
          
          return (
            <TableCell key={`${item.month}-smb-expansion`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "smb", "expansionRevenue")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "smb", "expansionRevenue", newValue)}
                formatter={(val) => formatCurrency(val)}
              />
            </TableCell>
          );
        })}
      </TableRow>
      
      {/* SMB Monthly Revenue */}
      <TableRow className="bg-slate-50 dark:bg-slate-800/50">
        <TableCell className="font-medium text-sm text-slate-800 dark:text-slate-300">Monthly SMB Revenue</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          if (!product) return <TableCell key={`${item.month}-smb-total`} className="text-center">$0</TableCell>;
          
          const { smb } = product;
          const subscriptionRevenue = smb.clients * smb.monthlySubscriptionPerClient;
          const implementationRevenue = smb.newClients * smb.implementationFee;
          const totalRevenue = subscriptionRevenue + implementationRevenue + smb.expansionRevenue;
          
          return (
            <TableCell 
              key={`${item.month}-smb-total`} 
              className="text-center font-medium text-sm text-slate-800 dark:text-slate-300"
            >
              {formatCurrency(totalRevenue)}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
};
