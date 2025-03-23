
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuarterData, QuarterlyTotals, PLSubtotals } from "../data/plStatementData";
import { getAllItems, getItemValue, calculateGrowth } from "../utils/plCalculations";

interface PLTableProps {
  quarters: QuarterData[];
  quarterlyTotals: QuarterlyTotals[];
  plSubtotals: PLSubtotals[];
}

export const PLTable: React.FC<PLTableProps> = ({ quarters, quarterlyTotals, plSubtotals }) => {
  const { revenueItems, expenseItems } = getAllItems(quarters);
  const latestQuarter = 0; // First quarter is the most recent
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[30%]">Line Item</TableHead>
          <TableHead className="text-right">Actual</TableHead>
          <TableHead className="text-right">Projected</TableHead>
          <TableHead className="text-right">Variance</TableHead>
          <TableHead className="text-right">Variance %</TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {/* Revenue Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Revenue</TableCell>
        </TableRow>
        
        {revenueItems.map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'revenue');
          const projected = actual * 1.05; // Simplified projection calculation
          const variance = actual - projected;
          const variancePercent = (variance / projected) * 100;
          
          return (
            <TableRow key={`revenue-${index}`}>
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">${actual.toLocaleString()}</TableCell>
              <TableCell className="text-right">${projected.toLocaleString()}</TableCell>
              <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
              <TableCell className={`text-right ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total Revenue */}
        <TableRow className="font-medium border-t">
          <TableCell>Total Revenue</TableCell>
          <TableCell className="text-right">${quarterlyTotals[latestQuarter].totalRevenue.toLocaleString()}</TableCell>
          <TableCell className="text-right">${(quarterlyTotals[latestQuarter].totalRevenue * 1.05).toLocaleString()}</TableCell>
          {(() => {
            const actual = quarterlyTotals[latestQuarter].totalRevenue;
            const projected = actual * 1.05;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            return (
              <>
                <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Cost of Sales Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Cost of Sales</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => item.includes('Cost of Goods') || item.includes('COGS')).map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'expenses');
          const projected = actual * 0.95; // Simplified projection calculation
          const variance = actual - projected;
          const variancePercent = (variance / projected) * 100;
          
          return (
            <TableRow key={`cogs-${index}`}>
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">${actual.toLocaleString()}</TableCell>
              <TableCell className="text-right">${projected.toLocaleString()}</TableCell>
              <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
              <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total Cost of Sales */}
        <TableRow className="font-medium border-t">
          <TableCell>Total Cost of Sales</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].costOfSales;
            const projected = actual * 0.95;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            return (
              <>
                <TableCell className="text-right">${actual.toLocaleString()}</TableCell>
                <TableCell className="text-right">${projected.toLocaleString()}</TableCell>
                <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Gross Profit */}
        <TableRow className="font-medium bg-muted/20 border-t-2 border-b-2">
          <TableCell className="font-bold">Gross Profit</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].grossProfit;
            const projected = quarterlyTotals[latestQuarter].totalRevenue * 1.05 - plSubtotals[latestQuarter].costOfSales * 0.95;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right font-bold">${actual.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">${projected.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right font-bold ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Operating Expenses Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Operating Expenses</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => !item.includes('Cost of Goods') && !item.includes('COGS') && !item.includes('Depreciation') && !item.includes('Amortization')).map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'expenses');
          const projected = actual * 0.97; // Simplified projection calculation
          const variance = actual - projected;
          const variancePercent = (variance / projected) * 100;
          
          return (
            <TableRow key={`opex-${index}`}>
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">${actual.toLocaleString()}</TableCell>
              <TableCell className="text-right">${projected.toLocaleString()}</TableCell>
              <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
              <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total Operating Expenses */}
        <TableRow className="font-medium border-t">
          <TableCell>Total Operating Expenses</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].operatingExpenses;
            const projected = actual * 0.97;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right">${actual.toLocaleString()}</TableCell>
                <TableCell className="text-right">${projected.toLocaleString()}</TableCell>
                <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* EBITDA */}
        <TableRow className="font-medium bg-muted/20 border-t-2 border-b-2">
          <TableCell className="font-bold">EBITDA</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].ebitda;
            const projectedGrossProfit = quarterlyTotals[latestQuarter].totalRevenue * 1.05 - plSubtotals[latestQuarter].costOfSales * 0.95;
            const projectedOpex = plSubtotals[latestQuarter].operatingExpenses * 0.97;
            const projected = projectedGrossProfit - projectedOpex;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right font-bold">${actual.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">${projected.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right font-bold ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Depreciation & Amortization Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Depreciation & Amortization</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => item.includes('Depreciation') || item.includes('Amortization')).map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'expenses');
          const projected = actual; // D&A usually stays the same in projections
          const variance = actual - projected;
          const variancePercent = projected !== 0 ? (variance / projected) * 100 : 0;
          
          return (
            <TableRow key={`da-${index}`}>
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">${actual.toLocaleString()}</TableCell>
              <TableCell className="text-right">${projected.toLocaleString()}</TableCell>
              <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
              <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total D&A */}
        <TableRow className="font-medium border-t">
          <TableCell>Total Depreciation & Amortization</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].depreciationAmortization;
            const projected = actual;
            const variance = actual - projected;
            const variancePercent = projected !== 0 ? (variance / projected) * 100 : 0;
            
            return (
              <>
                <TableCell className="text-right">${actual.toLocaleString()}</TableCell>
                <TableCell className="text-right">${projected.toLocaleString()}</TableCell>
                <TableCell className="text-right">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* EBIT (Operating Income) */}
        <TableRow className="font-bold bg-muted/40 border-t-2 border-b-2">
          <TableCell className="font-bold">EBIT (Operating Income)</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].ebit;
            const projectedEbitda = quarterlyTotals[latestQuarter].totalRevenue * 1.05 - 
                                  plSubtotals[latestQuarter].costOfSales * 0.95 - 
                                  plSubtotals[latestQuarter].operatingExpenses * 0.97;
            const projected = projectedEbitda - plSubtotals[latestQuarter].depreciationAmortization;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right font-bold">${actual.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">${projected.toLocaleString()}</TableCell>
                <TableCell className="text-right font-bold">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right font-bold ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Net Profit/Loss - For completion */}
        <TableRow className="font-bold bg-muted/50 border-t-2">
          <TableCell>Net Profit/(Loss)</TableCell>
          {(() => {
            const actual = quarterlyTotals[latestQuarter].netProfit;
            // For simplicity, we'll assume net profit is same as EBIT in our projected case
            const projectedEbit = quarterlyTotals[latestQuarter].totalRevenue * 1.05 - 
                                plSubtotals[latestQuarter].costOfSales * 0.95 - 
                                plSubtotals[latestQuarter].operatingExpenses * 0.97 -
                                plSubtotals[latestQuarter].depreciationAmortization;
            const projected = projectedEbit;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className={`text-right font-bold ${actual >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${actual.toLocaleString()}
                </TableCell>
                <TableCell className={`text-right font-bold ${projected >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${projected.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-bold">${variance.toLocaleString()}</TableCell>
                <TableCell className={`text-right font-bold ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {variancePercent >= 0 ? '+' : ''}{variancePercent.toFixed(1)}%
                </TableCell>
              </>
            );
          })()}
        </TableRow>
      </TableBody>
    </Table>
  );
};
