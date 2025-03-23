
import { BudgetScenario } from "@/types/budgetScenarios";
import { budgetData, COLORS, getTotalBudget } from "./BudgetData";

// Base case is our current budget
const baseCaseBudget = getTotalBudget();

// Generate scenario data based on the current budget data
export const getBudgetScenarios = (): BudgetScenario[] => {
  return [
    {
      id: "base-case",
      name: "Base Case",
      description: "Our expected budget based on current projections",
      totalBudget: baseCaseBudget,
      departments: budgetData.map(item => ({
        id: item.id || item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        budget: item.value
      })),
      color: "#3498db" // Blue
    },
    {
      id: "worst-case",
      name: "Worst Case",
      description: "Conservative budget with 15% reduction in funding",
      totalBudget: Math.round(baseCaseBudget * 0.85),
      departments: budgetData.map(item => ({
        id: item.id || item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        budget: Math.round(item.value * 0.85)
      })),
      color: "#e74c3c" // Red
    },
    {
      id: "best-case",
      name: "Best Case",
      description: "Optimistic budget with 10% increase in funding",
      totalBudget: Math.round(baseCaseBudget * 1.10),
      departments: budgetData.map(item => ({
        id: item.id || item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        budget: Math.round(item.value * 1.10)
      })),
      color: "#2ecc71" // Green
    }
  ];
};

// Get a single scenario by ID
export const getScenarioById = (id: string): BudgetScenario | undefined => {
  return getBudgetScenarios().find(scenario => scenario.id === id);
};
