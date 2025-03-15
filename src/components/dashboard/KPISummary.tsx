
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-[#00a9ae]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Annual Revenue Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{annualRevenue}</div>
            <div className="flex items-center text-emerald-500 text-sm">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              {revenueGrowth}%
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">vs previous forecast</div>
        </CardContent>
      </Card>
      <Card className="bg-[#3ac3d6] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white">YTD Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${(totalOpex / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-red-200 text-sm">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              {opexGrowth}%
            </div>
          </div>
          <Progress value={58} className="h-2 mt-2 bg-blue-200" />
          <div className="text-xs text-blue-100 mt-1">58% of annual budget</div>
        </CardContent>
      </Card>
      <Card className="bg-[#00a9ae]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Margin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{marginPercentage.toFixed(1)}%</div>
            <div className={`flex items-center ${marginChange > 0 ? 'text-emerald-500' : 'text-red-500'} text-sm`}>
              {marginChange > 0 ? <ArrowUpIcon className="mr-1 h-4 w-4" /> : <ArrowDownIcon className="mr-1 h-4 w-4" />}
              {Math.abs(marginChange).toFixed(1)}%
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">vs previous quarter</div>
        </CardContent>
      </Card>
      <Card className="bg-[#3ac3d6] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-white">Overall Budget Variance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">${(totalVariance / 1000000).toFixed(1)}M</div>
            <div className={`flex items-center ${variancePercentage < 0 ? 'text-green-200' : 'text-red-200'} text-sm`}>
              {variancePercentage < 0 ? <ArrowDownIcon className="mr-1 h-4 w-4" /> : <ArrowUpIcon className="mr-1 h-4 w-4" />}
              {Math.abs(variancePercentage).toFixed(1)}%
            </div>
          </div>
          <div className="text-xs text-blue-100 mt-1">
            {variancePercentage < 0 ? 'Under budget' : 'Over budget'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
