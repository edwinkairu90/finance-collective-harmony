
import { useState, useEffect } from "react";

// Mock data types
interface BudgetItem {
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

interface VarianceItem {
  item: string;
  department: string;
  budget: number;
  actual: number;
  variance: number;
  explanation: string;
}

interface Period {
  id: string;
  name: string;
}

export const useActualsData = () => {
  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', budget: 84000, actual: 85400, variance: 1400 },
    { name: 'Feb', budget: 86000, actual: 83200, variance: -2800 },
    { name: 'Mar', budget: 89000, actual: 87500, variance: -1500 },
    { name: 'Apr', budget: 88000, actual: 90200, variance: 2200 },
    { name: 'May', budget: 90000, actual: 93100, variance: 3100 },
    { name: 'Jun', budget: 94000, actual: 91800, variance: -2200 },
    { name: 'Jul', budget: 96000, actual: 95400, variance: -600 },
    { name: 'Aug', budget: 96000, actual: 97200, variance: 1200 },
  ];

  const departmentData = [
    { name: 'Sales', budget: 320000, actual: 335000, variance: 15000 },
    { name: 'Marketing', budget: 250000, actual: 245000, variance: -5000 },
    { name: 'Engineering', budget: 420000, actual: 428000, variance: 8000 },
    { name: 'Support', budget: 180000, actual: 175000, variance: -5000 },
    { name: 'HR', budget: 95000, actual: 93000, variance: -2000 },
    { name: 'Finance', budget: 110000, actual: 108000, variance: -2000 },
  ];

  const expenseCategories = [
    { name: 'Salaries', budget: 650000, actual: 648000, variance: -2000 },
    { name: 'Marketing', budget: 250000, actual: 245000, variance: -5000 },
    { name: 'Operations', budget: 180000, actual: 183000, variance: 3000 },
    { name: 'Technology', budget: 120000, actual: 125000, variance: 5000 },
    { name: 'Other', budget: 48000, actual: 45500, variance: -2500 },
  ];

  const overBudgetItems = [
    {
      item: 'Sales Compensation',
      department: 'Sales',
      budget: 180000,
      actual: 196000,
      variance: 16000,
      explanation: 'Higher sales commissions due to exceeding targets'
    },
    {
      item: 'Cloud Hosting',
      department: 'Engineering',
      budget: 58000,
      actual: 68000,
      variance: 10000,
      explanation: 'Increased usage due to customer growth'
    },
    {
      item: 'Recruitment',
      department: 'HR',
      budget: 25000,
      actual: 32000,
      variance: 7000,
      explanation: 'Expanded hiring efforts for engineering team'
    },
  ];

  const underBudgetItems = [
    {
      item: 'Content Marketing',
      department: 'Marketing',
      budget: 45000,
      actual: 38000,
      variance: 7000,
      explanation: 'Delayed content campaigns pending strategy review'
    },
    {
      item: 'Office Supplies',
      department: 'Operations',
      budget: 12000,
      actual: 7500,
      variance: 4500,
      explanation: 'Continued remote work reduced office supply needs'
    },
    {
      item: 'Training & Development',
      department: 'HR',
      budget: 18000,
      actual: 14000,
      variance: 4000,
      explanation: 'Shift to lower-cost online training options'
    },
  ];

  const departments = ["Sales", "Marketing", "Engineering", "Support", "HR", "Finance"];
  const periods = [
    { id: "ytd", name: "Year-to-Date" },
    { id: "q1", name: "Q1 2023" },
    { id: "q2", name: "Q2 2023" },
    { id: "q3", name: "Q3 2023" },
    { id: "q4", name: "Q4 2023" },
    { id: "custom", name: "Custom Range" }
  ];
  
  // Calculate summary data
  const totalBudget = 723000;
  const totalActual = 720300;
  const variance = totalActual - totalBudget;
  const accuracy = (totalActual / totalBudget) * 100;

  return {
    monthlyData,
    departmentData,
    expenseCategories,
    overBudgetItems,
    underBudgetItems,
    totalBudget,
    totalActual,
    variance,
    accuracy,
    departments,
    periods
  };
};
