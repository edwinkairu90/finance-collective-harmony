
import { PLItem, QuarterData, QuarterlyTotals, PLSubtotals } from "../data/plStatementData";

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

// Calculate P&L subtotals (Gross Profit, EBITDA, EBIT)
export const calculatePLSubtotals = (quarters: QuarterData[]): PLSubtotals[] => {
  return quarters.map(quarter => {
    // Calculate total revenue
    const totalRevenue = quarter.revenue.reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate Cost of Sales (COGS)
    const costOfSales = quarter.expenses
      .filter(item => item.item.includes('Cost of Goods') || item.item.includes('COGS'))
      .reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate Gross Profit
    const grossProfit = totalRevenue - costOfSales;
    
    // Calculate Operating Expenses (excluding D&A)
    const operatingExpenses = quarter.expenses
      .filter(item => !item.item.includes('Cost of Goods') && !item.item.includes('COGS') && 
                    !item.item.includes('Depreciation') && !item.item.includes('Amortization'))
      .reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate EBITDA
    const ebitda = grossProfit - operatingExpenses;
    
    // Calculate Depreciation & Amortization
    const depreciationAmortization = quarter.expenses
      .filter(item => item.item.includes('Depreciation') || item.item.includes('Amortization'))
      .reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate EBIT
    const ebit = ebitda - depreciationAmortization;
    
    return {
      title: quarter.title,
      costOfSales,
      grossProfit,
      operatingExpenses,
      ebitda,
      depreciationAmortization,
      ebit
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
