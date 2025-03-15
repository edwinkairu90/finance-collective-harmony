
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuarterData, QuarterlyTotals } from "../data/plStatementData";
import { getAllItems, getItemValue, calculateGrowth } from "../utils/plCalculations";

interface PLTableProps {
  quarters: QuarterData[];
  quarterlyTotals: QuarterlyTotals[];
}

export const PLTable: React.FC<PLTableProps> = ({ quarters, quarterlyTotals }) => {
  const { revenueItems, expenseItems } = getAllItems(quarters);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Line Item</TableHead>
          {quarters.map((quarter, idx) => (
            <TableHead key={idx} className="text-right">
              {quarter.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {/* Revenue Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Revenue</TableCell>
        </TableRow>
        
        {revenueItems.map((item, index) => (
          <TableRow key={`revenue-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'revenue');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'revenue') : null;
              const growth = calculateGrowth(value, prevValue);
              
              return (
                <TableCell key={`q-${qIdx}`} className="text-right">
                  <div>${value.toLocaleString()}</div>
                  {growth !== null && qIdx < quarters.length - 1 && (
                    <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        
        {/* Total Revenue */}
        <TableRow className="font-medium">
          <TableCell>Total Revenue</TableCell>
          {quarterlyTotals.map((total, idx) => {
            const prevTotal = idx < quarterlyTotals.length - 1 ? 
              quarterlyTotals[idx + 1].totalRevenue : null;
            const growth = calculateGrowth(total.totalRevenue, prevTotal);
            
            return (
              <TableCell key={`total-rev-${idx}`} className="text-right">
                <div>${total.totalRevenue.toLocaleString()}</div>
                {growth !== null && idx < quarterlyTotals.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Expenses Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Expenses</TableCell>
        </TableRow>
        
        {expenseItems.map((item, index) => (
          <TableRow key={`expense-${index}`}>
            <TableCell className="pl-8">{item}</TableCell>
            {quarters.map((quarter, qIdx) => {
              const value = getItemValue(quarter, item, 'expenses');
              const prevValue = qIdx < quarters.length - 1 ? 
                getItemValue(quarters[qIdx + 1], item, 'expenses') : null;
              const growth = calculateGrowth(value, prevValue);
              
              return (
                <TableCell key={`q-${qIdx}`} className="text-right">
                  <div>${value.toLocaleString()}</div>
                  {growth !== null && qIdx < quarters.length - 1 && (
                    <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
        
        {/* Total Expenses */}
        <TableRow className="font-medium">
          <TableCell>Total Expenses</TableCell>
          {quarterlyTotals.map((total, idx) => {
            const prevTotal = idx < quarterlyTotals.length - 1 ? 
              quarterlyTotals[idx + 1].totalExpenses : null;
            const growth = calculateGrowth(total.totalExpenses, prevTotal);
            
            return (
              <TableCell key={`total-exp-${idx}`} className="text-right">
                <div>${total.totalExpenses.toLocaleString()}</div>
                {growth !== null && idx < quarterlyTotals.length - 1 && (
                  <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
        
        {/* Net Profit/Loss */}
        <TableRow className="font-bold bg-muted/50">
          <TableCell>Net Profit/(Loss)</TableCell>
          {quarterlyTotals.map((total, idx) => {
            const prevTotal = idx < quarterlyTotals.length - 1 ? 
              quarterlyTotals[idx + 1].netProfit : null;
            const growth = calculateGrowth(total.netProfit, prevTotal);
            
            return (
              <TableCell key={`net-${idx}`} className={`text-right ${total.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <div>${total.netProfit.toLocaleString()}</div>
                {growth !== null && idx < quarterlyTotals.length - 1 && (
                  <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableBody>
    </Table>
  );
};
