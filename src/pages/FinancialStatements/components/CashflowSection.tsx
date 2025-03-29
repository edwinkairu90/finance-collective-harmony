
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { CashflowQuarterData } from "../data/cashflowData";
import { 
  getItemValue, 
  calculateGrowth, 
  calculateCashflowTotals, 
  getGrowthColorClass 
} from "../utils/cashflowCalculations";

interface CashflowSectionProps {
  title: string;
  items: string[];
  quarters: CashflowQuarterData[];
  sectionType: 'operating' | 'investing' | 'financing';
  showTotal: boolean;
  yearlyTotal?: ReturnType<typeof calculateCashflowTotals>;
}

export const CashflowSection: React.FC<CashflowSectionProps> = ({ 
  title, 
  items, 
  quarters, 
  sectionType,
  showTotal,
  yearlyTotal
}) => {
  const getTotalPropName = (): keyof ReturnType<typeof calculateCashflowTotals> => {
    switch (sectionType) {
      case 'operating': return 'totalOperating';
      case 'investing': return 'totalInvesting';
      case 'financing': return 'totalFinancing';
      default: return 'totalOperating';
    }
  };

  return (
    <>
      {/* Section Header */}
      <TableRow className="bg-muted/30">
        <TableCell colSpan={quarters.length + (yearlyTotal ? 2 : 1)} className="font-semibold">
          Cash Flow from {title} Activities
        </TableCell>
      </TableRow>
      
      {/* Line Items */}
      {items.map((item, index) => (
        <TableRow key={`${sectionType}-${index}`}>
          <TableCell className="pl-8">{item}</TableCell>
          {quarters.map((quarter, qIdx) => {
            const value = getItemValue(quarter, item, sectionType);
            const prevValue = qIdx < quarters.length - 1 ? 
              getItemValue(quarters[qIdx + 1], item, sectionType) : null;
            const growth = calculateGrowth(value, prevValue);
            const growthColorClass = getGrowthColorClass(growth, sectionType, item, value);
            
            return (
              <TableCell key={`q-${qIdx}`} className="text-right">
                <div>${value.toLocaleString()}</div>
                {growth !== null && qIdx < quarters.length - 1 && (
                  <div className={`text-xs ${growthColorClass}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
          
          {/* Yearly total column for monthly view */}
          {yearlyTotal && (
            <TableCell className="text-right font-medium">
              ${getItemValue(quarters[0], item, sectionType).toLocaleString()}
            </TableCell>
          )}
        </TableRow>
      ))}
      
      {/* Section Total */}
      {showTotal && (
        <TableRow className="font-medium">
          <TableCell>Net Cash from {title} Activities</TableCell>
          {quarters.map((quarter, idx) => {
            const totalProp = getTotalPropName();
            const total = calculateCashflowTotals(quarter)[totalProp];
            const prevQuarter = idx < quarters.length - 1 ? quarters[idx + 1] : null;
            const prevTotal = prevQuarter ? calculateCashflowTotals(prevQuarter)[totalProp] : null;
            const growth = calculateGrowth(total, prevTotal);
            const growthColorClass = getGrowthColorClass(growth, sectionType, undefined, total);
            
            return (
              <TableCell key={`total-${sectionType}-${idx}`} className={`text-right ${total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
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
            <TableCell className={`text-right font-bold ${yearlyTotal[getTotalPropName()] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${yearlyTotal[getTotalPropName()].toLocaleString()}
            </TableCell>
          )}
        </TableRow>
      )}
    </>
  );
};
