
import { revenueData, opexData, bvaData } from "./dashboardData";

// Define available years
export const availableYears = [2022, 2023, 2024];

// Define available scenarios
export const availableScenarios = ["Base Case", "Optimistic", "Conservative"];

// Define available regions
export const availableRegions = ["All values", "North America", "Europe", "Asia Pacific", "Latin America"];

// Define available departments
export const availableDepartments = ["All values", "Sales", "Marketing", "Engineering", "Operations", "Finance"];

// Sample filtered data based on year
const dataByYear = {
  2022: {
    revenue: 240000000,
    revenueGrowth: 28.2,
    opex: 12000000,
    opexGrowth: 8.4,
    opexPercentage: 5.0,
    budgetVariance: -800000,
    variancePercentage: -6.7,
    margin: 32.5,
    marginChange: 0.8
  },
  2023: {
    revenue: 260000000,
    revenueGrowth: 31.5,
    opex: 13000000,
    opexGrowth: 9.2,
    opexPercentage: 5.0,
    budgetVariance: -950000,
    variancePercentage: -7.3,
    margin: 33.8,
    marginChange: 1.3
  },
  2024: {
    revenue: 280000000,
    revenueGrowth: 34.6,
    opex: 14000000,
    opexGrowth: 10.5,
    opexPercentage: 4.8,
    budgetVariance: -1200000,
    variancePercentage: -8.5,
    margin: 35.2,
    marginChange: 1.4
  }
};

// Sample data by region
const regionMultipliers = {
  "North America": 0.5,
  "Europe": 0.3,
  "Asia Pacific": 0.15,
  "Latin America": 0.05,
  "All values": 1.0
};

// Sample data by department
const departmentImpacts = {
  "Sales": { revenueImpact: 1.1, opexImpact: 0.95 },
  "Marketing": { revenueImpact: 1.05, opexImpact: 1.1 },
  "Engineering": { revenueImpact: 0.95, opexImpact: 1.15 },
  "Operations": { revenueImpact: 0.9, opexImpact: 0.9 },
  "Finance": { revenueImpact: 1.0, opexImpact: 0.85 },
  "All values": { revenueImpact: 1.0, opexImpact: 1.0 }
};

// Sample data by scenario
const scenarioModifiers = {
  "Base Case": { revenueModifier: 1.0, opexModifier: 1.0, marginModifier: 1.0 },
  "Optimistic": { revenueModifier: 1.15, opexModifier: 0.9, marginModifier: 1.2 },
  "Conservative": { revenueModifier: 0.85, opexModifier: 1.1, marginModifier: 0.85 }
};

// Function to get data based on all filters
export function getFilteredData(
  year: number, 
  scenario: string, 
  region: string, 
  department: string
) {
  // Default to current year if the requested year doesn't exist in our data
  const yearData = dataByYear[year as keyof typeof dataByYear] || dataByYear[2024];
  
  // Get scenario modifiers
  const scenarioMod = scenarioModifiers[scenario as keyof typeof scenarioModifiers] || scenarioModifiers["Base Case"];
  
  // Get region multiplier
  const regionMult = regionMultipliers[region as keyof typeof regionMultipliers] || regionMultipliers["All values"];
  
  // Get department impact
  const deptImpact = departmentImpacts[department as keyof typeof departmentImpacts] || departmentImpacts["All values"];
  
  // Calculate adjusted values based on all filters
  const adjustedRevenue = yearData.revenue * scenarioMod.revenueModifier * regionMult * deptImpact.revenueImpact;
  const adjustedOpex = yearData.opex * scenarioMod.opexModifier * regionMult * deptImpact.opexImpact;
  const adjustedMargin = yearData.margin * scenarioMod.marginModifier;
  
  // Format the year display
  const yearDisplay = year.toString().substring(2);
  
  return {
    annualRevenue: `$${(adjustedRevenue / 1000000).toFixed(0)}M`,
    revenueGrowth: parseFloat((yearData.revenueGrowth * scenarioMod.revenueModifier).toFixed(1)),
    totalOpex: adjustedOpex,
    opexGrowth: parseFloat((yearData.opexGrowth * scenarioMod.opexModifier).toFixed(1)),
    opexPercentage: yearData.opexPercentage,
    totalVariance: yearData.budgetVariance * regionMult,
    variancePercentage: parseFloat((yearData.variancePercentage).toFixed(1)),
    marginPercentage: parseFloat((adjustedMargin).toFixed(1)),
    marginChange: parseFloat((yearData.marginChange * scenarioMod.marginModifier).toFixed(1))
  };
}

// Function to get all filter options
export function getFilterOptions() {
  return {
    scenarios: availableScenarios,
    regions: availableRegions,
    years: availableYears,
    departments: availableDepartments
  };
}
