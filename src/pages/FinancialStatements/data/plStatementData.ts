
// Sample quarterly P&L data
export const plDataByQuarter = {
  "q1-2024": {
    title: "Q1 2024",
    endDate: "March 31, 2024",
    revenue: [
      { item: "Product Sales", amount: 1250000 },
      { item: "Service Revenue", amount: 450000 },
      { item: "Subscription Revenue", amount: 320000 },
    ],
    expenses: [
      { item: "Cost of Goods Sold", amount: 620000 },
      { item: "Employee Salaries", amount: 380000 },
      { item: "Marketing Expenses", amount: 175000 },
      { item: "Rent & Utilities", amount: 85000 },
      { item: "Software & Tools", amount: 45000 },
      { item: "Insurance", amount: 28000 },
      { item: "Professional Services", amount: 65000 },
      { item: "Other Operating Expenses", amount: 95000 },
    ]
  },
  "q4-2023": {
    title: "Q4 2023",
    endDate: "December 31, 2023",
    revenue: [
      { item: "Product Sales", amount: 1150000 },
      { item: "Service Revenue", amount: 420000 },
      { item: "Subscription Revenue", amount: 300000 },
    ],
    expenses: [
      { item: "Cost of Goods Sold", amount: 590000 },
      { item: "Employee Salaries", amount: 360000 },
      { item: "Marketing Expenses", amount: 165000 },
      { item: "Rent & Utilities", amount: 82000 },
      { item: "Software & Tools", amount: 42000 },
      { item: "Insurance", amount: 27000 },
      { item: "Professional Services", amount: 60000 },
      { item: "Other Operating Expenses", amount: 90000 },
    ]
  },
  "q3-2023": {
    title: "Q3 2023",
    endDate: "September 30, 2023",
    revenue: [
      { item: "Product Sales", amount: 1050000 },
      { item: "Service Revenue", amount: 390000 },
      { item: "Subscription Revenue", amount: 280000 },
    ],
    expenses: [
      { item: "Cost of Goods Sold", amount: 560000 },
      { item: "Employee Salaries", amount: 340000 },
      { item: "Marketing Expenses", amount: 155000 },
      { item: "Rent & Utilities", amount: 80000 },
      { item: "Software & Tools", amount: 38000 },
      { item: "Insurance", amount: 26000 },
      { item: "Professional Services", amount: 55000 },
      { item: "Other Operating Expenses", amount: 85000 },
    ]
  },
  "q2-2023": {
    title: "Q2 2023",
    endDate: "June 30, 2023",
    revenue: [
      { item: "Product Sales", amount: 980000 },
      { item: "Service Revenue", amount: 360000 },
      { item: "Subscription Revenue", amount: 260000 },
    ],
    expenses: [
      { item: "Cost of Goods Sold", amount: 520000 },
      { item: "Employee Salaries", amount: 320000 },
      { item: "Marketing Expenses", amount: 145000 },
      { item: "Rent & Utilities", amount: 78000 },
      { item: "Software & Tools", amount: 35000 },
      { item: "Insurance", amount: 25000 },
      { item: "Professional Services", amount: 52000 },
      { item: "Other Operating Expenses", amount: 82000 },
    ]
  },
  "q1-2023": {
    title: "Q1 2023",
    endDate: "March 31, 2023",
    revenue: [
      { item: "Product Sales", amount: 920000 },
      { item: "Service Revenue", amount: 330000 },
      { item: "Subscription Revenue", amount: 230000 },
    ],
    expenses: [
      { item: "Cost of Goods Sold", amount: 490000 },
      { item: "Employee Salaries", amount: 300000 },
      { item: "Marketing Expenses", amount: 135000 },
      { item: "Rent & Utilities", amount: 75000 },
      { item: "Software & Tools", amount: 32000 },
      { item: "Insurance", amount: 24000 },
      { item: "Professional Services", amount: 48000 },
      { item: "Other Operating Expenses", amount: 78000 },
    ]
  }
};

// Get last 4 quarters
export const getLastFourQuarters = () => {
  const lastFourQuarters = ["q1-2024", "q4-2023", "q3-2023", "q2-2023"];
  return lastFourQuarters.map(q => plDataByQuarter[q]);
};

// Type for a P&L item
export interface PLItem {
  item: string;
  amount: number;
}

// Type for quarterly data
export interface QuarterData {
  title: string;
  endDate: string;
  revenue: PLItem[];
  expenses: PLItem[];
}

// Type for quarterly totals
export interface QuarterlyTotals {
  title: string;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
}
