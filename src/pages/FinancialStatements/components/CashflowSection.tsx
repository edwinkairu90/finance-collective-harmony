
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { CashflowQuarterData } from "../data/cashflowData";
import { getItemValue, calculateGrowth, calculateCashflowTotals } from "../utils/cashflowCalculations";

interface CashflowSectionProps {
  title: string;
  items: string[];
  quarters: CashflowQuarterData[];
  sectionType: 'operating' | 'investing' | 'financing';
  showTotal: boolean;
}

export const CashflowSection: React.FC<CashflowSectionProps> = ({ 
  title, 
  items, 
  quarters, 
  sectionType,
  showTotal 
}) => {
  const getTotalPropName = (): keyof ReturnType<typeof calculateCashflowTotals> => {
    switch (sectionType) {
      case 'operating': return 'totalOperating';
      case 'investing': return 'totalInvesting';
      case 'financing': return 'totalFinancing';
      default: return 'totalOperating';
    }
  };

  const shouldReverseGrowthColor = (item: string, sectionType: string): boolean => {
    return (sectionType === 'investing' && item.includes('Purchase')) || 
           (sectionType === 'financing' && !item.includes('Proceeds'));
  };

  return (
    <>
      {/* Section Header */}
      <TableRow className="bg-muted/30">
        <TableCell colSpan={5} className="font-semibold">Cash Flow from {title} Activities</TableCell>
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
            const reverseColor = shouldReverseGrowthColor(item, sectionType);
            
            return (
              <TableCell key={`q-${qIdx}`} className="text-right">
                <div>${value.toLocaleString()}</div>
                {growth !== null && qIdx < quarters.length - 1 && (
                  <div className={`text-xs ${reverseColor ? 
                    (growth <= 0 ? 'text-green-600' : 'text-red-600') : 
                    (growth >= 0 ? 'text-green-600' : 'text-red-600')}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
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
            const showReverseColor = sectionType === 'investing' && total < 0;
            
            return (
              <TableCell key={`total-${sectionType}-${idx}`} className={`text-right ${total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <div>${total.toLocaleString()}</div>
                {growth !== null && idx < quarters.length - 1 && (
                  <div className={`text-xs ${showReverseColor ? 
                    (growth <= 0 ? 'text-green-600' : 'text-red-600') : 
                    (growth >= 0 ? 'text-green-600' : 'text-red-600')}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </div>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      )}
    </>
  );
};
