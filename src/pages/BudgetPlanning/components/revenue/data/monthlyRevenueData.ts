
import { MonthlyRevenueData } from "../types/revenueTypes";
import { Q1RevenueData } from "./quarters/Q1Data";
import { Q2RevenueData } from "./quarters/Q2Data";
import { Q3RevenueData } from "./quarters/Q3Data";
import { Q4RevenueData } from "./quarters/Q4Data";

// Combine all quarterly data into the complete monthly dataset
export const initialMonthlyRevenueDrivers: MonthlyRevenueData[] = [
  ...Q1RevenueData,
  ...Q2RevenueData,
  ...Q3RevenueData,
  ...Q4RevenueData
];
