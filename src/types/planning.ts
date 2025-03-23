
export interface LineItem {
  name: string;
  amount: number;
}

export interface DepartmentBudget {
  budget: number;
  headcount: number;
}

export interface ScenarioItem {
  id: string;
  name: string;
  description: string;
  budgetImpact: {
    revenue: number;
    costOfSales?: number;
    grossProfit?: number;
    expenses: number;
    profit: number;
    totalBudget?: number;
    departments?: Record<string, DepartmentBudget>;
  };
  lineItems?: {
    revenue?: LineItem[];
    costOfSales?: LineItem[];
    expenses?: LineItem[];
    departments?: Record<string, LineItem[]>;
  };
  assumptions?: string[];
  risks?: string[];
  opportunities?: string[];
}

export interface BudgetScenario {
  id: string;
  name: string;
  description: string;
  year: number;
  baselineId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
