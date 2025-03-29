
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { BalanceSheetQuarterData } from "../types/balanceSheetTypes";
import { calculateGrowth, calculateBalanceSheetTotals } from "../utils/balanceSheetCalculations";

interface BalanceSheetTotalRowProps {
  title: string;
  quarters: BalanceSheetQuarterData[];
  totalType: 'totalCurrentAssets' | 'totalNonCurrentAssets' | 'totalAssets' | 
             'totalCurrentLiabilities' | 'totalNonCurrentLiabilities' | 'totalLiabilities' | 
             'totalEquity' | 'totalLiabilitiesAndEquity';
  isBold?: boolean;
  isLiability?: boolean;
  yearlyTotal?: ReturnType<typeof calculateBalanceSheetTotals>;
}

export const BalanceSheetTotalRow: React.FC<BalanceSheetTotalRowProps> = ({ 
  title, 
  quarters, 
  totalType,
  isBold = false,
  isLiability = false,
  yearlyTotal
}) => {
  return (
    <TableRow className={isBold ? "font-bold bg-muted/50" : "font-medium"}>
      <TableCell className={isBold ? "" : "pl-4"}>{title}</TableCell>
      {quarters.map((quarter, idx) => {
        const total = calculateBalanceSheetTotals(quarter)[totalType];
        const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
        const prevTotal = prevQuarter ? calculateBalanceSheetTotals(prevQuarter)[totalType] : null;
        const growth = calculateGrowth(total, prevTotal);
        const growthColorClass = isLiability 
          ? (growth !== null ? (growth <= 0 ? 'text-green-600' : 'text-red-600') : '')
          : (growth !== null ? (growth >= 0 ? 'text-green-600' : 'text-red-600') : '');
        
        return (
          <TableCell key={`total-${totalType}-${idx}`} className="text-right">
            <div>${total.toLocaleString()}</div>
            {growth !== null && idx < quarters.length - 1 && (
              <div className={`text-xs ${growthColorClass}`}>
                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
              </div>
            )}
          </TableCell>
        );
      })}
      
      {/* Yearly total column for monthly view */}
      {yearlyTotal && (
        <TableCell className="text-right font-bold">
          ${yearlyTotal[totalType].toLocaleString()}
        </TableCell>
      )}
    </TableRow>
  );
};
