
import { PLItem, QuarterData, QuarterlyTotals } from "../data/plStatementData";

// Get all unique revenue and expense line items
export const getAllItems = (quarters: QuarterData[]) => {
  const revenueItems = new Set<string>();
  const expenseItems = new Set<string>();
  
  quarters.forEach(quarter => {
    quarter.revenue.forEach(item => revenueItems.add(item.item));
    quarter.expenses.forEach(item => expenseItems.add(item.item));
  });
  
  return {
    revenueItems: Array.from(revenueItems),
    expenseItems: Array.from(expenseItems)
  };
};

// Calculate quarterly totals
export const calculateQuarterlyTotals = (quarters: QuarterData[]): QuarterlyTotals[] => {
  return quarters.map(quarter => {
    const totalRevenue = quarter.revenue.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = quarter.expenses.reduce((sum, item) => sum + item.amount, 0);
    return {
      title: quarter.title,
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses
    };
  });
};

// Get value for a specific item in a specific quarter
export const getItemValue = (quarterData: QuarterData, itemName: string, type: 'revenue' | 'expenses'): number => {
  const items = type === 'revenue' ? quarterData.revenue : quarterData.expenses;
  const item = items.find(i => i.item === itemName);
  return item ? item.amount : 0;
};

// Calculate growth between quarters
export const calculateGrowth = (current: number, previous: number | null): number | null => {
  if (!previous || previous === 0) return null;
  return ((current - previous) / previous) * 100;
};
