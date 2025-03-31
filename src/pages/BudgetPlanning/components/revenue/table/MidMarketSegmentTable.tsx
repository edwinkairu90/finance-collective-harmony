
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { MonthlyRevenueData, SegmentData } from "../types/revenueTypes";
import { EditableCell } from "./EditableCell";
import { formatCurrency } from "@/lib/format";

interface MidMarketSegmentTableProps {
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

export const MidMarketSegmentTable: React.FC<MidMarketSegmentTableProps> = ({
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
          Mid-Market Segment
        </TableCell>
      </TableRow>
      
      {/* Clients */}
      <TableRow>
        <TableCell className="text-sm text-slate-600 dark:text-slate-400">Existing Clients</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          const value = product?.midMarket.clients || 0;
          
          return (
            <TableCell key={`${item.month}-midMarket-clients`} className="text-center text-sm">
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
          const value = product?.midMarket.newClients || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "midMarket" && 
            editingCell?.field === "newClients";
          
          return (
            <TableCell key={`${item.month}-midMarket-newClients`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "midMarket", "newClients")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "midMarket", "newClients", newValue)}
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
          const value = product?.midMarket.monthlySubscriptionPerClient || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "midMarket" && 
            editingCell?.field === "monthlySubscriptionPerClient";
          
          return (
            <TableCell key={`${item.month}-midMarket-subscription`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "midMarket", "monthlySubscriptionPerClient")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "midMarket", "monthlySubscriptionPerClient", newValue)}
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
          const value = product?.midMarket.implementationFee || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "midMarket" && 
            editingCell?.field === "implementationFee";
          
          return (
            <TableCell key={`${item.month}-midMarket-implementationFee`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "midMarket", "implementationFee")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "midMarket", "implementationFee", newValue)}
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
          const value = product?.midMarket.expansionRevenue || 0;
          const isEditing = 
            editingCell?.month === item.month && 
            editingCell?.segment === "midMarket" && 
            editingCell?.field === "expansionRevenue";
          
          return (
            <TableCell key={`${item.month}-midMarket-expansion`} className="text-center">
              <EditableCell
                value={value}
                isEditing={isEditing}
                onStartEdit={() => onStartEdit(item.month, "midMarket", "expansionRevenue")}
                onSaveEdit={(newValue) => onSaveEdit(item.month, "midMarket", "expansionRevenue", newValue)}
                formatter={(val) => formatCurrency(val)}
              />
            </TableCell>
          );
        })}
      </TableRow>
      
      {/* Mid-Market Monthly Revenue */}
      <TableRow className="bg-slate-50 dark:bg-slate-800/50">
        <TableCell className="font-medium text-sm text-slate-800 dark:text-slate-300">Monthly Mid-Market Revenue</TableCell>
        {monthlyRevenueDrivers.map((item) => {
          const product = item.products.find(p => p.id === selectedProductId);
          if (!product) return <TableCell key={`${item.month}-midMarket-total`} className="text-center">$0</TableCell>;
          
          const { midMarket } = product;
          const subscriptionRevenue = midMarket.clients * midMarket.monthlySubscriptionPerClient;
          const implementationRevenue = midMarket.newClients * midMarket.implementationFee;
          const totalRevenue = subscriptionRevenue + implementationRevenue + midMarket.expansionRevenue;
          
          return (
            <TableCell 
              key={`${item.month}-midMarket-total`} 
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
