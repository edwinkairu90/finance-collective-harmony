import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { MonthlyRevenueData } from "./types/revenueTypes";
import { RevenueTableHeader } from "./table/TableHeader";
import { EnterpriseSegmentTable } from "./table/EnterpriseSegmentTable";
import { MidMarketSegmentTable } from "./table/MidMarketSegmentTable";
import { SMBSegmentTable } from "./table/SMBSegmentTable";
import { OtherRevenueTable } from "./table/OtherRevenueTable";
import { MonthlyTotalRow } from "./table/MonthlyTotalRow";
import { SegmentFilter } from "./table/SegmentFilter";

interface MonthlyRevenueTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const MonthlyRevenueTable: React.FC<MonthlyRevenueTableProps> = ({
  monthlyRevenueDrivers
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("all");

  // Filter the segments based on selection
  const showEnterprise = selectedSegment === "all" || selectedSegment === "enterprise";
  const showMidMarket = selectedSegment === "all" || selectedSegment === "midMarket";
  const showSMB = selectedSegment === "all" || selectedSegment === "smb";
  const showOther = selectedSegment === "all" || selectedSegment === "other";

  return (
    <div>
      <SegmentFilter 
        selectedSegment={selectedSegment}
        setSelectedSegment={setSelectedSegment}
      />

      <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700">
        <Table>
          <RevenueTableHeader monthlyRevenueDrivers={monthlyRevenueDrivers} />
          <TableBody>
            {/* Enterprise Section */}
            {showEnterprise && (
              <EnterpriseSegmentTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
            )}
            
            {/* Mid-Market Section */}
            {showMidMarket && (
              <MidMarketSegmentTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
            )}
            
            {/* SMB Section */}
            {showSMB && (
              <SMBSegmentTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
            )}
            
            {/* Other Revenue - keep a simplified view */}
            {showOther && (
              <OtherRevenueTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
            )}
            
            {/* Total Row - Always show this */}
            <MonthlyTotalRow monthlyRevenueDrivers={monthlyRevenueDrivers} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
