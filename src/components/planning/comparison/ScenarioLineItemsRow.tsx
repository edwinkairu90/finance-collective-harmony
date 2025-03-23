
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
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
  const [expanded, setExpanded] = useState(false);
  
  // Get the appropriate line items
  const getLineItems = (scenario: ScenarioItem): LineItem[] => {
    if (!scenario.lineItems) return [];
    
    if (department && scenario.lineItems.departments && scenario.lineItems.departments[department]) {
      return scenario.lineItems.departments[department];
    }
    
    if (category === 'revenue' && scenario.lineItems.revenue) {
      return scenario.lineItems.revenue;
    }
    
    if (category === 'costOfSales' && scenario.lineItems.costOfSales) {
      return scenario.lineItems.costOfSales;
    }
    
    if (category === 'expenses' && scenario.lineItems.expenses) {
      return scenario.lineItems.expenses;
    }
    
    return [];
  };
  
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
  
  const baseLineItems = getLineItems(baseScenario);
  const compareLineItems = getLineItems(compareScenario);
  
  const hasLineItems = baseLineItems.length > 0 || compareLineItems.length > 0;
  
  // Create a merged list of all unique line items from both scenarios
  const allItemNames = new Set([
    ...baseLineItems.map(item => item.name),
    ...compareLineItems.map(item => item.name)
  ]);
  
  const mergedLineItems = Array.from(allItemNames).map(name => {
    const baseItem = baseLineItems.find(item => item.name === name);
    const compareItem = compareLineItems.find(item => item.name === name);
    
    const baseAmount = baseItem ? baseItem.amount : 0;
    const compareAmount = compareItem ? compareItem.amount : 0;
    const itemVariance = compareAmount - baseAmount;
    const itemPercentVariance = baseAmount !== 0 ? (itemVariance / baseAmount) * 100 : 0;
    
    return {
      name,
      baseAmount,
      compareAmount,
      variance: itemVariance,
      percentVariance: itemPercentVariance
    };
  });
  
  return (
    <>
      <TableRow className={isTotal ? "font-medium bg-muted/30" : ""}>
        <TableCell 
          className={`${isTotal ? "font-medium" : ""}`}
          style={{ paddingLeft: `${indentLevel * 1.5 + 1}rem` }}
        >
          <div className="flex items-center space-x-1">
            {hasLineItems && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-6 w-6"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            )}
            <span>{title}</span>
          </div>
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
      
      {/* Line item breakdown when expanded */}
      {expanded && mergedLineItems.map((item, index) => (
        <TableRow key={`line-item-${index}`} className="bg-muted/10 text-sm">
          <TableCell style={{ paddingLeft: `${indentLevel * 1.5 + 3}rem` }}>
            {item.name}
          </TableCell>
          <TableCell>{formatCurrency(item.baseAmount)}</TableCell>
          <TableCell>{formatCurrency(item.compareAmount)}</TableCell>
          <TableCell className={item.variance >= 0 ? "text-green-600" : "text-red-600"}>
            {formatCurrency(item.variance)}
          </TableCell>
          <TableCell className={item.variance >= 0 ? "text-green-600" : "text-red-600"}>
            {item.percentVariance.toFixed(1)}%
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
