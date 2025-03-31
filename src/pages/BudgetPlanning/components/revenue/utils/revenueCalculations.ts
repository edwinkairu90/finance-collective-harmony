
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
