
import React, { useState } from "react";
import { BudgetScenarioType, BudgetScenario } from "@/types/budgetScenarios";
import { BudgetScenarioSelector } from "./BudgetScenarioSelector";
import { BudgetScenarioFinancials } from "./BudgetScenarioFinancials";
import { getBudgetScenarios } from "./BudgetScenarioData";
import { ScenarioPlanner } from "@/components/planning/ScenarioPlanner";

export const PlanningTools: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<BudgetScenarioType>("base-case");
  const [scenarios, setScenarios] = useState<BudgetScenario[]>(getBudgetScenarios());

  const handleScenarioChange = (scenarioId: BudgetScenarioType) => {
    setActiveScenario(scenarioId);
    // Refresh scenarios to get latest data
    setScenarios(getBudgetScenarios());
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <BudgetScenarioSelector
            activeScenario={activeScenario}
            onScenarioChange={handleScenarioChange}
          />
        </div>
        
        <BudgetScenarioFinancials scenarios={scenarios} />
      </div>
      
      <div className="mt-8">
        <ScenarioPlanner />
      </div>
    </div>
  );
};
