
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BalanceSheetQuarterData } from "../data/balanceSheetData";
import { getAllBalanceSheetItems } from "../utils/balanceSheetCalculations";
import { BalanceSheetSection } from "./BalanceSheetSection";
import { BalanceSheetTotalRow } from "./BalanceSheetTotalRow";

interface BalanceSheetTableProps {
  quarters: BalanceSheetQuarterData[];
}

export const BalanceSheetTable: React.FC<BalanceSheetTableProps> = ({ quarters }) => {
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
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {/* Assets Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Assets</TableCell>
        </TableRow>
        
        {/* Current Assets */}
        <BalanceSheetSection
          title="Current Assets"
          items={currentAssets}
          quarters={quarters}
          sectionType="assets.current"
        />
        
        {/* Total Current Assets */}
        <BalanceSheetTotalRow
          title="Total Current Assets"
          quarters={quarters}
          totalType="totalCurrentAssets"
        />
        
        {/* Non-Current Assets */}
        <BalanceSheetSection
          title="Non-Current Assets"
          items={nonCurrentAssets}
          quarters={quarters}
          sectionType="assets.nonCurrent"
        />
        
        {/* Total Non-Current Assets */}
        <BalanceSheetTotalRow
          title="Total Non-Current Assets"
          quarters={quarters}
          totalType="totalNonCurrentAssets"
        />
        
        {/* Total Assets */}
        <BalanceSheetTotalRow
          title="Total Assets"
          quarters={quarters}
          totalType="totalAssets"
          isBold={true}
        />
        
        {/* Liabilities Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Liabilities</TableCell>
        </TableRow>
        
        {/* Current Liabilities */}
        <BalanceSheetSection
          title="Current Liabilities"
          items={currentLiabilities}
          quarters={quarters}
          sectionType="liabilities.current"
          isLiability={true}
        />
        
        {/* Total Current Liabilities */}
        <BalanceSheetTotalRow
          title="Total Current Liabilities"
          quarters={quarters}
          totalType="totalCurrentLiabilities"
          isLiability={true}
        />
        
        {/* Non-Current Liabilities */}
        <BalanceSheetSection
          title="Non-Current Liabilities"
          items={nonCurrentLiabilities}
          quarters={quarters}
          sectionType="liabilities.nonCurrent"
          isLiability={true}
        />
        
        {/* Total Non-Current Liabilities */}
        <BalanceSheetTotalRow
          title="Total Non-Current Liabilities"
          quarters={quarters}
          totalType="totalNonCurrentLiabilities"
          isLiability={true}
        />
        
        {/* Total Liabilities */}
        <BalanceSheetTotalRow
          title="Total Liabilities"
          quarters={quarters}
          totalType="totalLiabilities"
          isLiability={true}
        />
        
        {/* Equity Section */}
        <TableRow className="bg-muted/30">
          <TableCell colSpan={5} className="font-semibold">Equity</TableCell>
        </TableRow>
        
        {/* Equity Items */}
        <BalanceSheetSection
          title=""
          items={equityItems}
          quarters={quarters}
          sectionType="equity"
        />
        
        {/* Total Equity */}
        <BalanceSheetTotalRow
          title="Total Equity"
          quarters={quarters}
          totalType="totalEquity"
        />
        
        {/* Total Liabilities and Equity */}
        <BalanceSheetTotalRow
          title="Total Liabilities and Equity"
          quarters={quarters}
          totalType="totalLiabilitiesAndEquity"
          isBold={true}
        />
      </TableBody>
    </Table>
  );
};
