
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { BalanceSheetQuarterData } from "../types/balanceSheetTypes";
import { 
  getItemValue, 
  calculateGrowth, 
  calculateBalanceSheetTotals
} from "../utils/balanceSheetCalculations";

interface BalanceSheetSectionProps {
  title: string;
  items: string[];
  quarters: BalanceSheetQuarterData[];
  sectionType: 'assets.current' | 'assets.nonCurrent' | 'liabilities.current' | 'liabilities.nonCurrent' | 'equity';
  sectionLabel?: string;
  isLiability?: boolean;
}

export const BalanceSheetSection: React.FC<BalanceSheetSectionProps> = ({ 
  title, 
  items, 
  quarters, 
  sectionType,
  sectionLabel,
  isLiability = false
}) => {
  return (
    <>
      {/* Section Header */}
      {sectionLabel && (
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">{sectionLabel}</TableCell>
        </TableRow>
      )}
      
      <TableRow>
        <TableCell className="pl-4 font-medium">{title}</TableCell>
        {quarters.map((quarter, idx) => (
          <TableCell key={idx}></TableCell>
        ))}
      </TableRow>
      
      {/* Line Items */}
      {items.map((item, index) => (
        <TableRow key={`${sectionType.replace('.', '-')}-${index}`}>
          <TableCell className="pl-8">{item}</TableCell>
          {quarters.map((quarter, qIdx) => {
            const value = getItemValue(quarter, item, sectionType);
            const prevValue = qIdx < quarters.length - 1 ? 
              getItemValue(quarters[qIdx + 1], item, sectionType) : null;
            const growth = calculateGrowth(value, prevValue);
            const growthColorClass = isLiability 
              ? (growth !== null ? (growth <= 0 ? 'text-green-600' : 'text-red-600') : '')
              : (growth !== null ? (growth >= 0 ? 'text-green-600' : 'text-red-600') : '');
            
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
        </TableRow>
      ))}
    </>
  );
};
