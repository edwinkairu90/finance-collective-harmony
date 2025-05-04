
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VarianceData {
  name: string;
  variance: number;
}

interface VarianceTrendChartProps {
  data: VarianceData[];
}

export const VarianceTrendChart = ({ data }: VarianceTrendChartProps) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Variance Trend</CardTitle>
        <CardDescription>Monthly budget variance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => [`${formatCurrency(Number(value))}`, 'Variance']} />
              <Legend />
              <ReferenceLine y={0} stroke="#888" />
              <Line 
                type="monotone" 
                dataKey="variance" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
