
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface OpexDataPoint {
  category: string;
  amount: number;
  percentage: number;
}

interface OpexSummaryProps {
  data: OpexDataPoint[];
  totalOpex: number;
}

export const OpexSummary = ({ data, totalOpex }: OpexSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Operational Expenses</CardTitle>
        <CardDescription>2025 YTD expense breakdown by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              layout="vertical"
              margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" 
                tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} 
              />
              <YAxis type="category" dataKey="category" />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, '']} 
                labelFormatter={(label) => `${label}`}
              />
              <Bar dataKey="amount" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-sm text-muted-foreground text-right mt-2">
          Total Opex: ${(totalOpex/1000000).toFixed(1)}M
        </div>
      </CardContent>
    </Card>
  );
};
