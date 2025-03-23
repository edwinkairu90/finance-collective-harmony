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
  yearlyTotal?: QuarterlyTotals;
}

export const PLTable: React.FC<PLTableProps> = ({ 
  quarters, 
  quarterlyTotals, 
  plSubtotals, 
  periodType,
  yearlyTotal
}) => {
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
            <TableHead className="w-[20%] border-b-2 border-gray-300 font-bold">Line Item</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Jan</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Feb</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Mar</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Apr</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">May</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Jun</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Jul</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Aug</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Sep</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Oct</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Nov</TableHead>
            <TableHead className="text-right border-b-2 border-gray-300 font-bold">Dec</TableHead>
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
  
  // Render monthly view
  const renderMonthlyView = () => {
    return (
      <>
        {/* Revenue Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={14} className="font-bold text-blue-800 py-3">REVENUE</TableCell>
        </TableRow>
        
        {revenueItems.map((item, index) => (
          <TableRow key={`revenue-${index}`} className="border-b border-gray-100">
            <TableCell>{item}</TableCell>
            
            {/* Display all 12 months */}
            {quarters.map((month, mIdx) => {
              const amount = getItemValue(month, item, 'revenue');
              return (
                <TableCell key={`month-${mIdx}`} className="text-right">
                  {formatCurrency(amount)}
                </TableCell>
              );
            })}
            
            {/* Total for the year */}
            <TableCell className="text-right font-medium">
              {formatCurrency(quarters.reduce((sum, month) => {
                return sum + getItemValue(month, item, 'revenue');
              }, 0))}
            </TableCell>
          </TableRow>
        ))}
        
        {/* Total Revenue */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Revenue</TableCell>
          
          {/* Month totals */}
          {quarterlyTotals.map((total, idx) => (
            <TableCell key={`rev-total-${idx}`} className="text-right">
              {formatCurrency(total.totalRevenue)}
            </TableCell>
          ))}
          
          {/* Year total */}
          <TableCell className="text-right">
            {yearlyTotal && formatCurrency(yearlyTotal.totalRevenue)}
          </TableCell>
        </TableRow>
        
        {/* Cost of Sales Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={14} className="font-bold text-blue-800 py-3">COST OF SALES</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => item.includes('Cost of Goods') || item.includes('COGS')).map((item, index) => (
          <TableRow key={`cogs-${index}`} className="border-b border-gray-100">
            <TableCell>{item}</TableCell>
            
            {/* Display all 12 months */}
            {quarters.map((month, mIdx) => {
              const amount = getItemValue(month, item, 'expenses');
              return (
                <TableCell key={`month-${mIdx}`} className="text-right">
                  {formatCurrency(amount)}
                </TableCell>
              );
            })}
            
            {/* Total for the year */}
            <TableCell className="text-right font-medium">
              {formatCurrency(quarters.reduce((sum, month) => {
                return sum + getItemValue(month, item, 'expenses');
              }, 0))}
            </TableCell>
          </TableRow>
        ))}
        
        {/* Total Cost of Sales */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Cost of Sales</TableCell>
          
          {/* Month totals */}
          {plSubtotals.map((subtotal, idx) => (
            <TableCell key={`cogs-total-${idx}`} className="text-right">
              {formatCurrency(subtotal.costOfSales)}
            </TableCell>
          ))}
          
          {/* Year total */}
          <TableCell className="text-right">
            {formatCurrency(plSubtotals.reduce((sum, subtotal) => sum + subtotal.costOfSales, 0))}
          </TableCell>
        </TableRow>
        
        {/* Gross Profit */}
        <TableRow className="font-bold border-t-2 border-b-2 border-gray-400 bg-gray-100">
          <TableCell>GROSS PROFIT</TableCell>
          
          {/* Month gross profits */}
          {plSubtotals.map((subtotal, idx) => (
            <TableCell key={`gp-${idx}`} className="text-right">
              {formatCurrency(subtotal.grossProfit)}
            </TableCell>
          ))}
          
          {/* Year total gross profit */}
          <TableCell className="text-right">
            {formatCurrency(plSubtotals.reduce((sum, subtotal) => sum + subtotal.grossProfit, 0))}
          </TableCell>
        </TableRow>
        
        {/* Operating Expenses Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={14} className="font-bold text-blue-800 py-3">OPERATING EXPENSES</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => !item.includes('Cost of Goods') && !item.includes('COGS') && !item.includes('Depreciation') && !item.includes('Amortization')).map((item, index) => (
          <TableRow key={`opex-${index}`} className="border-b border-gray-100">
            <TableCell>{item}</TableCell>
            
            {/* Display all 12 months */}
            {quarters.map((month, mIdx) => {
              const amount = getItemValue(month, item, 'expenses');
              return (
                <TableCell key={`month-${mIdx}`} className="text-right">
                  {formatCurrency(amount)}
                </TableCell>
              );
            })}
            
            {/* Total for the year */}
            <TableCell className="text-right font-medium">
              {formatCurrency(quarters.reduce((sum, month) => {
                return sum + getItemValue(month, item, 'expenses');
              }, 0))}
            </TableCell>
          </TableRow>
        ))}
        
        {/* Total Operating Expenses */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Operating Expenses</TableCell>
          
          {/* Month totals */}
          {plSubtotals.map((subtotal, idx) => (
            <TableCell key={`opex-total-${idx}`} className="text-right">
              {formatCurrency(subtotal.operatingExpenses)}
            </TableCell>
          ))}
          
          {/* Year total */}
          <TableCell className="text-right">
            {formatCurrency(plSubtotals.reduce((sum, subtotal) => sum + subtotal.operatingExpenses, 0))}
          </TableCell>
        </TableRow>
        
        {/* EBITDA */}
        <TableRow className="font-bold border-t-2 border-b-2 border-gray-400 bg-gray-100">
          <TableCell>EBITDA</TableCell>
          
          {/* Month EBITDA */}
          {plSubtotals.map((subtotal, idx) => (
            <TableCell key={`ebitda-${idx}`} className="text-right">
              {formatCurrency(subtotal.ebitda)}
            </TableCell>
          ))}
          
          {/* Year total EBITDA */}
          <TableCell className="text-right">
            {formatCurrency(plSubtotals.reduce((sum, subtotal) => sum + subtotal.ebitda, 0))}
          </TableCell>
        </TableRow>
        
        {/* Depreciation & Amortization Section */}
        <TableRow className="bg-blue-50">
          <TableCell colSpan={14} className="font-bold text-blue-800 py-3">DEPRECIATION & AMORTIZATION</TableCell>
        </TableRow>
        
        {expenseItems.filter(item => item.includes('Depreciation') || item.includes('Amortization')).map((item, index) => (
          <TableRow key={`da-${index}`} className="border-b border-gray-100">
            <TableCell>{item}</TableCell>
            
            {/* Display all 12 months */}
            {quarters.map((month, mIdx) => {
              const amount = getItemValue(month, item, 'expenses');
              return (
                <TableCell key={`month-${mIdx}`} className="text-right">
                  {formatCurrency(amount)}
                </TableCell>
              );
            })}
            
            {/* Total for the year */}
            <TableCell className="text-right font-medium">
              {formatCurrency(quarters.reduce((sum, month) => {
                return sum + getItemValue(month, item, 'expenses');
              }, 0))}
            </TableCell>
          </TableRow>
        ))}
        
        {/* Total D&A */}
        <TableRow className="font-semibold border-t border-b border-gray-300 bg-gray-50">
          <TableCell>Total Depreciation & Amortization</TableCell>
          
          {/* Month totals */}
          {plSubtotals.map((subtotal, idx) => (
            <TableCell key={`da-total-${idx}`} className="text-right">
              {formatCurrency(subtotal.depreciationAmortization)}
            </TableCell>
          ))}
          
          {/* Year total */}
          <TableCell className="text-right">
            {formatCurrency(plSubtotals.reduce((sum, subtotal) => sum + subtotal.depreciationAmortization, 0))}
          </TableCell>
        </TableRow>
        
        {/* EBIT (Operating Income) */}
        <TableRow className="font-bold border-t-2 border-b-2 border-gray-400 bg-blue-100">
          <TableCell>EBIT (OPERATING INCOME)</TableCell>
          
          {/* Month EBIT */}
          {plSubtotals.map((subtotal, idx) => (
            <TableCell key={`ebit-${idx}`} className="text-right">
              {formatCurrency(subtotal.ebit)}
            </TableCell>
          ))}
          
          {/* Year total EBIT */}
          <TableCell className="text-right">
            {formatCurrency(plSubtotals.reduce((sum, subtotal) => sum + subtotal.ebit, 0))}
          </TableCell>
        </TableRow>
        
        {/* Net Profit/Loss */}
        <TableRow className="font-bold border-t-2 border-gray-500 bg-blue-200">
          <TableCell className="py-4">NET PROFIT/(LOSS)</TableCell>
          
          {/* Month Net Profit */}
          {quarterlyTotals.map((total, idx) => (
            <TableCell 
              key={`net-${idx}`} 
              className={`text-right py-4 font-bold ${total.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}
            >
              {formatCurrency(total.netProfit)}
            </TableCell>
          ))}
          
          {/* Year total Net Profit */}
          <TableCell className={`text-right py-4 font-bold ${yearlyTotal && yearlyTotal.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            {yearlyTotal && formatCurrency(yearlyTotal.netProfit)}
          </TableCell>
        </TableRow>
      </>
    );
  };
  
  // Render quarterly/annual view (keep existing implementation)
  const renderQuarterlyView = () => {
    const actual = getItemValue(quarters[latestQuarter], revenueItems[0], 'revenue');
    const projected = actual * 1.05; // Simplified projection calculation
    
    return (
      <>
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
      </>
    );
  };
  
  return (
    <Table className="border-collapse border-none">
      <TableHeader>
        {renderTableHeaders()}
      </TableHeader>
      
      <TableBody>
        {periodType === 'monthly' ? renderMonthlyView() : renderQuarterlyView()}
      </TableBody>
    </Table>
  );
};
