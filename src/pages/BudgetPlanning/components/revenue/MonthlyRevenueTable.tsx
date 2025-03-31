import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { MonthlyRevenueData, SegmentData } from "./types/revenueTypes";
import { RevenueTableHeader } from "./table/TableHeader";
import { EnterpriseSegmentTable } from "./table/EnterpriseSegmentTable";
import { MidMarketSegmentTable } from "./table/MidMarketSegmentTable";
import { SMBSegmentTable } from "./table/SMBSegmentTable";
import { OtherRevenueTable } from "./table/OtherRevenueTable";
import { MonthlyTotalRow } from "./table/MonthlyTotalRow";
import { SegmentFilter } from "./table/SegmentFilter";

interface MonthlyRevenueTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
  selectedProductId: string;
  onUpdateData: (
    month: string,
    productId: string,
    segment: "enterprise" | "midMarket" | "smb",
    field: keyof SegmentData,
    value: number
  ) => void;
}

export const MonthlyRevenueTable: React.FC<MonthlyRevenueTableProps> = ({
  monthlyRevenueDrivers,
  selectedProductId,
  onUpdateData
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("all");
  const [editingCell, setEditingCell] = useState<{
    month: string;
    segment: "enterprise" | "midMarket" | "smb";
    field: keyof SegmentData;
  } | null>(null);

  // Filter the segments based on selection
  const showEnterprise = selectedSegment === "all" || selectedSegment === "enterprise";
  const showMidMarket = selectedSegment === "all" || selectedSegment === "midMarket";
  const showSMB = selectedSegment === "all" || selectedSegment === "smb";
  const showOther = selectedSegment === "all" || selectedSegment === "other";

  const handleStartEdit = (
    month: string,
    segment: "enterprise" | "midMarket" | "smb",
    field: keyof SegmentData
  ) => {
    setEditingCell({ month, segment, field });
  };

  const handleSaveEdit = (
    month: string,
    segment: "enterprise" | "midMarket" | "smb",
    field: keyof SegmentData,
    value: number
  ) => {
    onUpdateData(month, selectedProductId, segment, field, value);
    setEditingCell(null);
  };

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
              <EnterpriseSegmentTable 
                monthlyRevenueDrivers={monthlyRevenueDrivers}
                selectedProductId={selectedProductId}
                editingCell={editingCell}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
              />
            )}
            
            {/* Mid-Market Section */}
            {showMidMarket && (
              <MidMarketSegmentTable 
                monthlyRevenueDrivers={monthlyRevenueDrivers}
                selectedProductId={selectedProductId}
                editingCell={editingCell}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
              />
            )}
            
            {/* SMB Section */}
            {showSMB && (
              <SMBSegmentTable 
                monthlyRevenueDrivers={monthlyRevenueDrivers}
                selectedProductId={selectedProductId}
                editingCell={editingCell}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
              />
            )}
            
            {/* Other Revenue - keep a simplified view */}
            {showOther && (
              <OtherRevenueTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
            )}
            
            {/* Total Row - Always show this */}
            <MonthlyTotalRow 
              monthlyRevenueDrivers={monthlyRevenueDrivers}
              selectedProductId={selectedProductId}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
