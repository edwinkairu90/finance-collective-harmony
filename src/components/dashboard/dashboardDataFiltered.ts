
import { revenueData, opexData, bvaData } from "./dashboardData";

// Define available years
export const availableYears = [2022, 2023, 2024];

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

// Function to get data for a specific year
export function getDataForYear(year: number) {
  // Default to current year if the requested year doesn't exist in our data
  const yearData = dataByYear[year as keyof typeof dataByYear] || dataByYear[2024];
  
  return {
    annualRevenue: `$${(yearData.revenue / 1000000).toFixed(0)}M`,
    revenueGrowth: yearData.revenueGrowth,
    totalOpex: yearData.opex,
    opexGrowth: yearData.opexGrowth,
    opexPercentage: yearData.opexPercentage,
    totalVariance: yearData.budgetVariance,
    variancePercentage: yearData.variancePercentage,
    marginPercentage: yearData.margin,
    marginChange: yearData.marginChange
  };
}
