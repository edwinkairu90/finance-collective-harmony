
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

interface SummaryCardsProps {
  totalBudget: number;
  totalActual: number;
  variance: number;
  accuracy: number;
  percentOfAnnual: number;
}

export const SummaryCards = ({
  totalBudget,
  totalActual,
  variance,
  accuracy,
  percentOfAnnual
}: SummaryCardsProps) => {
  const isUnderBudget = variance < 0;
  const varianceFormatted = Math.abs(variance).toLocaleString();
  const accuracyFormatted = accuracy.toFixed(1);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-white border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget YTD</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {percentOfAnnual}% of annual budget
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Actual YTD</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalActual.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-xs mt-1">
            <Badge variant="outline" className={`font-normal ${isUnderBudget ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              <span className="flex items-center gap-1">
                {isUnderBudget ? 
                  <ArrowDown className="h-3 w-3" /> : 
                  <ArrowUp className="h-3 w-3" />}
                ${varianceFormatted} variance
              </span>
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white border-0 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Budget Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accuracyFormatted}%</div>
          <div className="text-xs text-muted-foreground mt-1">
            {isUnderBudget ? 
              `${(100-accuracy).toFixed(1)}% under budget overall` : 
              `${(accuracy-100).toFixed(1)}% over budget overall`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
