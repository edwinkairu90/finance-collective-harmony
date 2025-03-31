
import React, { useState } from "react";
import { KPICards } from "./components/revenue/KPICards";
import { QuarterlyProjectionsTable } from "./components/revenue/QuarterlyProjectionsTable";
import { SegmentProjectionsTable } from "./components/revenue/SegmentProjectionsTable";
import { RevenueDriversTable } from "./components/revenue/RevenueDriversTable";
import { MonthlyRevenueDrivers } from "./components/revenue/MonthlyRevenueDrivers";
import { initialMonthlyRevenueDrivers } from "./components/revenue/data/monthlyRevenueData";
import { MonthlyRevenueData } from "./components/revenue/types/revenueTypes";

export const RevenueProjection: React.FC = () => {
  const [monthlyRevenueDrivers, setMonthlyRevenueDrivers] = useState<MonthlyRevenueData[]>(
    initialMonthlyRevenueDrivers
  );

  const handleUpdateMonthlyData = (updatedData: MonthlyRevenueData[]) => {
    setMonthlyRevenueDrivers(updatedData);
  };

  return (
    <div className="space-y-4">
      <KPICards />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuarterlyProjectionsTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
        <SegmentProjectionsTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
      </div>
      <RevenueDriversTable />
      <MonthlyRevenueDrivers 
        initialData={monthlyRevenueDrivers}
        onDataUpdate={handleUpdateMonthlyData}
      />
    </div>
  );
};
