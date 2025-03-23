
import { BudgetScenario, ScenarioFactor } from "@/types/budgetScenarios";
import { budgetData, COLORS, getTotalBudget } from "./BudgetData";

// Base case is our current budget
const baseCaseBudget = getTotalBudget();

// Financial metrics for scenarios
const baseRevenue = 1250000;
const baseOpex = 950000;
// Calculate gross profit (typically revenue - COGS, but we'll use a simple calculation here)
const baseGrossProfit = baseRevenue * 0.7; // Assuming 70% gross margin
const baseProfit = baseRevenue - baseOpex;

// Common factors affecting budget scenarios
const scenarioFactors: Record<string, ScenarioFactor[]> = {
  "base-case": [
    {
      id: "inflation",
      name: "Inflation Rate",
      impact: 2.5,
      description: "Annual inflation rate affecting costs"
    },
    {
      id: "growth",
      name: "Market Growth",
      impact: 3.0,
      description: "Expected organic market growth"
    },
    {
      id: "interest",
      name: "Interest Rates",
      impact: 0,
      description: "Federal interest rate impact on financing costs"
    }
  ],
  "worst-case": [
    {
      id: "inflation",
      name: "Inflation Rate",
      impact: 5.0,
      description: "Higher inflation scenario"
    },
    {
      id: "growth",
      name: "Market Growth",
      impact: -2.0,
      description: "Market contraction scenario"
    },
    {
      id: "interest",
      name: "Interest Rates",
      impact: -3.0,
      description: "Rising interest rates"
    },
    {
      id: "recession",
      name: "Recession Impact",
      impact: -5.0,
      description: "Economic downturn effects"
    }
  ],
  "best-case": [
    {
      id: "inflation",
      name: "Inflation Rate",
      impact: 1.5,
      description: "Lower inflation scenario"
    },
    {
      id: "growth",
      name: "Market Growth",
      impact: 6.0,
      description: "Optimistic market expansion"
    },
    {
      id: "interest",
      name: "Interest Rates",
      impact: 1.0,
      description: "Favorable financing conditions"
    },
    {
      id: "expansion",
      name: "New Market Entry",
      impact: 4.0,
      description: "Successful expansion to new markets"
    }
  ]
};

// Assumptions for each scenario
const scenarioAssumptions: Record<string, string[]> = {
  "base-case": [
    "Customer retention rate remains stable at 85%",
    "Sales team achieves 90% of targets",
    "No major regulatory changes",
    "Vendor costs increase in line with inflation"
  ],
  "worst-case": [
    "Customer retention drops to 75%",
    "Sales team achieves only 70% of targets",
    "New regulatory compliance costs increase by 10%",
    "Supply chain disruptions increase vendor costs by 12%",
    "Hiring freeze implemented",
    "Marketing budget reduced by 20%"
  ],
  "best-case": [
    "Customer retention improves to 92%",
    "Sales team exceeds targets by 10%",
    "New product line launches successfully",
    "Strategic partnerships reduce vendor costs by 5%",
    "New talent acquisition increases productivity by 8%"
  ]
};

// Generate scenario data based on the current budget data
export const getBudgetScenarios = (): BudgetScenario[] => {
  return [
    {
      id: "base-case",
      name: "Base Case",
      description: "Our expected budget based on current projections",
      totalBudget: baseCaseBudget,
      departments: budgetData.map(item => ({
        id: item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        budget: item.value
      })),
      financials: {
        revenue: baseRevenue,
        opex: baseOpex,
        grossProfit: baseGrossProfit,
        profit: baseProfit
      },
      color: "#3498db", // Blue
      factors: scenarioFactors["base-case"],
      assumptions: scenarioAssumptions["base-case"]
    },
    {
      id: "worst-case",
      name: "Worst Case",
      description: "Conservative budget with 15% reduction in funding",
      totalBudget: Math.round(baseCaseBudget * 0.85),
      departments: budgetData.map(item => ({
        id: item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        budget: Math.round(item.value * 0.85)
      })),
      financials: {
        revenue: Math.round(baseRevenue * 0.80), // 20% less revenue
        opex: Math.round(baseOpex * 0.90),       // 10% less opex
        grossProfit: Math.round(baseRevenue * 0.80 * 0.65), // Lower gross margin in worst case
        profit: Math.round(baseRevenue * 0.80 - baseOpex * 0.90)
      },
      color: "#FEC6A1", // Subtle Mustard (was Red)
      factors: scenarioFactors["worst-case"],
      assumptions: scenarioAssumptions["worst-case"]
    },
    {
      id: "best-case",
      name: "Best Case",
      description: "Optimistic budget with 10% increase in funding",
      totalBudget: Math.round(baseCaseBudget * 1.10),
      departments: budgetData.map(item => ({
        id: item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        budget: Math.round(item.value * 1.10)
      })),
      financials: {
        revenue: Math.round(baseRevenue * 1.15), // 15% more revenue
        opex: Math.round(baseOpex * 1.05),       // 5% more opex
        grossProfit: Math.round(baseRevenue * 1.15 * 0.75), // Better gross margin in best case
        profit: Math.round(baseRevenue * 1.15 - baseOpex * 1.05)
      },
      color: "#4DC1CB", // Corporate Green (teal/turquoise from screenshot)
      factors: scenarioFactors["best-case"],
      assumptions: scenarioAssumptions["best-case"]
    }
  ];
};

// Get a single scenario by ID
export const getScenarioById = (id: string): BudgetScenario | undefined => {
  return getBudgetScenarios().find(scenario => scenario.id === id);
};

// Update scenario factors
export const updateScenarioFactors = (
  scenarioId: BudgetScenarioType, 
  updatedFactors: ScenarioFactor[]
): BudgetScenario | undefined => {
  const scenarios = getBudgetScenarios();
  const scenarioIndex = scenarios.findIndex(s => s.id === scenarioId);
  
  if (scenarioIndex === -1) return undefined;
  
  // In a real app, this would update a database
  // Since we're using static data, we'll just return the modified scenario
  const updatedScenario = {
    ...scenarios[scenarioIndex],
    factors: updatedFactors
  };
  
  return updatedScenario;
};

// Update scenario assumptions
export const updateScenarioAssumptions = (
  scenarioId: BudgetScenarioType, 
  updatedAssumptions: string[]
): BudgetScenario | undefined => {
  const scenarios = getBudgetScenarios();
  const scenarioIndex = scenarios.findIndex(s => s.id === scenarioId);
  
  if (scenarioIndex === -1) return undefined;
  
  // In a real app, this would update a database
  // Since we're using static data, we'll just return the modified scenario
  const updatedScenario = {
    ...scenarios[scenarioIndex],
    assumptions: updatedAssumptions
  };
  
  return updatedScenario;
};
