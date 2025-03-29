
import { BalanceSheetData } from "../types/balanceSheetTypes";

// Sample quarterly Balance Sheet data
export const balanceSheetByQuarter: BalanceSheetData = {
  "q1-2024": {
    title: "Q1 2024",
    date: "March 31, 2024",
    assets: {
      current: [
        { item: "Cash and Cash Equivalents", amount: 850000 },
        { item: "Short-term Investments", amount: 250000 },
        { item: "Accounts Receivable", amount: 420000 },
        { item: "Inventory", amount: 360000 },
        { item: "Prepaid Expenses", amount: 85000 },
      ],
      nonCurrent: [
        { item: "Property, Plant & Equipment", amount: 1200000 },
        { item: "Intangible Assets", amount: 450000 },
        { item: "Long-term Investments", amount: 750000 },
      ]
    },
    liabilities: {
      current: [
        { item: "Accounts Payable", amount: 320000 },
        { item: "Short-term Debt", amount: 150000 },
        { item: "Accrued Expenses", amount: 95000 },
        { item: "Deferred Revenue", amount: 120000 },
      ],
      nonCurrent: [
        { item: "Long-term Debt", amount: 850000 },
        { item: "Lease Obligations", amount: 420000 },
        { item: "Deferred Tax Liabilities", amount: 175000 },
      ]
    },
    equity: [
      { item: "Common Stock", amount: 1000000 },
      { item: "Retained Earnings", amount: 1235000 },
    ]
  },
  "q4-2023": {
    title: "Q4 2023",
    date: "December 31, 2023",
    assets: {
      current: [
        { item: "Cash and Cash Equivalents", amount: 780000 },
        { item: "Short-term Investments", amount: 230000 },
        { item: "Accounts Receivable", amount: 400000 },
        { item: "Inventory", amount: 350000 },
        { item: "Prepaid Expenses", amount: 80000 },
      ],
      nonCurrent: [
        { item: "Property, Plant & Equipment", amount: 1180000 },
        { item: "Intangible Assets", amount: 440000 },
        { item: "Long-term Investments", amount: 720000 },
      ]
    },
    liabilities: {
      current: [
        { item: "Accounts Payable", amount: 300000 },
        { item: "Short-term Debt", amount: 140000 },
        { item: "Accrued Expenses", amount: 90000 },
        { item: "Deferred Revenue", amount: 110000 },
      ],
      nonCurrent: [
        { item: "Long-term Debt", amount: 830000 },
        { item: "Lease Obligations", amount: 410000 },
        { item: "Deferred Tax Liabilities", amount: 170000 },
      ]
    },
    equity: [
      { item: "Common Stock", amount: 1000000 },
      { item: "Retained Earnings", amount: 1130000 },
    ]
  },
  "q3-2023": {
    title: "Q3 2023",
    date: "September 30, 2023",
    assets: {
      current: [
        { item: "Cash and Cash Equivalents", amount: 750000 },
        { item: "Short-term Investments", amount: 210000 },
        { item: "Accounts Receivable", amount: 380000 },
        { item: "Inventory", amount: 340000 },
        { item: "Prepaid Expenses", amount: 75000 },
      ],
      nonCurrent: [
        { item: "Property, Plant & Equipment", amount: 1160000 },
        { item: "Intangible Assets", amount: 430000 },
        { item: "Long-term Investments", amount: 700000 },
      ]
    },
    liabilities: {
      current: [
        { item: "Accounts Payable", amount: 290000 },
        { item: "Short-term Debt", amount: 130000 },
        { item: "Accrued Expenses", amount: 85000 },
        { item: "Deferred Revenue", amount: 105000 },
      ],
      nonCurrent: [
        { item: "Long-term Debt", amount: 820000 },
        { item: "Lease Obligations", amount: 400000 },
        { item: "Deferred Tax Liabilities", amount: 165000 },
      ]
    },
    equity: [
      { item: "Common Stock", amount: 1000000 },
      { item: "Retained Earnings", amount: 1050000 },
    ]
  },
  "q2-2023": {
    title: "Q2 2023",
    date: "June 30, 2023",
    assets: {
      current: [
        { item: "Cash and Cash Equivalents", amount: 720000 },
        { item: "Short-term Investments", amount: 200000 },
        { item: "Accounts Receivable", amount: 360000 },
        { item: "Inventory", amount: 330000 },
        { item: "Prepaid Expenses", amount: 70000 },
      ],
      nonCurrent: [
        { item: "Property, Plant & Equipment", amount: 1140000 },
        { item: "Intangible Assets", amount: 420000 },
        { item: "Long-term Investments", amount: 680000 },
      ]
    },
    liabilities: {
      current: [
        { item: "Accounts Payable", amount: 280000 },
        { item: "Short-term Debt", amount: 120000 },
        { item: "Accrued Expenses", amount: 80000 },
        { item: "Deferred Revenue", amount: 100000 },
      ],
      nonCurrent: [
        { item: "Long-term Debt", amount: 810000 },
        { item: "Lease Obligations", amount: 390000 },
        { item: "Deferred Tax Liabilities", amount: 160000 },
      ]
    },
    equity: [
      { item: "Common Stock", amount: 1000000 },
      { item: "Retained Earnings", amount: 980000 },
    ]
  },
  "q1-2023": {
    title: "Q1 2023",
    date: "March 31, 2023",
    assets: {
      current: [
        { item: "Cash and Cash Equivalents", amount: 680000 },
        { item: "Short-term Investments", amount: 180000 },
        { item: "Accounts Receivable", amount: 340000 },
        { item: "Inventory", amount: 320000 },
        { item: "Prepaid Expenses", amount: 65000 },
      ],
      nonCurrent: [
        { item: "Property, Plant & Equipment", amount: 1120000 },
        { item: "Intangible Assets", amount: 410000 },
        { item: "Long-term Investments", amount: 650000 },
      ]
    },
    liabilities: {
      current: [
        { item: "Accounts Payable", amount: 270000 },
        { item: "Short-term Debt", amount: 110000 },
        { item: "Accrued Expenses", amount: 75000 },
        { item: "Deferred Revenue", amount: 95000 },
      ],
      nonCurrent: [
        { item: "Long-term Debt", amount: 800000 },
        { item: "Lease Obligations", amount: 380000 },
        { item: "Deferred Tax Liabilities", amount: 155000 },
      ]
    },
    equity: [
      { item: "Common Stock", amount: 1000000 },
      { item: "Retained Earnings", amount: 880000 },
    ]
  }
};
