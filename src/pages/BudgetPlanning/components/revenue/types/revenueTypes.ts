
export interface MonthlyRevenueData {
  month: string;
  enterprise: { 
    newClients: number; 
    subscriptionRevenue: number 
  };
  midMarket: { 
    newClients: number; 
    subscriptionRevenue: number 
  };
  smb: { 
    newClients: number; 
    subscriptionRevenue: number 
  };
  implementationRevenue: number;
  otherRevenue: number;
}

export type RevenueType = "implementation" | "other";
