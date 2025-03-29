
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CashflowQuarterData } from "../data/cashflowData";
import { getAllCashflowItems, calculateCashflowTotals } from "../utils/cashflowCalculations";
import { CashflowSection } from "./CashflowSection";
import { NetCashflowRow } from "./NetCashflowRow";
import { PeriodType } from "./PeriodSelector";

interface CashflowTableProps {
  quarters: CashflowQuarterData[];
  periodType: PeriodType;
  yearlyTotal?: ReturnType<typeof calculateCashflowTotals>;
}

export const CashflowTable: React.FC<CashflowTableProps> = ({ 
  quarters, 
  periodType,
  yearlyTotal
}) => {
  const { operatingItems, investingItems, financingItems } = getAllCashflowItems(quarters);
  
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
        {/* Operating Activities Section */}
        <CashflowSection 
          title="Operating"
          items={operatingItems}
          quarters={quarters}
          sectionType="operating"
          showTotal={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Investing Activities Section */}
        <CashflowSection 
          title="Investing"
          items={investingItems}
          quarters={quarters}
          sectionType="investing"
          showTotal={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Financing Activities Section */}
        <CashflowSection 
          title="Financing"
          items={financingItems}
          quarters={quarters}
          sectionType="financing"
          showTotal={true}
          yearlyTotal={yearlyTotal}
        />
        
        {/* Net Cash Flow */}
        <NetCashflowRow 
          quarters={quarters} 
          yearlyTotal={yearlyTotal}
        />
      </TableBody>
    </Table>
  );
};
