
import { MonthlyRevenueData } from "../../types/revenueTypes";

// Q2 (April - June) revenue drivers projection
export const Q2RevenueData: MonthlyRevenueData[] = [
  { 
    month: "Apr", 
    enterprise: { 
      clients: 13, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 21, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 46, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "May", 
    enterprise: { 
      clients: 14, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 23, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 53, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "Jun", 
    enterprise: { 
      clients: 15, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 25, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 60, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  }
];
