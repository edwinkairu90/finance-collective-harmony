
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

export const BVAVarianceChart = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">BVA Var by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={[
                { name: "Plan", value: -75000, fill: "#4DC1CB" },
                { name: "Timing", value: -25000, fill: "#4DC1CB" },
                { name: "Permanent", value: -15000, fill: "#989898" },
                { name: "Total", value: 90000, fill: "#FDC675" },
              ]}
              margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${Math.abs(value/1000)}K`}
              />
              <YAxis 
                type="category" 
                dataKey="name"
                axisLine={false}
                tickLine={false}
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
              >
                {/* Custom colors for each bar */}
                {[
                  <rect key="1" fill="#4DC1CB" />, // Teal color for consistency
                  <rect key="2" fill="#4DC1CB" />, // Teal color for consistency
                  <rect key="3" fill="#989898" />, // Gray
                  <rect key="4" fill="#FDC675" />, // Amber
                ]}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
