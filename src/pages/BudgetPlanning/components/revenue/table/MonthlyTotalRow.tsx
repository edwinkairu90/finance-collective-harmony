
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { MonthlyRevenueData } from "../types/revenueTypes";
import { formatCurrency } from "@/lib/format";

interface MonthlyTotalRowProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
  selectedProductId?: string;
}

export const MonthlyTotalRow: React.FC<MonthlyTotalRowProps> = ({
  monthlyRevenueDrivers,
  selectedProductId
}) => {
  // Calculate total revenue for each month
  const calculateMonthlyTotal = (monthData: MonthlyRevenueData) => {
    let total = monthData.otherRevenue;
    
    if (selectedProductId) {
      // If we have a selected product, only show its total
      const product = monthData.products.find(p => p.id === selectedProductId);
      if (product) {
        // Enterprise
        const eSubscriptionRevenue = product.enterprise.clients * product.enterprise.monthlySubscriptionPerClient;
        const eImplementationRevenue = product.enterprise.newClients * product.enterprise.implementationFee;
        const eTotal = eSubscriptionRevenue + eImplementationRevenue + product.enterprise.expansionRevenue;
        
        // Mid-Market
        const mSubscriptionRevenue = product.midMarket.clients * product.midMarket.monthlySubscriptionPerClient;
        const mImplementationRevenue = product.midMarket.newClients * product.midMarket.implementationFee;
        const mTotal = mSubscriptionRevenue + mImplementationRevenue + product.midMarket.expansionRevenue;
        
        // SMB
        const sSubscriptionRevenue = product.smb.clients * product.smb.monthlySubscriptionPerClient;
        const sImplementationRevenue = product.smb.newClients * product.smb.implementationFee;
        const sTotal = sSubscriptionRevenue + sImplementationRevenue + product.smb.expansionRevenue;
        
        total += eTotal + mTotal + sTotal;
      }
    } else {
      // If no product is selected, show the total of all products
      monthData.products.forEach(product => {
        // Enterprise
        const eSubscriptionRevenue = product.enterprise.clients * product.enterprise.monthlySubscriptionPerClient;
        const eImplementationRevenue = product.enterprise.newClients * product.enterprise.implementationFee;
        const eTotal = eSubscriptionRevenue + eImplementationRevenue + product.enterprise.expansionRevenue;
        
        // Mid-Market
        const mSubscriptionRevenue = product.midMarket.clients * product.midMarket.monthlySubscriptionPerClient;
        const mImplementationRevenue = product.midMarket.newClients * product.midMarket.implementationFee;
        const mTotal = mSubscriptionRevenue + mImplementationRevenue + product.midMarket.expansionRevenue;
        
        // SMB
        const sSubscriptionRevenue = product.smb.clients * product.smb.monthlySubscriptionPerClient;
        const sImplementationRevenue = product.smb.newClients * product.smb.implementationFee;
        const sTotal = sSubscriptionRevenue + sImplementationRevenue + product.smb.expansionRevenue;
        
        total += eTotal + mTotal + sTotal;
      });
    }
    
    return total;
  };

  return (
    <TableRow className="bg-slate-100 dark:bg-slate-700">
      <TableCell className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
        Total Monthly Revenue
      </TableCell>
      {monthlyRevenueDrivers.map((item) => {
        const total = calculateMonthlyTotal(item);
        return (
          <TableCell 
            key={`${item.month}-total`} 
            className="text-center font-semibold text-slate-800 dark:text-slate-200 text-sm"
          >
            {formatCurrency(total)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
