
import { MonthlyRevenueData } from "../../types/revenueTypes";

// Q1 (January - March) revenue drivers projection
export const Q1RevenueData: MonthlyRevenueData[] = [
  { 
    month: "Jan", 
    enterprise: { 
      clients: 10, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 15, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 25, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "Feb", 
    enterprise: { 
      clients: 11, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 17, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 32, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "Mar", 
    enterprise: { 
      clients: 12, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 12000, 
      expansionRevenue: 5000 
    },
    midMarket: { 
      clients: 19, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 39, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  }
];
