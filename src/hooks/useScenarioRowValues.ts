
import { ScenarioItem } from "@/types/planning";

interface UseScenarioRowValuesProps {
  baseScenario: ScenarioItem;
  compareScenario: ScenarioItem;
  accessor: string;
  department?: string;
}

interface ScenarioRowValues {
  baseValue: number;
  compareValue: number;
  variance: number;
  percentVariance: number;
}

export const useScenarioRowValues = ({
  baseScenario,
  compareScenario,
  accessor,
  department
}: UseScenarioRowValuesProps): ScenarioRowValues => {
  // Extract values with proper type safety
  const getBaseValue = (): number => {
    if (department && baseScenario.budgetImpact.departments) {
      return baseScenario.budgetImpact.departments[department]?.budget || 0;
    }
    
    // If this is a direct property of budgetImpact, get it
    const value = baseScenario.budgetImpact[accessor as keyof typeof baseScenario.budgetImpact];
    // Ensure it's a number
    return typeof value === 'number' ? value : 0;
  };
  
  const getCompareValue = (): number => {
    if (department && compareScenario.budgetImpact.departments) {
      return compareScenario.budgetImpact.departments[department]?.budget || 0;
    }
    
    // If this is a direct property of budgetImpact, get it
    const value = compareScenario.budgetImpact[accessor as keyof typeof compareScenario.budgetImpact];
    // Ensure it's a number
    return typeof value === 'number' ? value : 0;
  };
  
  const baseValue = getBaseValue();
  const compareValue = getCompareValue();
  
  const variance = compareValue - baseValue;
  const percentVariance = baseValue !== 0 ? (variance / baseValue) * 100 : 0;
  
  return {
    baseValue,
    compareValue,
    variance,
    percentVariance
  };
};
