
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuarterData, QuarterlyTotals, PLSubtotals } from "../data/plStatementData";
import { getAllItems, getItemValue } from "../utils/plCalculations";
import { PeriodType } from "./PeriodSelector";

interface PLTableProps {
  quarters: QuarterData[];
  quarterlyTotals: QuarterlyTotals[];
  plSubtotals: PLSubtotals[];
  periodType: PeriodType;
}

export const PLTable: React.FC<PLTableProps> = ({ quarters, quarterlyTotals, plSubtotals, periodType }) => {
  const { revenueItems, expenseItems } = getAllItems(quarters);
  const latestQuarter = 0; // First quarter is the most recent
  
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Format variance percentage
  const formatVariancePercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(1)}%`;
  };

  // Generate table headers based on period type
  const renderTableHeaders = () => {
    switch (periodType) {
      case 'monthly':
        return (
          <TableRow className="bg-muted/50">
            <TableHead className="w-[35%] border-b-2 border-gray-300 font-bold">Line Item</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Jan</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Feb</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Mar</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Total</TableHead>
          </TableRow>
        );
      case 'annual':
        return (
          <TableRow className="bg-muted/50">
            <TableHead className="w-[35%] border-b-2 border-gray-300 font-bold">Line Item</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">2023</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">2024 (YTD)</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Variance</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Var %</TableHead>
          </TableRow>
        );
      case 'quarterly':
      default:
        return (
          <TableRow className="bg-muted/50">
            <TableHead className="w-[35%] border-b-2 border-gray-300 font-bold">Line Item</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Actual</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Projected</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Variance</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Var %</TableHead>
          </TableRow>
        );
    }
  };
  
  return (
    <Table className="border-collapse border-none">
      <TableHeader>
        {renderTableHeaders()}
      </TableHeader>
      
      <TableBody>
        {/* Revenue Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={5} className="font-bold text-blue-800 py-3">REVENUE</TableCell>
        </TableRow>
        
        {revenueItems.map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'revenue');
          const projected = actual * 1.05; // Simplified projection calculation
          const variance = actual - projected;
          const variancePercent = (variance / projected) * 100;
          
          return (
            <TableRow key={`revenue-${index}`} className="border-b border-gray-100">
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
              <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
              <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
              <TableCell className={`text-right ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatVariancePercent(variancePercent)}
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total Revenue */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Revenue</TableCell>
          <TableCell className="text-right">{formatCurrency(quarterlyTotals[latestQuarter].totalRevenue)}</TableCell>
          <TableCell className="text-right">{formatCurrency(quarterlyTotals[latestQuarter].totalRevenue * 1.05)}</TableCell>
          {(() => {
            const actual = quarterlyTotals[latestQuarter].totalRevenue;
            const projected = actual * 1.05;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Cost of Sales Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={5} className="font-bold text-blue-800 py-3">COST OF SALES</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => item.includes('Cost of Goods') || item.includes('COGS')).map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'expenses');
          const projected = actual * 0.95; // Simplified projection calculation
          const variance = actual - projected;
          const variancePercent = (variance / projected) * 100;
          
          return (
            <TableRow key={`cogs-${index}`} className="border-b border-gray-100">
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
              <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
              <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
              <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatVariancePercent(variancePercent)}
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total Cost of Sales */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Cost of Sales</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].costOfSales;
            const projected = actual * 0.95;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
                <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
                <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Gross Profit */}
        <TableRow className="font-bold border-t-2 border-b-2 border-gray-400 bg-gray-100">
          <TableCell>GROSS PROFIT</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].grossProfit;
            const projected = quarterlyTotals[latestQuarter].totalRevenue * 1.05 - plSubtotals[latestQuarter].costOfSales * 0.95;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
                <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
                <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Operating Expenses Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={5} className="font-bold text-blue-800 py-3">OPERATING EXPENSES</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => !item.includes('Cost of Goods') && !item.includes('COGS') && !item.includes('Depreciation') && !item.includes('Amortization')).map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'expenses');
          const projected = actual * 0.97; // Simplified projection calculation
          const variance = actual - projected;
          const variancePercent = (variance / projected) * 100;
          
          return (
            <TableRow key={`opex-${index}`} className="border-b border-gray-100">
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
              <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
              <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
              <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatVariancePercent(variancePercent)}
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total Operating Expenses */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Operating Expenses</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].operatingExpenses;
            const projected = actual * 0.97;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
                <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
                <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* EBITDA */}
        <TableRow className="font-bold border-t-2 border-b-2 border-gray-400 bg-gray-100">
          <TableCell>EBITDA</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].ebitda;
            const projectedGrossProfit = quarterlyTotals[latestQuarter].totalRevenue * 1.05 - plSubtotals[latestQuarter].costOfSales * 0.95;
            const projectedOpex = plSubtotals[latestQuarter].operatingExpenses * 0.97;
            const projected = projectedGrossProfit - projectedOpex;
            const variance = actual - projected;
            const variancePercent = (variance / projected) * 100;
            
            return (
              <>
                <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
                <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
                <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Depreciation & Amortization Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={5} className="font-bold text-blue-800 py-3">DEPRECIATION & AMORTIZATION</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => item.includes('Depreciation') || item.includes('Amortization')).map((item, index) => {
          const actual = getItemValue(quarters[latestQuarter], item, 'expenses');
          const projected = actual; // D&A usually stays the same in projections
          const variance = actual - projected;
          const variancePercent = projected !== 0 ? (variance / projected) * 100 : 0;
          
          return (
            <TableRow key={`da-${index}`} className="border-b border-gray-100">
              <TableCell className="pl-8">{item}</TableCell>
              <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
              <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
              <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
              <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatVariancePercent(variancePercent)}
              </TableCell>
            </TableRow>
          );
        })}
        
        {/* Total D&A */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Depreciation & Amortization</TableCell>
          {(() => {
            const actual = plSubtotals[latestQuarter].depreciationAmortization;
            const projected = actual;
            const variance = actual - projected;
            const variancePercent = projected !== 0 ? (variance / projected) * 100 : 0;
            
            return (
              <>
                <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
                <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
                <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right ${variancePercent <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* EBIT (Operating Income) */}
        <TableRow className="font-bold border-t-2 border-b-2 border-gray-400 bg-blue-100">
          <TableCell>EBIT (OPERATING INCOME)</TableCell>
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
                <TableCell className="text-right">{formatCurrency(actual)}</TableCell>
                <TableCell className="text-right">{formatCurrency(projected)}</TableCell>
                <TableCell className="text-right">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right ${variancePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
        
        {/* Net Profit/Loss */}
        <TableRow className="font-bold border-t-2 border-gray-500 bg-blue-200">
          <TableCell className="py-4">NET PROFIT/(LOSS)</TableCell>
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
                <TableCell className={`text-right py-4 font-bold ${actual >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {formatCurrency(actual)}
                </TableCell>
                <TableCell className={`text-right py-4 font-bold ${projected >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {formatCurrency(projected)}
                </TableCell>
                <TableCell className="text-right py-4 font-bold">{formatCurrency(variance)}</TableCell>
                <TableCell className={`text-right py-4 font-bold ${variancePercent >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {formatVariancePercent(variancePercent)}
                </TableCell>
              </>
            );
          })()}
        </TableRow>
      </TableBody>
    </Table>
  );
};
