
export interface CashflowItem {
  item: string;
  amount: number;
}

export interface CashflowQuarterData {
  title: string;
  date: string;
  operating: CashflowItem[];
  investing: CashflowItem[];
  financing: CashflowItem[];
}

export interface CashflowData {
  [key: string]: CashflowQuarterData;
}

// Sample cash flow data by quarter
const cashflowByQuarter: CashflowData = {
  'q1-2024': {
    title: 'Q1 2024',
    date: 'Jan-Mar 2024',
    operating: [
      { item: 'Net Income', amount: 325000 },
      { item: 'Depreciation and Amortization', amount: 85000 },
      { item: 'Changes in Working Capital', amount: -42000 },
      { item: 'Accounts Receivable', amount: -56000 },
      { item: 'Inventory', amount: -28000 },
      { item: 'Accounts Payable', amount: 34000 }
    ],
    investing: [
      { item: 'Purchase of Property and Equipment', amount: -120000 },
      { item: 'Sale of Equipment', amount: 15000 },
      { item: 'Purchase of Investments', amount: -85000 },
      { item: 'Sale of Investments', amount: 25000 }
    ],
    financing: [
      { item: 'Proceeds from Long-term Debt', amount: 150000 },
      { item: 'Repayment of Long-term Debt', amount: -85000 },
      { item: 'Dividend Payments', amount: -95000 },
      { item: 'Stock Repurchase', amount: -75000 }
    ]
  },
  'q4-2023': {
    title: 'Q4 2023',
    date: 'Oct-Dec 2023',
    operating: [
      { item: 'Net Income', amount: 305000 },
      { item: 'Depreciation and Amortization', amount: 82000 },
      { item: 'Changes in Working Capital', amount: -36000 },
      { item: 'Accounts Receivable', amount: -48000 },
      { item: 'Inventory', amount: -24000 },
      { item: 'Accounts Payable', amount: 30000 }
    ],
    investing: [
      { item: 'Purchase of Property and Equipment', amount: -110000 },
      { item: 'Sale of Equipment', amount: 12000 },
      { item: 'Purchase of Investments', amount: -75000 },
      { item: 'Sale of Investments', amount: 20000 }
    ],
    financing: [
      { item: 'Proceeds from Long-term Debt', amount: 125000 },
      { item: 'Repayment of Long-term Debt', amount: -75000 },
      { item: 'Dividend Payments', amount: -90000 },
      { item: 'Stock Repurchase', amount: -65000 }
    ]
  },
  'q3-2023': {
    title: 'Q3 2023',
    date: 'Jul-Sep 2023',
    operating: [
      { item: 'Net Income', amount: 295000 },
      { item: 'Depreciation and Amortization', amount: 80000 },
      { item: 'Changes in Working Capital', amount: -35000 },
      { item: 'Accounts Receivable', amount: -50000 },
      { item: 'Inventory', amount: -26000 },
      { item: 'Accounts Payable', amount: 28000 }
    ],
    investing: [
      { item: 'Purchase of Property and Equipment', amount: -105000 },
      { item: 'Sale of Equipment', amount: 10000 },
      { item: 'Purchase of Investments', amount: -72000 },
      { item: 'Sale of Investments', amount: 18000 }
    ],
    financing: [
      { item: 'Proceeds from Long-term Debt', amount: 120000 },
      { item: 'Repayment of Long-term Debt', amount: -72000 },
      { item: 'Dividend Payments', amount: -85000 },
      { item: 'Stock Repurchase', amount: -62000 }
    ]
  },
  'q2-2023': {
    title: 'Q2 2023',
    date: 'Apr-Jun 2023',
    operating: [
      { item: 'Net Income', amount: 285000 },
      { item: 'Depreciation and Amortization', amount: 78000 },
      { item: 'Changes in Working Capital', amount: -30000 },
      { item: 'Accounts Receivable', amount: -45000 },
      { item: 'Inventory', amount: -22000 },
      { item: 'Accounts Payable', amount: 25000 }
    ],
    investing: [
      { item: 'Purchase of Property and Equipment', amount: -100000 },
      { item: 'Sale of Equipment', amount: 8000 },
      { item: 'Purchase of Investments', amount: -68000 },
      { item: 'Sale of Investments', amount: 15000 }
    ],
    financing: [
      { item: 'Proceeds from Long-term Debt', amount: 110000 },
      { item: 'Repayment of Long-term Debt', amount: -68000 },
      { item: 'Dividend Payments', amount: -80000 },
      { item: 'Stock Repurchase', amount: -58000 }
    ]
  }
};

// Helper function to get last 4 quarters of data
export const getLastFourQuarters = (): CashflowQuarterData[] => {
  const lastFourQuarters = ["q1-2024", "q4-2023", "q3-2023", "q2-2023"];
  return lastFourQuarters.map(q => cashflowByQuarter[q]);
};

// Generate dummy data for monthly view
export const getMonthsForYear = (year: number): CashflowQuarterData[] => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get sample data structure from Q1 2024
  const sampleData = cashflowByQuarter['q1-2024'];
  
  // Return array of monthly data with slightly varying numbers
  return months.map((month, index) => {
    const variationFactor = 0.90 + (index * 0.02); // Gradual growth throughout the year
    
    return {
      title: month,
      date: `${month} ${year}`,
      operating: sampleData.operating.map(item => ({
        item: item.item,
        amount: Math.round(item.amount * variationFactor * (0.9 + Math.random() * 0.2))
      })),
      investing: sampleData.investing.map(item => ({
        item: item.item,
        amount: Math.round(item.amount * variationFactor * (0.9 + Math.random() * 0.2))
      })),
      financing: sampleData.financing.map(item => ({
        item: item.item,
        amount: Math.round(item.amount * variationFactor * (0.9 + Math.random() * 0.2))
      }))
    };
  }).reverse(); // Latest month first
};
