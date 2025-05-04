
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InsightsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Key Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Overall budget accuracy is excellent at 99.6%</li>
                <li>Sales department has the largest positive variance at 4.7%</li>
                <li>Q2 showed highest budget-to-actual deviation</li>
                <li>Technology spending consistently trending above budget</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Review sales compensation structure to better align with performance</li>
                <li>Optimize cloud hosting costs with reserved instances</li>
                <li>Evaluate marketing campaign ROI based on spend efficiency</li>
                <li>Continue remote work policies to maintain cost savings</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Forecasted Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Based on current trends, the annual budget is projected to close within 
                1.2% of target. Engineering department expenses are expected to exceed 
                budget by approximately 3.5% due to increased cloud infrastructure needs, 
                while HR and Marketing departments are on track to finish 3-4% under budget. 
                Overall operating expenses are forecasted to end the year 0.5% below budget.
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
