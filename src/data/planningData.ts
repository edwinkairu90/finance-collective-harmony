
import { ScenarioItem, ScenarioTemplate } from "../types/planning";

export const scenarioTemplates: ScenarioTemplate[] = [
  {
    id: "expansion-template",
    name: "Market Expansion",
    type: "expansion",
    description: "Model the financial impact of expanding to a new geographic market",
    defaultAssumptions: [
      "New market will require 6 months to break even",
      "Marketing costs will increase by 30% in the first year",
      "Sales team will need to grow by 15%",
      "Initial setup costs include office space and local compliance"
    ]
  },
  {
    id: "product-launch-template",
    name: "New Product Launch",
    type: "product-launch",
    description: "Plan the budget for launching a new product or service",
    defaultAssumptions: [
      "R&D costs will be front-loaded in the first quarter",
      "Marketing campaign will run for 3 months post-launch",
      "Production costs will decrease by 10% after first 6 months",
      "Customer acquisition cost will be 20% higher than existing products"
    ]
  },
  {
    id: "cost-reduction-template",
    name: "Cost Reduction Initiative",
    type: "cost-reduction",
    description: "Model potential savings from cost-cutting measures",
    defaultAssumptions: [
      "One-time restructuring costs in the first quarter",
      "Operational savings will be realized starting in month 3",
      "Technology investments will have 18-month payback period",
      "Training costs for new processes in first 2 months"
    ]
  }
];

export const sampleScenarios: ScenarioItem[] = [
  {
    id: "expansion-asia-2025",
    name: "Asia Market Expansion 2025",
    type: "expansion",
    description: "Financial model for expanding operations into Southeast Asian markets",
    timeline: "Q3 2025 - Q4 2026",
    assumptions: [
      "New office in Singapore as regional headquarters",
      "Local hiring of 25 employees in first year",
      "Marketing budget increase of $450,000",
      "Regulatory compliance costs of $120,000",
      "Expected revenue from new market: $1.2M in first year"
    ],
    budgetImpact: {
      revenue: 1200000,
      expenses: 950000,
      profit: 250000
    },
    departments: [
      { name: "Sales", budgetChange: 320000 },
      { name: "Marketing", budgetChange: 450000 },
      { name: "Operations", budgetChange: 180000 }
    ],
    status: "in-review",
    createdBy: "Lisa Geller",
    createdAt: "2025-07-15"
  },
  {
    id: "saas-product-2025",
    name: "Enterprise SaaS Product Launch",
    type: "product-launch",
    description: "Budget plan for launching our new enterprise software solution",
    timeline: "Q4 2025 - Q2 2026",
    assumptions: [
      "6-month development cycle remaining",
      "Beta program with 10 enterprise customers",
      "Initial pricing at $1,200/month per customer",
      "Expected 50 customers by end of Q2 2026",
      "Customer acquisition cost of $8,000 per enterprise customer"
    ],
    budgetImpact: {
      revenue: 360000,
      expenses: 620000,
      profit: -260000
    },
    departments: [
      { name: "Engineering", budgetChange: 320000 },
      { name: "Marketing", budgetChange: 180000 },
      { name: "Sales", budgetChange: 120000 }
    ],
    status: "draft",
    createdBy: "Robert Kim",
    createdAt: "2025-06-23"
  }
];
