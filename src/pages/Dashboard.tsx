
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  revenueData, 
  opexData, 
  bvaData, 
  getTotalOpex, 
  getTotalBudget, 
  getTotalActual,
  getAnnualRevenue
} from "@/components/dashboard/dashboardData";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OpexBarChart } from "@/components/dashboard/OpexBarChart";
import { BVASummaryTable } from "@/components/dashboard/BVASummaryTable";
import { BVAVarianceChart } from "@/components/dashboard/BVAVarianceChart";
import { TimePeriodSelector } from "@/components/TimePeriodSelector";
import { availableYears, getDataForYear } from "@/components/dashboard/dashboardDataFiltered";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  
  // Get filtered data based on selected year
  const filteredData = getDataForYear(selectedYear);
  
  const showNotification = () => {
    toast({
      title: "Budget Reminder",
      description: "Q3 budget planning cycle starts next week. Please prepare your department inputs.",
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <div className="flex items-center gap-4">
          <TimePeriodSelector 
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            availableYears={availableYears}
          />
          <Button 
            onClick={showNotification}
            className="bg-[#50C2A0] hover:bg-[#3BA989] text-white text-xs py-1.5 px-3 h-8"
            size="sm"
          >
            Show Sample Notification
          </Button>
        </div>
      </div>

      {/* KPI Cards - Top Row */}
      <KPICards 
        annualRevenue={filteredData.annualRevenue}
        revenueGrowth={filteredData.revenueGrowth}
        totalOpex={filteredData.totalOpex}
        opexGrowth={filteredData.opexGrowth}
        totalVariance={filteredData.totalVariance}
        variancePercentage={filteredData.variancePercentage}
        marginPercentage={filteredData.marginPercentage}
        marginChange={filteredData.marginChange}
      />

      {/* Charts - Middle Row */}
      <div className="grid grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <OpexBarChart />
      </div>

      {/* Tables - Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        <BVASummaryTable />
        <BVAVarianceChart />
      </div>
    </div>
  );
};

export default Dashboard;
