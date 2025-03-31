
import { MonthlyRevenueData } from "../types/revenueTypes";

// Calculate monthly totals
export const calculateMonthlyTotal = (month: string, revenueData: MonthlyRevenueData[]): number => {
  const data = revenueData.find(m => m.month === month);
  if (!data) return 0;
  
  return (
    data.enterprise.subscriptionRevenue +
    data.midMarket.subscriptionRevenue +
    data.smb.subscriptionRevenue +
    data.implementationRevenue +
    data.otherRevenue
  );
};
