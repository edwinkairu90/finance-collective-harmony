
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { CashflowQuarterData } from "../data/cashflowData";
import { calculateGrowth, calculateCashflowTotals } from "../utils/cashflowCalculations";

interface NetCashflowRowProps {
  quarters: CashflowQuarterData[];
}

export const NetCashflowRow: React.FC<NetCashflowRowProps> = ({ quarters }) => {
  return (
    <TableRow className="font-bold bg-muted/50">
      <TableCell>Net Increase/(Decrease) in Cash</TableCell>
      {quarters.map((quarter, idx) => {
        const { netCashflow } = calculateCashflowTotals(quarter);
        const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
        const prevTotal = prevQuarter ? calculateCashflowTotals(prevQuarter).netCashflow : null;
        const growth = calculateGrowth(netCashflow, prevTotal);
        
        return (
          <TableCell key={`net-${idx}`} className={`text-right ${netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <div>${netCashflow.toLocaleString()}</div>
            {growth !== null && idx < quarters.length - 1 && (
              <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
              </div>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
