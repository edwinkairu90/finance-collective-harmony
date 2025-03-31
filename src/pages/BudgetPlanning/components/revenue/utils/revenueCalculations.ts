
import { MonthlyRevenueData, ProductRevenue, SegmentData } from "../types/revenueTypes";

// Calculate total revenue from monthly data
export const calculateTotalRevenue = (monthlyRevenueDrivers: MonthlyRevenueData[]): number => {
  return monthlyRevenueDrivers.reduce((total, month) => {
    const monthTotal = calculateMonthTotal(month);
    return total + monthTotal;
  }, 0);
};

// Calculate the total revenue for a single month across all products
export const calculateMonthTotal = (monthData: MonthlyRevenueData): number => {
  let total = monthData.otherRevenue;
  
  // Add revenue from each product
  monthData.products.forEach(product => {
    // Enterprise
    const eSubscriptionRevenue = product.enterprise.clients * product.enterprise.monthlySubscriptionPerClient;
    const eImplementationRevenue = product.enterprise.newClients * product.enterprise.implementationFee;
    const eTotal = eSubscriptionRevenue + eImplementationRevenue + product.enterprise.expansionRevenue;
    
    // Mid-Market
    const mSubscriptionRevenue = product.midMarket.clients * product.midMarket.monthlySubscriptionPerClient;
    const mImplementationRevenue = product.midMarket.newClients * product.midMarket.implementationFee;
    const mTotal = mSubscriptionRevenue + mImplementationRevenue + product.midMarket.expansionRevenue;
    
    // SMB
    const sSubscriptionRevenue = product.smb.clients * product.smb.monthlySubscriptionPerClient;
    const sImplementationRevenue = product.smb.newClients * product.smb.implementationFee;
    const sTotal = sSubscriptionRevenue + sImplementationRevenue + product.smb.expansionRevenue;
    
    total += eTotal + mTotal + sTotal;
  });
  
  return total;
};

// Calculate the revenue growth percentage between months
export const calculateMonthlyGrowth = (monthlyRevenueDrivers: MonthlyRevenueData[]): number => {
  if (monthlyRevenueDrivers.length < 2) return 0;
  
  const monthTotals = monthlyRevenueDrivers.map(month => calculateMonthTotal(month));
  
  // Calculate the average month-over-month growth
  let totalGrowthRate = 0;
  let countedMonths = 0;
  
  for (let i = 1; i < monthTotals.length; i++) {
    const prevMonth = monthTotals[i - 1];
    const currentMonth = monthTotals[i];
    
    if (prevMonth > 0) {
      const growthRate = ((currentMonth - prevMonth) / prevMonth) * 100;
      totalGrowthRate += growthRate;
      countedMonths++;
    }
  }
  
  return countedMonths > 0 ? totalGrowthRate / countedMonths : 0;
};

// Calculate total revenue for a specific product
export const calculateProductTotalRevenue = (
  monthlyRevenueDrivers: MonthlyRevenueData[],
  productId: string
): number => {
  return monthlyRevenueDrivers.reduce((total, month) => {
    const product = month.products.find(p => p.id === productId);
    if (!product) return total;
    
    // Enterprise
    const eSubscriptionRevenue = product.enterprise.clients * product.enterprise.monthlySubscriptionPerClient;
    const eImplementationRevenue = product.enterprise.newClients * product.enterprise.implementationFee;
    const eTotal = eSubscriptionRevenue + eImplementationRevenue + product.enterprise.expansionRevenue;
    
    // Mid-Market
    const mSubscriptionRevenue = product.midMarket.clients * product.midMarket.monthlySubscriptionPerClient;
    const mImplementationRevenue = product.midMarket.newClients * product.midMarket.implementationFee;
    const mTotal = mSubscriptionRevenue + mImplementationRevenue + product.midMarket.expansionRevenue;
    
    // SMB
    const sSubscriptionRevenue = product.smb.clients * product.smb.monthlySubscriptionPerClient;
    const sImplementationRevenue = product.smb.newClients * product.smb.implementationFee;
    const sTotal = sSubscriptionRevenue + sImplementationRevenue + product.smb.expansionRevenue;
    
    return total + eTotal + mTotal + sTotal;
  }, 0);
};

// Calculate total revenue for a specific segment within a product
export const calculateSegmentTotalRevenue = (segmentData: SegmentData): number => {
  const subscriptionRevenue = segmentData.clients * segmentData.monthlySubscriptionPerClient;
  const implementationRevenue = segmentData.newClients * segmentData.implementationFee;
  return subscriptionRevenue + implementationRevenue + segmentData.expansionRevenue;
};
