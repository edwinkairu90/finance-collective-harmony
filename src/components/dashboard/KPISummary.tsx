
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface KPISummaryProps {
  annualRevenue: string;
  revenueGrowth: number;
  totalOpex: number;
  opexGrowth: number;
  totalVariance: number;
  variancePercentage: number;
  marginPercentage: number;
  marginChange: number;
}

export const KPISummary = ({
  annualRevenue,
  revenueGrowth,
  totalOpex,
  opexGrowth,
  totalVariance,
  variancePercentage,
  marginPercentage,
  marginChange
}: KPISummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-blue-100">
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-xs font-medium text-gray-600">Annual Revenue Forecast</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">{annualRevenue}</div>
            <div className="flex items-center text-emerald-500 text-xs">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              {revenueGrowth}%
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">vs previous forecast</div>
        </CardContent>
      </Card>
      <Card className="bg-teal-800 text-white">
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-xs font-medium text-gray-200">YTD Expenses</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">${(totalOpex / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-red-200 text-xs">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              {opexGrowth}%
            </div>
          </div>
          <Progress value={58} className="h-1.5 mt-2 bg-blue-200" />
          <div className="text-xs text-gray-200 mt-1">58% of annual budget</div>
        </CardContent>
      </Card>
      <Card className="bg-blue-100">
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-xs font-medium text-gray-600">Margin</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">{marginPercentage.toFixed(1)}%</div>
            <div className={`flex items-center ${marginChange > 0 ? 'text-emerald-500' : 'text-red-500'} text-xs`}>
              {marginChange > 0 ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {Math.abs(marginChange).toFixed(1)}%
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">vs previous quarter</div>
        </CardContent>
      </Card>
      <Card className="bg-teal-800 text-white">
        <CardHeader className="pb-1 pt-3">
          <CardTitle className="text-xs font-medium text-gray-200">Overall Budget Variance</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">${(totalVariance / 1000000).toFixed(1)}M</div>
            <div className={`flex items-center ${variancePercentage < 0 ? 'text-green-200' : 'text-red-200'} text-xs`}>
              {variancePercentage < 0 ? <ArrowDownIcon className="mr-1 h-3 w-3" /> : <ArrowUpIcon className="mr-1 h-3 w-3" />}
              {Math.abs(variancePercentage).toFixed(1)}%
            </div>
          </div>
          <div className="text-xs text-gray-200 mt-1">
            {variancePercentage < 0 ? 'Under budget' : 'Over budget'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
