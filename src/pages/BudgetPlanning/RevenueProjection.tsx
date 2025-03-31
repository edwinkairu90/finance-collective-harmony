
import React from "react";
import { KPICards } from "./components/revenue/KPICards";
import { QuarterlyProjectionsTable } from "./components/revenue/QuarterlyProjectionsTable";
import { SegmentProjectionsTable } from "./components/revenue/SegmentProjectionsTable";
import { RevenueDriversTable } from "./components/revenue/RevenueDriversTable";
import { MonthlyRevenueDrivers } from "./components/revenue/MonthlyRevenueDrivers";

export const RevenueProjection: React.FC = () => {
  return (
    <div className="space-y-4">
      <KPICards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuarterlyProjectionsTable />
        <SegmentProjectionsTable />
      </div>
      <RevenueDriversTable />
      <MonthlyRevenueDrivers />
    </div>
  );
};
