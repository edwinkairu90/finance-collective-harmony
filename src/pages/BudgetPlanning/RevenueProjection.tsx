
import React, { useState } from "react";
import { KPICards } from "./components/revenue/KPICards";
import { QuarterlyProjectionsTable } from "./components/revenue/QuarterlyProjectionsTable";
import { SegmentProjectionsTable } from "./components/revenue/SegmentProjectionsTable";
import { RevenueDriversTable } from "./components/revenue/RevenueDriversTable";
import { MonthlyRevenueDrivers } from "./components/revenue/MonthlyRevenueDrivers";
import { initialMonthlyRevenueDrivers } from "./components/revenue/data/monthlyRevenueData";
import { MonthlyRevenueData } from "./components/revenue/types/revenueTypes";
import { calculateTotalRevenue, calculateMonthlyGrowth } from "./components/revenue/utils/revenueCalculations";

export const RevenueProjection: React.FC = () => {
  const [monthlyRevenueDrivers, setMonthlyRevenueDrivers] = useState<MonthlyRevenueData[]>(
    initialMonthlyRevenueDrivers
  );

  const handleUpdateMonthlyData = (updatedData: MonthlyRevenueData[]) => {
    setMonthlyRevenueDrivers(updatedData);
  };

  // Calculate the annual projected revenue from monthly data
  const annualProjectedRevenue = calculateTotalRevenue(monthlyRevenueDrivers);
  
  // Calculate the average monthly growth
  const averageMonthlyGrowth = calculateMonthlyGrowth(monthlyRevenueDrivers);
  
  // This value could be calculated based on historical data vs projections
  // For now using a static confidence score
  const projectionConfidence = 85;

  return (
    <div className="space-y-4">
      <KPICards 
        annualProjectedRevenue={annualProjectedRevenue}
        averageMonthlyGrowth={averageMonthlyGrowth}
        projectionConfidence={projectionConfidence}
      />
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
