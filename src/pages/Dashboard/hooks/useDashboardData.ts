
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";
import { getFilteredData } from "@/components/dashboard/dashboardDataFiltered";

export const useDashboardData = (
  selectedYear: number,
  selectedScenario: string,
  selectedRegion: string,
  selectedDepartment: string
) => {
  // Get the data from the ActualsVsBudget hook
  const {
    totalBudget,
    totalActual,
    variance,
    accuracy,
    monthlyData,
    departmentData
  } = useActualsData();

  // Get filtered dashboard data
  const filteredData = getFilteredData(
    selectedYear, 
    selectedScenario, 
    selectedRegion, 
    selectedDepartment
  );

  // Calculate the annual revenue in the right format for KPI cards
  const annualRevenue = `$${(totalActual / 1000).toFixed(0)}K`;
  
  // Use variance percentage as the revenue growth for now
  const revenueGrowth = parseFloat((accuracy - 100).toFixed(1));

  // Create a merged data object that combines both sets of data
  return {
    // Original filtered data
    ...filteredData,
    
    // Replace with actuals data
    annualRevenue,
    revenueGrowth,
    totalOpex: totalActual,
    opexGrowth: parseFloat((accuracy - 100).toFixed(1)),
    totalVariance: variance,
    variancePercentage: parseFloat(((variance / totalBudget) * 100).toFixed(1)),
    
    // Additional data from actuals
    totalBudget,
    totalActual,
    accuracy,
    monthlyData,
    departmentData
  };
};
