
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { CashflowQuarterData } from "../data/cashflowData";
import { calculateGrowth, calculateCashflowTotals, getGrowthColorClass } from "../utils/cashflowCalculations";

interface NetCashflowRowProps {
  quarters: CashflowQuarterData[];
  yearlyTotal?: ReturnType<typeof calculateCashflowTotals>;
}

export const NetCashflowRow: React.FC<NetCashflowRowProps> = ({ quarters, yearlyTotal }) => {
  return (
    <TableRow className="font-bold bg-muted/50">
      <TableCell>Net Increase/(Decrease) in Cash</TableCell>
      {quarters.map((quarter, idx) => {
        const { netCashflow } = calculateCashflowTotals(quarter);
        const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
        const prevTotal = prevQuarter ? calculateCashflowTotals(prevQuarter).netCashflow : null;
        const growth = calculateGrowth(netCashflow, prevTotal);
        const growthColorClass = getGrowthColorClass(growth, 'operating');
        
        return (
          <TableCell key={`net-${idx}`} className={`text-right ${netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <div>${netCashflow.toLocaleString()}</div>
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
        <TableCell className={`text-right font-bold ${yearlyTotal.netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${yearlyTotal.netCashflow.toLocaleString()}
        </TableCell>
      )}
    </TableRow>
  );
};
