
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { ScenarioItem } from "@/types/planning";
import { useScenarioRowValues } from "@/hooks/useScenarioRowValues";

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
  // Use our custom hook to get the calculated values
  const { baseValue, compareValue, variance, percentVariance } = useScenarioRowValues({
    baseScenario,
    compareScenario,
    accessor,
    department
  });
  
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
