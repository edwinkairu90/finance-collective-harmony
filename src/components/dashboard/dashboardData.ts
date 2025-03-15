
// Mock data for revenue projections vs actuals
export const revenueData = [
  { month: 'Jan', projected: 4200, actual: 4100 },
  { month: 'Feb', projected: 4500, actual: 4600 },
  { month: 'Mar', projected: 5000, actual: 5100 },
  { month: 'Apr', projected: 5500, actual: 5300 },
  { month: 'May', projected: 6000, actual: 6200 },
  { month: 'Jun', projected: 6500, actual: 6300 },
  { month: 'Jul', projected: 7000, actual: 7200 },
  { month: 'Aug', projected: 7500, actual: null },
  { month: 'Sep', projected: 8000, actual: null },
  { month: 'Oct', projected: 8500, actual: null },
  { month: 'Nov', projected: 9000, actual: null },
  { month: 'Dec', projected: 9500, actual: null },
];

// Mock data for operational expenses
export const opexData = [
  { category: 'Personnel', amount: 3600000, percentage: 45 },
  { category: 'Technology', amount: 1200000, percentage: 15 },
  { category: 'Marketing', amount: 1000000, percentage: 12.5 },
  { category: 'Facilities', amount: 800000, percentage: 10 },
  { category: 'Travel', amount: 600000, percentage: 7.5 },
  { category: 'R&D', amount: 400000, percentage: 5 },
  { category: 'Other', amount: 400000, percentage: 5 },
];

// Mock data for BVA (Budget vs Actual) by department YTD
export const bvaData = [
  { department: 'Sales', budget: 1200000, actual: 1150000, variance: -50000 },
  { department: 'Marketing', budget: 900000, actual: 950000, variance: 50000 },
  { department: 'Engineering', budget: 2200000, actual: 2100000, variance: -100000 },
  { department: 'Operations', budget: 1400000, actual: 1450000, variance: 50000 },
  { department: 'Finance', budget: 600000, actual: 580000, variance: -20000 },
  { department: 'HR', budget: 500000, actual: 490000, variance: -10000 },
];

// Calculate totals
export const getTotalOpex = () => opexData.reduce((acc, item) => acc + item.amount, 0);
export const getTotalBudget = () => bvaData.reduce((acc, item) => acc + item.budget, 0);
export const getTotalActual = () => bvaData.reduce((acc, item) => acc + item.actual, 0);
export const getTotalVariance = () => getTotalActual() - getTotalBudget();
export const getVariancePercentage = () => (getTotalVariance() / getTotalBudget()) * 100;
