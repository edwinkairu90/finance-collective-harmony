
import { Department } from "./budget";

export type BudgetScenarioType = "base-case" | "worst-case" | "best-case";

export interface BudgetScenario {
  id: BudgetScenarioType;
  name: string;
  description: string;
  totalBudget: number;
  departments: {
    id: string;
    name: string;
    budget: number;
  }[];
  financials: {
    revenue: number;
    opex: number;
    profit: number;
  };
  color: string;
}
