
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";

export const BVAVarianceChart = () => {
  // Use the consistent data source
  const { overBudgetItems } = useActualsData();
  
  // Calculate totals for variance types based on explanations
  const planVariance = overBudgetItems
    .filter(item => item.explanation.includes('growth') || item.explanation.includes('targets'))
    .reduce((sum, item) => sum + item.variance, 0);
    
  const timingVariance = overBudgetItems
    .filter(item => item.explanation.includes('delayed'))
    .reduce((sum, item) => sum + item.variance, 0);
    
  const permanentVariance = overBudgetItems
    .filter(item => !item.explanation.includes('growth') && 
                   !item.explanation.includes('targets') && 
                   !item.explanation.includes('delayed'))
    .reduce((sum, item) => sum + item.variance, 0);
    
  const totalVariance = planVariance + timingVariance + permanentVariance;
  
  // Create chart data with consistent values based on our actual data
  const chartData = [
    { name: "Plan", value: planVariance, fill: "#4DC1CB" },
    { name: "Timing", value: timingVariance, fill: "#4DC1CB" },
    { name: "Permanent", value: permanentVariance, fill: "#989898" },
    { name: "Total", value: totalVariance, fill: "#FDC675" },
  ];

  return (
    <Card>
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-sm">BVA Var by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${Math.abs(value/1000)}K`}
                tick={{ fontSize: 10 }}
              />
              <YAxis 
                type="category" 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <Tooltip 
                formatter={(value: ValueType) => {
                  // Fix the type error by handling the potential string type properly
                  const numValue = typeof value === 'number' ? value : 0;
                  return [`$${Math.abs(numValue).toLocaleString()}`, ''];
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                fill="#4DC1CB" // Default color
                name="Variance"
              >
                {/* Custom colors for each bar */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
