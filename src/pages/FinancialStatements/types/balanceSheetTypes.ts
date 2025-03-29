
// Type for a Balance Sheet item
export interface BalanceSheetItem {
  item: string;
  amount: number;
}

// Type for quarterly balance sheet data
export interface BalanceSheetQuarterData {
  title: string;
  date: string;
  assets: {
    current: BalanceSheetItem[];
    nonCurrent: BalanceSheetItem[];
  };
  liabilities: {
    current: BalanceSheetItem[];
    nonCurrent: BalanceSheetItem[];
  };
  equity: BalanceSheetItem[];
}

// Type for balance sheet data by quarter
export interface BalanceSheetData {
  [key: string]: BalanceSheetQuarterData;
}
