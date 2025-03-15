
// Mock data for quarterly metrics
export const quarterlyData = {
  revenue: [
    { quarter: 'Q1 2023', actual: 18500000, target: 18000000, growth: 12.5 },
    { quarter: 'Q2 2023', actual: 19200000, target: 19000000, growth: 8.7 },
    { quarter: 'Q3 2023', actual: 20100000, target: 20000000, growth: 7.2 },
    { quarter: 'Q4 2023', actual: 21500000, target: 21000000, growth: 9.3 },
    { quarter: 'Q1 2024', actual: 22100000, target: 22000000, growth: 6.8 },
  ],
  margin: [
    { quarter: 'Q1 2023', gross: 68, operating: 24, net: 15 },
    { quarter: 'Q2 2023', gross: 69, operating: 25, net: 16 },
    { quarter: 'Q3 2023', gross: 70, operating: 26, net: 16 },
    { quarter: 'Q4 2023', gross: 71, operating: 27, net: 17 },
    { quarter: 'Q1 2024', gross: 72, operating: 28, net: 18 },
  ],
  headcount: [
    { quarter: 'Q1 2023', sales: 45, engineering: 75, marketing: 32, operations: 24, total: 176 },
    { quarter: 'Q2 2023', sales: 48, engineering: 80, marketing: 34, operations: 25, total: 187 },
    { quarter: 'Q3 2023', sales: 52, engineering: 85, marketing: 36, operations: 27, total: 200 },
    { quarter: 'Q4 2023', sales: 55, engineering: 92, marketing: 38, operations: 28, total: 213 },
    { quarter: 'Q1 2024', sales: 58, engineering: 95, marketing: 40, operations: 30, total: 223 },
  ],
  cashFlow: [
    { quarter: 'Q1 2023', operatingCF: 3200000, investingCF: -1500000, financingCF: -800000, netChange: 900000 },
    { quarter: 'Q2 2023', operatingCF: 3400000, investingCF: -1700000, financingCF: -900000, netChange: 800000 },
    { quarter: 'Q3 2023', operatingCF: 3600000, investingCF: -1800000, financingCF: -700000, netChange: 1100000 },
    { quarter: 'Q4 2023', operatingCF: 3900000, investingCF: -2000000, financingCF: -1000000, netChange: 900000 },
    { quarter: 'Q1 2024', operatingCF: 4100000, investingCF: -1900000, financingCF: -1100000, netChange: 1100000 },
  ],
};

// Chart data for quarterly revenue
export const revenueChartData = quarterlyData.revenue.map(item => ({
  quarter: item.quarter,
  Actual: item.actual / 1000000, // Convert to millions for display
  Target: item.target / 1000000,
}));

// Chart data for quarterly margins
export const marginChartData = quarterlyData.margin.map(item => ({
  quarter: item.quarter,
  "Gross Margin": item.gross,
  "Operating Margin": item.operating,
  "Net Margin": item.net,
}));

// Utility functions to get the latest data
export const getLatestData = () => {
  const latestRevenue = quarterlyData.revenue[quarterlyData.revenue.length - 1];
  const latestMargin = quarterlyData.margin[quarterlyData.margin.length - 1];
  const latestHeadcount = quarterlyData.headcount[quarterlyData.headcount.length - 1];
  const latestCashFlow = quarterlyData.cashFlow[quarterlyData.cashFlow.length - 1];
  
  const previousRevenue = quarterlyData.revenue[quarterlyData.revenue.length - 2];
  const revenueQoQChange = ((latestRevenue.actual - previousRevenue.actual) / previousRevenue.actual) * 100;
  
  const previousHeadcount = quarterlyData.headcount[quarterlyData.headcount.length - 2];
  const headcountQoQChange = ((latestHeadcount.total - previousHeadcount.total) / previousHeadcount.total) * 100;
  
  const previousCashFlow = quarterlyData.cashFlow[quarterlyData.cashFlow.length - 2];
  const cashFlowQoQChange = ((latestCashFlow.operatingCF - previousCashFlow.operatingCF) / previousCashFlow.operatingCF) * 100;

  return {
    latestRevenue,
    latestMargin,
    latestHeadcount,
    latestCashFlow,
    revenueQoQChange,
    headcountQoQChange,
    cashFlowQoQChange
  };
};
