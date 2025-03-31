
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { formatPercentage } from "@/lib/format";

interface KPICardsProps {
  annualProjectedRevenue: number;
  averageMonthlyGrowth: number;
  projectionConfidence: number;
}

export const KPICards: React.FC<KPICardsProps> = ({ 
  annualProjectedRevenue,
  averageMonthlyGrowth,
  projectionConfidence
}) => {
  // For YoY growth calculation we would typically compare to previous year's data
  // Using a placeholder value for now (could be calculated from historical data)
  const yoyGrowth = 12.3;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/30 border-teal-200 dark:border-teal-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-teal-800 dark:text-teal-300">Annual Projected Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-teal-900 dark:text-teal-200">{formatCurrency(annualProjectedRevenue)}</div>
          <div className="text-xs text-teal-700 dark:text-teal-400">+{yoyGrowth.toFixed(1)}% YoY Growth</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/30 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-blue-800 dark:text-blue-300">Avg. Monthly Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-blue-900 dark:text-blue-200">{formatPercentage(averageMonthlyGrowth)}</div>
          <div className="text-xs text-blue-700 dark:text-blue-400">Month-over-Month</div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/50 dark:to-amber-800/30 border-amber-200 dark:border-amber-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-amber-800 dark:text-amber-300">Projection Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-amber-900 dark:text-amber-200">{projectionConfidence}%</div>
          <div className="text-xs text-amber-700 dark:text-amber-400">Based on historical accuracy</div>
        </CardContent>
      </Card>
    </div>
  );
};
