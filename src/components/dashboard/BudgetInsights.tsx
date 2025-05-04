
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";

export const BudgetInsights = () => {
  // Use the same data source as the other components for consistency
  const { overBudgetItems } = useActualsData();
  
  // Filter for items with significant variances (10% or more)
  const significantItems = overBudgetItems.filter(item => {
    const variancePercent = Math.abs(item.variance / item.budget) * 100;
    return variancePercent >= 10;
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Significant Variance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                {significantItems.map((item, index) => (
                  <li key={index}>
                    {item.item} exceeded budget by {(Math.abs(item.variance / item.budget) * 100).toFixed(1)}% 
                    due to {item.explanation}
                  </li>
                ))}
                {significantItems.length === 0 && (
                  <li>No items with significant variance found in the current period.</li>
                )}
                <li>Marketing campaigns were under budget by 15.6% due to delayed content campaigns</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Root Causes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Unexpected 25% increase in enterprise customer sign-ups drove cloud infrastructure needs</li>
                <li>Sales team exceeded Q2 targets by 15%, triggering higher commission payouts</li>
                <li>Competitive hiring market required increased recruitment spending</li>
                <li>Tech infrastructure scaling issues required emergency contractor engagement</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Corrective Action Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">
                Based on the identified variances, the following corrective actions are recommended:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><span className="font-medium">Cloud Infrastructure:</span> Implement reserved instance purchasing strategy to reduce costs by an estimated 30% while accommodating growth</li>
                <li><span className="font-medium">Sales Compensation:</span> Revise commission structure with tiered thresholds to better account for overperformance</li>
                <li><span className="font-medium">Hiring Process:</span> Consolidate recruitment efforts with preferred vendors to negotiate volume discounts</li>
                <li><span className="font-medium">Budget Process:</span> Implement quarterly forecasting reviews for high-variance departments to catch trends earlier</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
