
import { Card, CardContent } from "@/components/ui/card";

export const KPICards = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="bg-blue-100">
        <CardContent className="p-6">
          <div className="text-3xl font-bold">$280M</div>
          <div className="text-sm text-gray-600">FY24 Revenue YTD</div>
        </CardContent>
      </Card>
      
      <Card className="bg-teal-800 text-white">
        <CardContent className="p-6">
          <div className="text-3xl font-bold">34.6%</div>
          <div className="text-sm text-gray-200">QTR YoY Growth %</div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-100">
        <CardContent className="p-6">
          <div className="text-3xl font-bold">$14M</div>
          <div className="text-sm text-gray-600">FY24 OPEX YTD</div>
        </CardContent>
      </Card>
      
      <Card className="bg-teal-800 text-white">
        <CardContent className="p-6">
          <div className="text-3xl font-bold">4.8%</div>
          <div className="text-sm text-gray-200">FY24 OPEX % of Revenue</div>
        </CardContent>
      </Card>
    </div>
  );
};
