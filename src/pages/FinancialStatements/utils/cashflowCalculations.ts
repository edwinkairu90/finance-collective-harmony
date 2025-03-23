
import { CashflowData, CashflowItem, CashflowQuarterData } from "../data/cashflowData";

// Calculate quarterly totals
export const calculateCashflowTotals = (data: CashflowQuarterData) => {
  const totalOperating = data.operating.reduce((sum, item) => sum + item.amount, 0);
  const totalInvesting = data.investing.reduce((sum, item) => sum + item.amount, 0);
  const totalFinancing = data.financing.reduce((sum, item) => sum + item.amount, 0);
  const netCashflow = totalOperating + totalInvesting + totalFinancing;
  
  return {
    totalOperating,
    totalInvesting,
    totalFinancing,
    netCashflow
  };
};

// Get all unique cash flow line items
export const getAllCashflowItems = (quarters: CashflowQuarterData[]) => {
  const operatingItems = new Set<string>();
  const investingItems = new Set<string>();
  const financingItems = new Set<string>();
  
  quarters.forEach(quarter => {
    quarter.operating.forEach(item => operatingItems.add(item.item));
    quarter.investing.forEach(item => investingItems.add(item.item));
    quarter.financing.forEach(item => financingItems.add(item.item));
  });
  
  return {
    operatingItems: Array.from(operatingItems),
    investingItems: Array.from(investingItems),
    financingItems: Array.from(financingItems)
  };
};

// Get value for a specific item in a specific quarter
export const getItemValue = (quarterData: CashflowQuarterData, itemName: string, type: 'operating' | 'investing' | 'financing'): number => {
  const items = quarterData[type];
  const item = items.find(i => i.item === itemName);
  return item ? item.amount : 0;
};

// Calculate growth between quarters
export const calculateGrowth = (current: number, previous: number | null): number | null => {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

// Determine appropriate color class for growth values
export const getGrowthColorClass = (
  growth: number | null, 
  sectionType: 'operating' | 'investing' | 'financing',
  item?: string,
  value?: number
): string => {
  if (growth === null) return '';
  
  // Special cases for investing outflows where negative growth is positive
  if (sectionType === 'investing') {
    // For investing items with "Purchase" in the name, or negative values (outflows)
    if ((item && item.includes('Purchase')) || (value !== undefined && value < 0)) {
      return growth <= 0 ? 'text-green-600' : 'text-red-600';
    }
  }
  
  // Special cases for financing where outflows reduction is positive
  if (sectionType === 'financing' && item && !item.includes('Proceeds')) {
    return growth <= 0 ? 'text-green-600' : 'text-red-600';
  }
  
  // Default case: positive growth is good
  return growth >= 0 ? 'text-green-600' : 'text-red-600';
};

// Calculate monthly totals
export const calculateMonthlyCashflowTotals = (months: CashflowQuarterData[]) => {
  return months.map(month => calculateCashflowTotals(month));
};

// Calculate annual total (sum of all months)
export const calculateAnnualCashflowTotal = (months: CashflowQuarterData[]) => {
  let totalOperating = 0;
  let totalInvesting = 0;
  let totalFinancing = 0;
  
  months.forEach(month => {
    const totals = calculateCashflowTotals(month);
    totalOperating += totals.totalOperating;
    totalInvesting += totals.totalInvesting;
    totalFinancing += totals.totalFinancing;
  });
  
  const netCashflow = totalOperating + totalInvesting + totalFinancing;
  
  return {
    totalOperating,
    totalInvesting,
    totalFinancing,
    netCashflow
  };
};
