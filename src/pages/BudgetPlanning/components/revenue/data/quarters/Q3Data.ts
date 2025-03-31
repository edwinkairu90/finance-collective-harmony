
import { MonthlyRevenueData } from "../../types/revenueTypes";

// Q3 (July - September) revenue drivers projection
export const Q3RevenueData: MonthlyRevenueData[] = [
  { 
    month: "Jul", 
    enterprise: { 
      clients: 16, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 8000 
    },
    midMarket: { 
      clients: 27, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 67, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "Aug", 
    enterprise: { 
      clients: 17, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 29, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 74, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "Sep", 
    enterprise: { 
      clients: 18, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 31, 
      newClients: 3, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 12500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 81, 
      newClients: 8, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5500, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  }
];
