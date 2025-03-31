
import { MonthlyRevenueData, ProductRevenue } from "../types/revenueTypes";

// Transform legacy data format to the new format with products
export const transformLegacyData = (legacyData: any[]): MonthlyRevenueData[] => {
  return legacyData.map(item => ({
    month: item.month,
    products: [
      {
        id: "default-product",
        name: "Core Platform",
        enterprise: { ...item.enterprise },
        midMarket: { ...item.midMarket },
        smb: { ...item.smb },
      }
    ],
    otherRevenue: item.otherRevenue
  }));
};

// Create a new empty product with default values
export const createEmptyProduct = (id: string, name: string): ProductRevenue => {
  return {
    id,
    name,
    enterprise: {
      clients: 0,
      newClients: 0,
      monthlySubscriptionPerClient: 0,
      implementationFee: 0,
      expansionRevenue: 0
    },
    midMarket: {
      clients: 0,
      newClients: 0,
      monthlySubscriptionPerClient: 0,
      implementationFee: 0,
      expansionRevenue: 0
    },
    smb: {
      clients: 0,
      newClients: 0,
      monthlySubscriptionPerClient: 0,
      implementationFee: 0,
      expansionRevenue: 0
    }
  };
};
