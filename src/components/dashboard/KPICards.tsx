
import { Card, CardContent } from "@/components/ui/card";

interface KPICardsProps {
  annualRevenue: string;
  revenueGrowth: number;
  totalOpex: number;
  opexGrowth: number;
  totalVariance: number;
  variancePercentage: number;
  marginPercentage: number;
  marginChange: number;
}

export const KPICards = ({
  annualRevenue,
  revenueGrowth,
  totalOpex,
  opexGrowth,
  totalVariance,
  variancePercentage,
  marginPercentage,
  marginChange
}: KPICardsProps) => {
  // Format totalOpex to show in millions with 'M' suffix
  const formattedOpex = `$${(totalOpex / 1000000).toFixed(1)}M`;
  
  // Format totalVariance to show in millions with 'M' suffix and proper sign
  const formattedVariance = `${totalVariance >= 0 ? '+' : ''}$${(totalVariance / 1000000).toFixed(1)}M`;
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="bg-blue-100">
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{annualRevenue}</div>
          <div className="text-xs text-gray-600">FY Revenue YTD</div>
        </CardContent>
      </Card>
      
      <Card className="bg-teal-800 text-white">
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{revenueGrowth}%</div>
          <div className="text-xs text-gray-200">QTR YoY Growth %</div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-100">
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{formattedOpex}</div>
          <div className="text-xs text-gray-600">FY OPEX YTD</div>
        </CardContent>
      </Card>
      
      <Card className="bg-teal-800 text-white">
        <CardContent className="p-4">
          <div className="text-2xl font-bold">{marginPercentage}%</div>
          <div className="text-xs text-gray-200">FY Margin %</div>
        </CardContent>
      </Card>
    </div>
  );
};
