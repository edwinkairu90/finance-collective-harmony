
import { MonthlyRevenueData } from "../../types/revenueTypes";

// Q4 (October - December) revenue drivers projection
export const Q4RevenueData: MonthlyRevenueData[] = [
  { 
    month: "Oct", 
    enterprise: { 
      clients: 19, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 10000 
    },
    midMarket: { 
      clients: 34, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 89, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "Nov", 
    enterprise: { 
      clients: 20, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 12000, 
      expansionRevenue: 0 
    },
    midMarket: { 
      clients: 36, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 96, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  },
  { 
    month: "Dec", 
    enterprise: { 
      clients: 21, 
      newClients: 1, 
      monthlySubscriptionPerClient: 6250, 
      implementationFee: 15000, 
      expansionRevenue: 5000 
    },
    midMarket: { 
      clients: 38, 
      newClients: 2, 
      monthlySubscriptionPerClient: 2250, 
      implementationFee: 8500, 
      expansionRevenue: 0 
    },
    smb: { 
      clients: 103, 
      newClients: 7, 
      monthlySubscriptionPerClient: 750, 
      implementationFee: 5000, 
      expansionRevenue: 0 
    },
    otherRevenue: 0
  }
];
