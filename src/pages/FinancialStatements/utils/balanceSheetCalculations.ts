import { BalanceSheetQuarterData } from "../types/balanceSheetTypes";

// Calculate totals for a balance sheet quarter
export const calculateBalanceSheetTotals = (data: BalanceSheetQuarterData) => {
  const totalCurrentAssets = data.assets.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentAssets = data.assets.nonCurrent.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  
  const totalCurrentLiabilities = data.liabilities.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentLiabilities = data.liabilities.nonCurrent.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;
  
  const totalEquity = data.equity.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
  
  return {
    totalCurrentAssets,
    totalNonCurrentAssets,
    totalAssets,
    totalCurrentLiabilities,
    totalNonCurrentLiabilities,
    totalLiabilities,
    totalEquity,
    totalLiabilitiesAndEquity
  };
};

// Get all unique balance sheet items
export const getAllBalanceSheetItems = (quarters: BalanceSheetQuarterData[]) => {
  const currentAssets = new Set<string>();
  const nonCurrentAssets = new Set<string>();
  const currentLiabilities = new Set<string>();
  const nonCurrentLiabilities = new Set<string>();
  const equityItems = new Set<string>();
  
  quarters.forEach(quarter => {
    quarter.assets.current.forEach(item => currentAssets.add(item.item));
    quarter.assets.nonCurrent.forEach(item => nonCurrentAssets.add(item.item));
    quarter.liabilities.current.forEach(item => currentLiabilities.add(item.item));
    quarter.liabilities.nonCurrent.forEach(item => nonCurrentLiabilities.add(item.item));
    quarter.equity.forEach(item => equityItems.add(item.item));
  });
  
  return {
    currentAssets: Array.from(currentAssets),
    nonCurrentAssets: Array.from(nonCurrentAssets),
    currentLiabilities: Array.from(currentLiabilities),
    nonCurrentLiabilities: Array.from(nonCurrentLiabilities),
    equityItems: Array.from(equityItems)
  };
};

// Get value for a specific item in a specific quarter
export const getItemValue = (
  quarterData: BalanceSheetQuarterData, 
  itemName: string, 
  section: 'assets.current' | 'assets.nonCurrent' | 'liabilities.current' | 'liabilities.nonCurrent' | 'equity'
): number => {
  let items;
  
  if (section === 'assets.current') {
    items = quarterData.assets.current;
  } else if (section === 'assets.nonCurrent') {
    items = quarterData.assets.nonCurrent;
  } else if (section === 'liabilities.current') {
    items = quarterData.liabilities.current;
  } else if (section === 'liabilities.nonCurrent') {
    items = quarterData.liabilities.nonCurrent;
  } else {
    items = quarterData.equity;
  }
  
  const item = items.find(i => i.item === itemName);
  return item ? item.amount : 0;
};

// Calculate growth between quarters
export const calculateGrowth = (current: number, previous: number | null): number | null => {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};
