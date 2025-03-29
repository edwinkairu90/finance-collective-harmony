
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BalanceSheetQuarterData } from "../types/balanceSheetTypes";
import { getAllBalanceSheetItems, calculateBalanceSheetTotals } from "../utils/balanceSheetCalculations";
import { BalanceSheetSection } from "./BalanceSheetSection";
import { BalanceSheetTotalRow } from "./BalanceSheetTotalRow";
import { PeriodType } from "./PeriodSelector";

interface BalanceSheetTableProps {
  quarters: BalanceSheetQuarterData[];
  periodType: PeriodType;
  yearlyTotal?: ReturnType<typeof calculateBalanceSheetTotals>;
}

export const BalanceSheetTable: React.FC<BalanceSheetTableProps> = ({ 
  quarters, 
  periodType,
  yearlyTotal
}) => {
  const { 
    currentAssets, 
    nonCurrentAssets, 
    currentLiabilities, 
    nonCurrentLiabilities, 
    equityItems 
  } = getAllBalanceSheetItems(quarters);
  
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
          {periodType === 'monthly' && yearlyTotal && (
            <TableHead className="text-right font-bold">Annual Total</TableHead>
          )}
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {/* Assets Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={quarters.length + (yearlyTotal ? 2 : 1)} className="font-semibold">Assets</TableCell>
        </TableRow>
        
        {/* Current Assets */}
        <BalanceSheetSection
          title="Current Assets"
          items={currentAssets}
          quarters={quarters}
          sectionType="assets.current"
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Current Assets */}
        <BalanceSheetTotalRow
          title="Total Current Assets"
          quarters={quarters}
          totalType="totalCurrentAssets"
          yearlyTotal={yearlyTotal}
        />
        
        {/* Non-Current Assets */}
        <BalanceSheetSection
          title="Non-Current Assets"
          items={nonCurrentAssets}
          quarters={quarters}
          sectionType="assets.nonCurrent"
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Non-Current Assets */}
        <BalanceSheetTotalRow
          title="Total Non-Current Assets"
          quarters={quarters}
          totalType="totalNonCurrentAssets"
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Assets */}
        <BalanceSheetTotalRow
          title="Total Assets"
          quarters={quarters}
          totalType="totalAssets"
          isBold={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Liabilities Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={quarters.length + (yearlyTotal ? 2 : 1)} className="font-semibold">Liabilities</TableCell>
        </TableRow>
        
        {/* Current Liabilities */}
        <BalanceSheetSection
          title="Current Liabilities"
          items={currentLiabilities}
          quarters={quarters}
          sectionType="liabilities.current"
          isLiability={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Current Liabilities */}
        <BalanceSheetTotalRow
          title="Total Current Liabilities"
          quarters={quarters}
          totalType="totalCurrentLiabilities"
          isLiability={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Non-Current Liabilities */}
        <BalanceSheetSection
          title="Non-Current Liabilities"
          items={nonCurrentLiabilities}
          quarters={quarters}
          sectionType="liabilities.nonCurrent"
          isLiability={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Non-Current Liabilities */}
        <BalanceSheetTotalRow
          title="Total Non-Current Liabilities"
          quarters={quarters}
          totalType="totalNonCurrentLiabilities"
          isLiability={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Liabilities */}
        <BalanceSheetTotalRow
          title="Total Liabilities"
          quarters={quarters}
          totalType="totalLiabilities"
          isLiability={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Equity Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={quarters.length + (yearlyTotal ? 2 : 1)} className="font-semibold">Equity</TableCell>
        </TableRow>
        
        {/* Equity Items */}
        <BalanceSheetSection
          title=""
          items={equityItems}
          quarters={quarters}
          sectionType="equity"
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Equity */}
        <BalanceSheetTotalRow
          title="Total Equity"
          quarters={quarters}
          totalType="totalEquity"
          yearlyTotal={yearlyTotal}
        />
        
        {/* Total Liabilities and Equity */}
        <BalanceSheetTotalRow
          title="Total Liabilities and Equity"
          quarters={quarters}
          totalType="totalLiabilitiesAndEquity"
          isBold={true}
          yearlyTotal={yearlyTotal}
        />
      </TableBody>
    </Table>
  );
};
