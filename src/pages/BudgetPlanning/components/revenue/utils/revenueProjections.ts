
import { MonthlyRevenueData, ProductRevenue } from "../types/revenueTypes";
import { calculateSegmentTotalRevenue } from "./revenueCalculations";

// Mapping of months to quarters
const monthToQuarter: Record<string, 'Q1' | 'Q2' | 'Q3' | 'Q4'> = {
  'Jan': 'Q1', 'Feb': 'Q1', 'Mar': 'Q1',
  'Apr': 'Q2', 'May': 'Q2', 'Jun': 'Q2',
  'Jul': 'Q3', 'Aug': 'Q3', 'Sep': 'Q3',
  'Oct': 'Q4', 'Nov': 'Q4', 'Dec': 'Q4'
};

export interface QuarterlyProjection {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  revenue: number;
  growth: string;
}

export interface SegmentProjection {
  segment: string;
  revenue: number;
  growth: string;
  percentage: string;
}

// Calculate quarterly revenue totals from monthly data
export const calculateQuarterlyProjections = (
  monthlyData: MonthlyRevenueData[]
): QuarterlyProjection[] => {
  // Initialize quarterly totals
  const quarterlyTotals: Record<string, number> = {
    'Q1': 0,
    'Q2': 0,
    'Q3': 0,
    'Q4': 0
  };

  // Previous year's quarterly values (for growth calculation)
  // These could be stored elsewhere or calculated differently in a real app
  const previousYearQuarterly = {
    'Q1': 263400,
    'Q2': 295200,
    'Q3': 338500,
    'Q4': 391200
  };

  // Calculate quarterly totals
  monthlyData.forEach(month => {
    const quarter = monthToQuarter[month.month];
    if (!quarter) return;

    // Sum revenues from all products for this month
    let monthTotal = month.otherRevenue;
    month.products.forEach(product => {
      monthTotal += calculateSegmentTotalRevenue(product.enterprise);
      monthTotal += calculateSegmentTotalRevenue(product.midMarket);
      monthTotal += calculateSegmentTotalRevenue(product.smb);
    });

    quarterlyTotals[quarter] += monthTotal;
  });

  // Calculate growth percentages
  return Object.entries(quarterlyTotals).map(([quarter, revenue]) => {
    const prevRevenue = previousYearQuarterly[quarter as keyof typeof previousYearQuarterly];
    const growth = prevRevenue ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;

    return {
      quarter: quarter as 'Q1' | 'Q2' | 'Q3' | 'Q4',
      revenue,
      growth: `${growth.toFixed(1)}%`
    };
  });
};

// Calculate segment revenue totals from monthly data
export const calculateSegmentProjections = (
  monthlyData: MonthlyRevenueData[]
): SegmentProjection[] => {
  // Initialize segment totals
  const segmentTotals = {
    Enterprise: 0,
    'Mid-Market': 0,
    SMB: 0
  };

  // Previous year's segment values (for growth calculation)
  // These could be stored elsewhere or calculated differently in a real app
  const previousYearSegments = {
    Enterprise: 607600,
    'Mid-Market': 393800,
    SMB: 278800
  };

  // Calculate segment totals across all products
  monthlyData.forEach(month => {
    month.products.forEach(product => {
      segmentTotals.Enterprise += calculateSegmentTotalRevenue(product.enterprise);
      segmentTotals['Mid-Market'] += calculateSegmentTotalRevenue(product.midMarket);
      segmentTotals.SMB += calculateSegmentTotalRevenue(product.smb);
    });
  });

  // Calculate total revenue
  const totalRevenue = 
    segmentTotals.Enterprise + 
    segmentTotals['Mid-Market'] + 
    segmentTotals.SMB;

  // Calculate growth and percentage
  return Object.entries(segmentTotals).map(([segment, revenue]) => {
    const prevRevenue = previousYearSegments[segment as keyof typeof previousYearSegments];
    const growth = prevRevenue ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;
    const percentage = (revenue / totalRevenue) * 100;

    return {
      segment,
      revenue,
      growth: `${growth.toFixed(1)}%`,
      percentage: `${percentage.toFixed(1)}%`
    };
  });
};
