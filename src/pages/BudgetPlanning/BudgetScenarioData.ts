
import { BudgetScenario } from "@/types/budgetScenarios";
import { budgetData, COLORS, getTotalBudget } from "./BudgetData";

// Base case is our current budget
const baseCaseBudget = getTotalBudget();

// Financial metrics for scenarios
const baseRevenue = 1250000;
const baseOpex = 950000;
// Calculate gross profit (typically revenue - COGS, but we'll use a simple calculation here)
const baseGrossProfit = baseRevenue * 0.7; // Assuming 70% gross margin
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
        grossProfit: baseGrossProfit,
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
        grossProfit: Math.round(baseRevenue * 0.80 * 0.65), // Lower gross margin in worst case
        profit: Math.round(baseRevenue * 0.80 - baseOpex * 0.90)
      },
      color: "#FEC6A1" // Subtle Mustard (was Red)
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
      color: "#4DC1CB" // Corporate Green (teal/turquoise from screenshot)
    }
  ];
};

// Get a single scenario by ID
export const getScenarioById = (id: string): BudgetScenario | undefined => {
  return getBudgetScenarios().find(scenario => scenario.id === id);
};
