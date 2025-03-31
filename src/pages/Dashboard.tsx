
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
import { 
  availableYears, 
  getFilteredData, 
  getFilterOptions,
  availableScenarios,
  availableRegions,
  availableDepartments
} from "@/components/dashboard/dashboardDataFiltered";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedScenario, setSelectedScenario] = useState<string>("Base Case");
  const [selectedRegion, setSelectedRegion] = useState<string>("All values");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All values");
  
  // Get filter options
  const filterOptions = getFilterOptions();
  
  // Get filtered data based on all filters
  const filteredData = getFilteredData(
    selectedYear, 
    selectedScenario, 
    selectedRegion, 
    selectedDepartment
  );

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
        <Button 
          onClick={showNotification}
          className="bg-[#50C2A0] hover:bg-[#3BA989] text-white text-xs py-1.5 px-3 h-8"
          size="sm"
        >
          Show Sample Notification
        </Button>
      </div>

      {/* Filters */}
      <DashboardFilters 
        selectedScenario={selectedScenario}
        selectedRegion={selectedRegion}
        selectedYear={selectedYear}
        selectedDepartment={selectedDepartment}
        onScenarioChange={setSelectedScenario}
        onRegionChange={setSelectedRegion}
        onYearChange={setSelectedYear}
        onDepartmentChange={setSelectedDepartment}
        filterOptions={filterOptions}
      />

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
