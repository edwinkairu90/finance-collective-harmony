
export interface SegmentData {
  clients: number;
  newClients: number;
  monthlySubscriptionPerClient: number;
  implementationFee: number;
  expansionRevenue: number;
}

export interface ProductRevenue {
  id: string;
  name: string;
  enterprise: SegmentData;
  midMarket: SegmentData;
  smb: SegmentData;
}

export interface MonthlyRevenueData {
  month: string;
  products: ProductRevenue[];
  otherRevenue: number;
}

export type RevenueType = "implementation" | "other";
