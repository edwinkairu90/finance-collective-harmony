
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CashflowQuarterData } from "../data/cashflowData";
import { getAllCashflowItems } from "../utils/cashflowCalculations";
import { CashflowSection } from "./CashflowSection";
import { NetCashflowRow } from "./NetCashflowRow";
import { PeriodType } from "./PeriodSelector";

interface CashflowTableProps {
  quarters: CashflowQuarterData[];
  periodType: PeriodType;
}

export const CashflowTable: React.FC<CashflowTableProps> = ({ quarters, periodType }) => {
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
        />
        
        {/* Investing Activities Section */}
        <CashflowSection 
          title="Investing"
          items={investingItems}
          quarters={quarters}
          sectionType="investing"
          showTotal={true}
        />
        
        {/* Financing Activities Section */}
        <CashflowSection 
          title="Financing"
          items={financingItems}
          quarters={quarters}
          sectionType="financing"
          showTotal={true}
        />
        
        {/* Net Cash Flow */}
        <NetCashflowRow quarters={quarters} />
      </TableBody>
    </Table>
  );
};
