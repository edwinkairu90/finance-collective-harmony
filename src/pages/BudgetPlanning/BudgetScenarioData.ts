
import { BudgetScenario } from "@/types/budgetScenarios";
import { budgetData, COLORS, getTotalBudget } from "./BudgetData";

// Base case is our current budget
const baseCaseBudget = getTotalBudget();

// Financial metrics for scenarios
const baseRevenue = 1250000;
const baseOpex = 950000;
const baseProfit = baseRevenue - baseOpex;

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
        profit: baseProfit
      },
      color: "#3498db" // Blue
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
        profit: Math.round(baseRevenue * 0.80 - baseOpex * 0.90)
      },
      color: "#e74c3c" // Red
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
        profit: Math.round(baseRevenue * 1.15 - baseOpex * 1.05)
      },
      color: "#2ecc71" // Green
    }
  ];
};

// Get a single scenario by ID
export const getScenarioById = (id: string): BudgetScenario | undefined => {
  return getBudgetScenarios().find(scenario => scenario.id === id);
};
