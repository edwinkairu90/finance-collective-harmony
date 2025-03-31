
import { MonthlyRevenueData, SegmentData } from "../types/revenueTypes";

// Calculate total clients for a segment
export const calculateTotalClients = (segment: SegmentData): number => {
  return segment.clients + segment.newClients;
};

// Calculate total subscription revenue for a segment
export const calculateTotalSubscription = (segment: SegmentData): number => {
  return calculateTotalClients(segment) * segment.monthlySubscriptionPerClient;
};

// Calculate total revenue for a segment
export const calculateSegmentTotalRevenue = (segment: SegmentData): number => {
  return calculateTotalSubscription(segment) + segment.implementationFee + segment.expansionRevenue;
};

// Calculate monthly totals across all segments
export const calculateMonthlyTotal = (month: string, revenueData: MonthlyRevenueData[]): number => {
  const data = revenueData.find(m => m.month === month);
  if (!data) return 0;
  
  return (
    calculateSegmentTotalRevenue(data.enterprise) +
    calculateSegmentTotalRevenue(data.midMarket) +
    calculateSegmentTotalRevenue(data.smb) +
    data.otherRevenue
  );
};

// Calculate total revenue across all months
export const calculateTotalRevenue = (revenueData: MonthlyRevenueData[]): number => {
  return revenueData.reduce((total, monthData) => {
    const monthlyTotal = 
      calculateSegmentTotalRevenue(monthData.enterprise) +
      calculateSegmentTotalRevenue(monthData.midMarket) +
      calculateSegmentTotalRevenue(monthData.smb) +
      monthData.otherRevenue;
    
    return total + monthlyTotal;
  }, 0);
};

// Calculate average monthly growth rate
export const calculateMonthlyGrowth = (revenueData: MonthlyRevenueData[]): number => {
  if (revenueData.length <= 1) return 0;
  
  // Calculate monthly totals for each month
  const monthlyTotals = revenueData.map(month => {
    return (
      calculateSegmentTotalRevenue(month.enterprise) +
      calculateSegmentTotalRevenue(month.midMarket) +
      calculateSegmentTotalRevenue(month.smb) +
      month.otherRevenue
    );
  });
  
  // Calculate month-over-month growth rates
  let totalGrowthRate = 0;
  let growthRateCount = 0;
  
  for (let i = 1; i < monthlyTotals.length; i++) {
    const previousMonthTotal = monthlyTotals[i - 1];
    const currentMonthTotal = monthlyTotals[i];
    
    if (previousMonthTotal > 0) {
      const growthRate = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
      totalGrowthRate += growthRate;
      growthRateCount++;
    }
  }
  
  // Return the average growth rate
  return growthRateCount > 0 ? totalGrowthRate / growthRateCount : 0;
};

// Format currency with a single dollar sign
export const formatRevenueCurrency = (amount: number): string => {
  return `$${amount.toLocaleString()}`;
};
