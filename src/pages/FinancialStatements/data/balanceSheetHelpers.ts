
import { BalanceSheetQuarterData } from "../types/balanceSheetTypes";
import { balanceSheetByQuarter } from "./balanceSheetSampleData";

// Get last 4 quarters data
export const getLastFourQuarters = (): BalanceSheetQuarterData[] => {
  const lastFourQuarters = ["q1-2024", "q4-2023", "q3-2023", "q2-2023"];
  return lastFourQuarters.map(q => balanceSheetByQuarter[q]);
};
