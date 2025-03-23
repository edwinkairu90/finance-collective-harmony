
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Package } from "lucide-react";
import { BudgetScenarioType } from "@/types/budgetScenarios";

interface BudgetScenarioSelectorProps {
  activeScenario: BudgetScenarioType;
  onScenarioChange: (scenario: BudgetScenarioType) => void;
}

export const BudgetScenarioSelector: React.FC<BudgetScenarioSelectorProps> = ({ 
  activeScenario, 
  onScenarioChange 
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle>Budget Scenarios</CardTitle>
        <CardDescription>View different budget projections</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={activeScenario} 
          onValueChange={(value) => onScenarioChange(value as BudgetScenarioType)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="base-case" id="base-case" />
            <Label htmlFor="base-case" className="flex items-center cursor-pointer">
              <Package className="h-5 w-5 mr-2 text-slate-500" />
              <div>
                <span className="font-medium">Base Case</span>
                <p className="text-sm text-muted-foreground">Expected budget based on current projections</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="worst-case" id="worst-case" />
            <Label htmlFor="worst-case" className="flex items-center cursor-pointer">
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
              <div>
                <span className="font-medium">Worst Case</span>
                <p className="text-sm text-muted-foreground">Conservative budget with 15% reduction</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="best-case" id="best-case" />
            <Label htmlFor="best-case" className="flex items-center cursor-pointer">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              <div>
                <span className="font-medium">Best Case</span>
                <p className="text-sm text-muted-foreground">Optimistic budget with 10% increase</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
