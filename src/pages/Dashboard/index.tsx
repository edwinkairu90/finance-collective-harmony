
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getFilterOptions } from "@/components/dashboard/dashboardDataFiltered";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { KPICards } from "@/components/dashboard/KPICards";
import { DashboardCharts } from "./components/DashboardCharts";
import { DashboardTables } from "./components/DashboardTables";
import { BudgetInsights } from "@/components/dashboard/BudgetInsights";
import { useDashboardData } from "./hooks/useDashboardData";

const Dashboard = () => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedScenario, setSelectedScenario] = useState<string>("Base Case");
  const [selectedRegion, setSelectedRegion] = useState<string>("All values");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All values");
  
  // Get filter options
  const filterOptions = getFilterOptions();
  
  // Get dashboard data that now includes actuals data
  const dashboardData = useDashboardData(
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
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
        <Button 
          onClick={showNotification}
          className="bg-[#50C2A0] hover:bg-[#3BA989] text-white text-xs py-1 px-2.5 h-7"
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
        annualRevenue={dashboardData.annualRevenue}
        revenueGrowth={dashboardData.revenueGrowth}
        totalOpex={dashboardData.totalOpex}
        opexGrowth={dashboardData.opexGrowth}
        totalVariance={dashboardData.totalVariance}
        variancePercentage={dashboardData.variancePercentage}
        marginPercentage={dashboardData.marginPercentage}
        marginChange={dashboardData.marginChange}
      />

      {/* Charts - Middle Row */}
      <DashboardCharts />
      
      {/* Tables and Insights - Bottom Row */}
      <DashboardTables />
      
      {/* Budget Insights */}
      <BudgetInsights />
    </div>
  );
};

export default Dashboard;
