
export type ScenarioType = "expansion" | "product-launch" | "cost-reduction" | "custom";

export interface ScenarioItem {
  id: string;
  name: string;
  type: ScenarioType;
  description: string;
  timeline: string;
  assumptions: string[];
  budgetImpact: {
    revenue: number;
    expenses: number;
    profit: number;
  };
  departments: {
    name: string;
    budgetChange: number;
  }[];
  status: "draft" | "in-review" | "approved" | "rejected";
  createdBy: string;
  createdAt: string;
}

export interface ScenarioTemplate {
  id: string;
  name: string;
  type: ScenarioType;
  description: string;
  defaultAssumptions: string[];
}
