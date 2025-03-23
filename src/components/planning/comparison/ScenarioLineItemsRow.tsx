
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { LineItem, ScenarioItem } from "@/types/planning";

interface ScenarioLineItemsRowProps {
  title: string;
  baseScenario: ScenarioItem;
  compareScenario: ScenarioItem;
  category: string;
  accessor: string;
  isTotal?: boolean;
  indentLevel?: number;
  department?: string;
}

export const ScenarioLineItemsRow: React.FC<ScenarioLineItemsRowProps> = ({
  title,
  baseScenario,
  compareScenario,
  category,
  accessor,
  isTotal = false,
  indentLevel = 0,
  department
}) => {
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
  
  return (
    <TableRow className={isTotal ? "font-medium bg-muted/30" : ""}>
      <TableCell 
        className={`${isTotal ? "font-medium" : ""}`}
        style={{ paddingLeft: `${indentLevel * 1.5 + 1}rem` }}
      >
        <span>{title}</span>
      </TableCell>
      <TableCell>{formatCurrency(baseValue)}</TableCell>
      <TableCell>{formatCurrency(compareValue)}</TableCell>
      <TableCell className={variance >= 0 ? "text-green-600" : "text-red-600"}>
        {formatCurrency(variance)}
      </TableCell>
      <TableCell className={variance >= 0 ? "text-green-600" : "text-red-600"}>
        {percentVariance.toFixed(1)}%
      </TableCell>
    </TableRow>
  );
};
