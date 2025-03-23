
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
    grossProfit: number;
    profit: number;
  };
  color: string;
  factors: ScenarioFactor[];
  assumptions: string[];
}

export interface ScenarioFactor {
  id: string;
  name: string;
  impact: number; // percentage impact on budget (-15 to +15)
  description: string;
}
