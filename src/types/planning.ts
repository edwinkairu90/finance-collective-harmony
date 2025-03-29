
export interface LineItem {
  name: string;
  amount: number;
}

export interface DepartmentBudget {
  budget: number;
  headcount: number;
}

export interface DepartmentItem {
  name: string;
  budgetChange: number;
}

export interface ScenarioItem {
  id: string;
  name: string;
  description: string;
  type?: string; // Added type property
  timeline?: string; // Added timeline property
  status?: string; // Added status property
  createdBy?: string; // Added createdBy property
  createdAt?: string; // Added createdAt property
  departments?: DepartmentItem[]; // Added departments array
  assumptions?: string[]; // Added assumptions array
  risks?: string[];
  opportunities?: string[];
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

export interface ScenarioTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  defaultAssumptions: string[];
}
