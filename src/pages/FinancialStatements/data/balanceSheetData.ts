
// Re-export types from types file
export type {
  BalanceSheetItem,
  BalanceSheetQuarterData,
  BalanceSheetData
} from "../types/balanceSheetTypes";

// Re-export sample data
export { balanceSheetByQuarter } from "./balanceSheetSampleData";

// Re-export helper functions
export { getLastFourQuarters } from "./balanceSheetHelpers";

// Generate dummy data for monthly view
export const getMonthsForYear = (year: number): BalanceSheetQuarterData[] => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get sample data structure from Q1 2024
  const sampleData = balanceSheetByQuarter['q1-2024'];
  
  // Return array of monthly data with slightly varying numbers
  return months.map((month, index) => {
    const variationFactor = 0.85 + (index * 0.03); // Gradual growth throughout the year
    
    return {
      title: month,
      date: `${month} ${year}`,
      assets: {
        current: sampleData.assets.current.map(item => ({
          item: item.item,
          amount: Math.round(item.amount * variationFactor)
        })),
        nonCurrent: sampleData.assets.nonCurrent.map(item => ({
          item: item.item,
          amount: Math.round(item.amount * variationFactor)
        }))
      },
      liabilities: {
        current: sampleData.liabilities.current.map(item => ({
          item: item.item,
          amount: Math.round(item.amount * variationFactor)
        })),
        nonCurrent: sampleData.liabilities.nonCurrent.map(item => ({
          item: item.item,
          amount: Math.round(item.amount * variationFactor)
        }))
      },
      equity: sampleData.equity.map(item => ({
        item: item.item,
        amount: Math.round(item.amount * variationFactor)
      }))
    };
  }).reverse(); // Latest month first
};
