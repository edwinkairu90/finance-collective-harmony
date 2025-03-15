
import { CalendarIcon, TrendingUpIcon, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";

interface HeaderCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
  isWhiteText?: boolean;
}

const HeaderCard = ({ title, value, change, icon, bgColor, isWhiteText }: HeaderCardProps) => {
  const textColorClass = isWhiteText ? "text-white" : "text-muted-foreground";
  const changeColorClass = isWhiteText ? "text-green-200" : "text-emerald-500";
  const subtextColorClass = isWhiteText ? "text-blue-100" : "text-muted-foreground";

  return (
    <Card className={bgColor}>
      <CardHeader className="pb-1 pt-2">
        <CardTitle className={`text-xs font-medium ${textColorClass} flex items-center gap-1`}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">{value}</div>
          <div className={`flex items-center ${changeColorClass} text-xs`}>
            <ArrowUpIcon className="mr-1 h-3 w-3" />
            {change}
          </div>
        </div>
        <div className={`text-xs ${subtextColorClass} mt-1`}>vs previous quarter</div>
      </CardContent>
    </Card>
  );
};

export const QuarterlyMetricsHeader = ({ 
  latestRevenue, 
  latestMargin,
  latestHeadcount,
  latestCashFlow,
  revenueQoQChange,
  headcountQoQChange,
  cashFlowQoQChange
}: {
  latestRevenue: any;
  latestMargin: any;
  latestHeadcount: any;
  latestCashFlow: any;
  revenueQoQChange: number;
  headcountQoQChange: number;
  cashFlowQoQChange: number;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <HeaderCard
        title="Q1 2024 Revenue"
        value={`$${(latestRevenue.actual / 1000000).toFixed(1)}M`}
        change={`${revenueQoQChange.toFixed(1)}%`}
        icon={<CalendarIcon className="h-3 w-3" />}
        bgColor="bg-[#00a9ae]"
      />
      
      <HeaderCard
        title="Gross Margin"
        value={`${latestMargin.gross}%`}
        change="1.0%"
        icon={<TrendingUpIcon className="h-3 w-3" />}
        bgColor="bg-[#3ac3d6]"
        isWhiteText={true}
      />
      
      <HeaderCard
        title="Headcount"
        value={`${latestHeadcount.total}`}
        change={`${headcountQoQChange.toFixed(1)}%`}
        icon={<Users className="h-3 w-3" />}
        bgColor="bg-[#00a9ae]"
      />
      
      <HeaderCard
        title="Operating Cash Flow"
        value={`$${(latestCashFlow.operatingCF / 1000000).toFixed(1)}M`}
        change={`${cashFlowQoQChange.toFixed(1)}%`}
        icon={<TrendingUpIcon className="h-3 w-3" />}
        bgColor="bg-[#3ac3d6]"
        isWhiteText={true}
      />
    </div>
  );
};
