
export interface SegmentData {
  clients: number;
  newClients: number;
  monthlySubscriptionPerClient: number;
  implementationFee: number;
  expansionRevenue: number;
}

export interface MonthlyRevenueData {
  month: string;
  enterprise: SegmentData;
  midMarket: SegmentData;
  smb: SegmentData;
  otherRevenue: number;
}

export type RevenueType = "implementation" | "other";
