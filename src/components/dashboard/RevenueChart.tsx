
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueDataPoint {
  month: string;
  projected: number;
  actual: number | null;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Projection vs Actuals</CardTitle>
        <CardDescription>FY 2025 monthly revenue performance against projections</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => value ? [`$${value.toLocaleString()}K`, ''] : ['Projected', '']} 
                labelFormatter={(label) => `${label} 2025`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#8884d8" 
                name="Projected Revenue" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#0ea5e9" 
                name="Actual Revenue" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
