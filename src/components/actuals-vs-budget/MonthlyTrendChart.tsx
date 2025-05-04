
import {
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MonthlyData {
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

interface MonthlyTrendChartProps {
  data: MonthlyData[];
}

export const MonthlyTrendChart = ({ data }: MonthlyTrendChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget vs Actual</CardTitle>
        <CardDescription>Compare monthly budget and actual spending trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
              <Legend />
              <Bar dataKey="budget" name="Budget" fill="#94a3b8" />
              <Bar dataKey="actual" name="Actual" fill="#0ea5e9" />
              <Line 
                type="monotone" 
                dataKey="variance" 
                name="Variance" 
                stroke="#10b981" 
                dot={{ r: 5 }} 
                activeDot={{ r: 8 }} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
