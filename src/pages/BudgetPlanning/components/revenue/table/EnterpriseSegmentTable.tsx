
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { MonthlyRevenueData, SegmentData } from "../types/revenueTypes";
import { EditableCell } from "./EditableCell";
import { formatCurrency } from "@/lib/format";

interface EnterpriseSegmentTableProps {
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

export const EnterpriseSegmentTable: React.FC<EnterpriseSegmentTableProps> = ({
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
          Enterprise Segment
        </TableCell>
      </TableRow>
      
      {/* Clients */}
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">Existing Clients</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          const value = product?.enterprise.clients || 0;
          
          return (
            <TableCell key={`${item.month}-enterprise-clients`} className="text-center text-sm">
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
          const value = product?.enterprise.newClients || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "enterprise" && 
            editingCell?.field === "newClients";
          
          return (
            <TableCell key={`${item.month}-enterprise-newClients`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "enterprise", "newClients")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "enterprise", "newClients", newValue)}
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
          const value = product?.enterprise.monthlySubscriptionPerClient || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "enterprise" && 
            editingCell?.field === "monthlySubscriptionPerClient";
          
          return (
            <TableCell key={`${item.month}-enterprise-subscription`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "enterprise", "monthlySubscriptionPerClient")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "enterprise", "monthlySubscriptionPerClient", newValue)}
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
          const value = product?.enterprise.implementationFee || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "enterprise" && 
            editingCell?.field === "implementationFee";
          
          return (
            <TableCell key={`${item.month}-enterprise-implementationFee`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "enterprise", "implementationFee")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "enterprise", "implementationFee", newValue)}
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
          const value = product?.enterprise.expansionRevenue || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "enterprise" && 
            editingCell?.field === "expansionRevenue";
          
          return (
            <TableCell key={`${item.month}-enterprise-expansion`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "enterprise", "expansionRevenue")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "enterprise", "expansionRevenue", newValue)}
                formatter={(val) => formatCurrency(val)}
              />
            </TableCell>
          );
        })}
      </TableRow>
      
      {/* Enterprise Monthly Revenue */}
      <TableRow className="bg-slate-50 dark:bg-slate-800/50">
        <TableCell className="font-medium text-sm text-slate-800 dark:text-slate-300">Monthly Enterprise Revenue</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          if (!product) return <TableCell key={`${item.month}-enterprise-total`} className="text-center">$0</TableCell>;
          
          const { enterprise } = product;
          const subscriptionRevenue = enterprise.clients * enterprise.monthlySubscriptionPerClient;
          const implementationRevenue = enterprise.newClients * enterprise.implementationFee;
          const totalRevenue = subscriptionRevenue + implementationRevenue + enterprise.expansionRevenue;
          
          return (
            <TableCell 
              key={`${item.month}-enterprise-total`} 
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
