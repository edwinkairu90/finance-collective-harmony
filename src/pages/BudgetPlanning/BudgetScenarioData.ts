import { BudgetScenario, ScenarioFactor, BudgetScenarioType } from "@/types/budgetScenarios";
import { budgetData, COLORS, getTotalBudget } from "./BudgetData";

// Base case is our current budget
const baseCaseBudget = getTotalBudget();

// Financial metrics for scenarios
const baseRevenue = 1250000;
const baseOpex = 950000;
// Calculate gross profit (typically revenue - COGS, but we'll use a simple calculation here)
const baseGrossProfit = baseRevenue * 0.7; // Assuming 70% gross margin
const baseProfit = baseRevenue - baseOpex;

// Updated colors based on the screenshot
const SCENARIO_COLORS = {
  "base-case": "#1F4D46", // Dark teal/green
  "worst-case": "#4DC1CB", // Medium teal 
  "best-case": "#F8D25B"  // Yellow
};

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

// In a real application, these would be stored in a database
// For this demo, we'll store them in memory
let scenariosData: BudgetScenario[] = [];

// Initialize scenarios data on first import
const initScenarios = () => {
  if (scenariosData.length === 0) {
    scenariosData = [
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
        color: SCENARIO_COLORS["base-case"], // Updated color
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
        color: SCENARIO_COLORS["worst-case"], // Updated color
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
        color: SCENARIO_COLORS["best-case"], // Updated color
        factors: scenarioFactors["best-case"],
        assumptions: scenarioAssumptions["best-case"]
      }
    ];
  }
};

// Generate scenario data based on the current budget data
export const getBudgetScenarios = (): BudgetScenario[] => {
  initScenarios();
  return [...scenariosData];
};

// Get a single scenario by ID
export const getScenarioById = (id: string): BudgetScenario | undefined => {
  initScenarios();
  return scenariosData.find(scenario => scenario.id === id);
};

// Update scenario factors
export const updateScenarioFactors = (
  scenarioId: BudgetScenarioType, 
  updatedFactors: ScenarioFactor[]
): BudgetScenario | undefined => {
  initScenarios();
  const scenarioIndex = scenariosData.findIndex(s => s.id === scenarioId);
  
  if (scenarioIndex === -1) return undefined;
  
  // Update the factors for the specified scenario
  scenariosData[scenarioIndex].factors = updatedFactors;
  
  return scenariosData[scenarioIndex];
};

// Update scenario assumptions
export const updateScenarioAssumptions = (
  scenarioId: BudgetScenarioType, 
  updatedAssumptions: string[]
): BudgetScenario | undefined => {
  initScenarios();
  const scenarioIndex = scenariosData.findIndex(s => s.id === scenarioId);
  
  if (scenarioIndex === -1) return undefined;
  
  // Update the assumptions for the specified scenario
  scenariosData[scenarioIndex].assumptions = updatedAssumptions;
  
  return scenariosData[scenarioIndex];
};

// Recalculate financial impacts based on factors
export const recalculateScenarioFinancials = (
  scenarioId: BudgetScenarioType
): BudgetScenario | undefined => {
  initScenarios();
  const scenarioIndex = scenariosData.findIndex(s => s.id === scenarioId);
  
  if (scenarioIndex === -1) return undefined;
  
  const scenario = scenariosData[scenarioIndex];
  
  // Calculate total factor impact (sum of all factor impacts)
  const totalImpact = scenario.factors.reduce((sum, factor) => sum + factor.impact, 0);
  
  // Apply impact to financials
  // This is a simplified calculation - in a real app this would be more sophisticated
  const impactMultiplier = 1 + (totalImpact / 100);
  
  // Update financial metrics based on the base case
  if (scenarioId === "worst-case" || scenarioId === "best-case") {
    const baseCase = scenariosData.find(s => s.id === "base-case");
    if (baseCase) {
      scenariosData[scenarioIndex].financials = {
        revenue: Math.round(baseCase.financials.revenue * impactMultiplier),
        opex: Math.round(baseCase.financials.opex * (impactMultiplier * 0.8)), // Expenses usually don't scale 1:1 with revenue
        grossProfit: Math.round(baseCase.financials.revenue * impactMultiplier * 
          (scenarioId === "worst-case" ? 0.65 : 0.75)), // Different margins for different scenarios
        profit: 0 // Will be calculated below
      };
      
      // Calculate profit
      scenariosData[scenarioIndex].financials.profit = 
        scenariosData[scenarioIndex].financials.revenue - 
        scenariosData[scenarioIndex].financials.opex;
    }
  }
  
  return scenariosData[scenarioIndex];
};
