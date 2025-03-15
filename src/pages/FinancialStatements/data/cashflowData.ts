
// Type for a Cash Flow item
export interface CashflowItem {
  item: string;
  amount: number;
}

// Type for quarterly cash flow data
export interface CashflowQuarterData {
  title: string;
  endDate: string;
  operating: CashflowItem[];
  investing: CashflowItem[];
  financing: CashflowItem[];
}

// Type for cash flow data by quarter
export interface CashflowData {
  [key: string]: CashflowQuarterData;
}

// Sample quarterly Cash Flow data
export const cashflowByQuarter: CashflowData = {
  "q1-2024": {
    title: "Q1 2024",
    endDate: "March 31, 2024",
    operating: [
      { item: "Net Income", amount: 820000 },
      { item: "Depreciation and Amortization", amount: 125000 },
      { item: "Increase in Accounts Receivable", amount: -65000 },
      { item: "Decrease in Inventory", amount: 42000 },
      { item: "Increase in Accounts Payable", amount: 35000 },
      { item: "Decrease in Accrued Expenses", amount: -18000 },
    ],
    investing: [
      { item: "Purchase of Property and Equipment", amount: -250000 },
      { item: "Purchase of Investments", amount: -180000 },
      { item: "Sale of Investments", amount: 95000 },
    ],
    financing: [
      { item: "Proceeds from Issuance of Debt", amount: 300000 },
      { item: "Repayment of Debt", amount: -150000 },
      { item: "Dividends Paid", amount: -120000 },
      { item: "Repurchase of Common Stock", amount: -75000 },
    ]
  },
  "q4-2023": {
    title: "Q4 2023",
    endDate: "December 31, 2023",
    operating: [
      { item: "Net Income", amount: 780000 },
      { item: "Depreciation and Amortization", amount: 120000 },
      { item: "Increase in Accounts Receivable", amount: -60000 },
      { item: "Decrease in Inventory", amount: 38000 },
      { item: "Increase in Accounts Payable", amount: 32000 },
      { item: "Decrease in Accrued Expenses", amount: -16000 },
    ],
    investing: [
      { item: "Purchase of Property and Equipment", amount: -230000 },
      { item: "Purchase of Investments", amount: -170000 },
      { item: "Sale of Investments", amount: 85000 },
    ],
    financing: [
      { item: "Proceeds from Issuance of Debt", amount: 280000 },
      { item: "Repayment of Debt", amount: -140000 },
      { item: "Dividends Paid", amount: -110000 },
      { item: "Repurchase of Common Stock", amount: -70000 },
    ]
  },
  "q3-2023": {
    title: "Q3 2023",
    endDate: "September 30, 2023",
    operating: [
      { item: "Net Income", amount: 740000 },
      { item: "Depreciation and Amortization", amount: 115000 },
      { item: "Increase in Accounts Receivable", amount: -55000 },
      { item: "Decrease in Inventory", amount: 35000 },
      { item: "Increase in Accounts Payable", amount: 30000 },
      { item: "Decrease in Accrued Expenses", amount: -14000 },
    ],
    investing: [
      { item: "Purchase of Property and Equipment", amount: -220000 },
      { item: "Purchase of Investments", amount: -160000 },
      { item: "Sale of Investments", amount: 80000 },
    ],
    financing: [
      { item: "Proceeds from Issuance of Debt", amount: 260000 },
      { item: "Repayment of Debt", amount: -130000 },
      { item: "Dividends Paid", amount: -100000 },
      { item: "Repurchase of Common Stock", amount: -65000 },
    ]
  },
  "q2-2023": {
    title: "Q2 2023",
    endDate: "June 30, 2023",
    operating: [
      { item: "Net Income", amount: 700000 },
      { item: "Depreciation and Amortization", amount: 110000 },
      { item: "Increase in Accounts Receivable", amount: -50000 },
      { item: "Decrease in Inventory", amount: 32000 },
      { item: "Increase in Accounts Payable", amount: 28000 },
      { item: "Decrease in Accrued Expenses", amount: -12000 },
    ],
    investing: [
      { item: "Purchase of Property and Equipment", amount: -210000 },
      { item: "Purchase of Investments", amount: -150000 },
      { item: "Sale of Investments", amount: 75000 },
    ],
    financing: [
      { item: "Proceeds from Issuance of Debt", amount: 240000 },
      { item: "Repayment of Debt", amount: -120000 },
      { item: "Dividends Paid", amount: -90000 },
      { item: "Repurchase of Common Stock", amount: -60000 },
    ]
  },
  "q1-2023": {
    title: "Q1 2023",
    endDate: "March 31, 2023",
    operating: [
      { item: "Net Income", amount: 660000 },
      { item: "Depreciation and Amortization", amount: 105000 },
      { item: "Increase in Accounts Receivable", amount: -45000 },
      { item: "Decrease in Inventory", amount: 30000 },
      { item: "Increase in Accounts Payable", amount: 25000 },
      { item: "Decrease in Accrued Expenses", amount: -10000 },
    ],
    investing: [
      { item: "Purchase of Property and Equipment", amount: -200000 },
      { item: "Purchase of Investments", amount: -140000 },
      { item: "Sale of Investments", amount: 70000 },
    ],
    financing: [
      { item: "Proceeds from Issuance of Debt", amount: 220000 },
      { item: "Repayment of Debt", amount: -110000 },
      { item: "Dividends Paid", amount: -80000 },
      { item: "Repurchase of Common Stock", amount: -55000 },
    ]
  }
};

// Get last 4 quarters data
export const getLastFourQuarters = (): CashflowQuarterData[] => {
  const lastFourQuarters = ["q1-2024", "q4-2023", "q3-2023", "q2-2023"];
  return lastFourQuarters.map(q => cashflowByQuarter[q]);
};
