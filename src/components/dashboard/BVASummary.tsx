
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BVADataPoint {
  department: string;
  budget: number;
  actual: number;
  variance: number;
}

interface BVASummaryProps {
  data: BVADataPoint[];
  totalBudget: number;
  totalActual: number;
  totalVariance: number;
}

export const BVASummary = ({ 
  data, 
  totalBudget, 
  totalActual, 
  totalVariance 
}: BVASummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs. Actual YTD</CardTitle>
        <CardDescription>Department-level performance against budget</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Bar dataKey="budget" fill="#8884d8" name="Budget" />
              <Bar dataKey="actual" fill="#0ea5e9" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-sm mt-2 grid grid-cols-3 gap-4">
          <div>
            <div className="text-muted-foreground">Total Budget</div>
            <div className="font-medium">${(totalBudget/1000000).toFixed(1)}M</div>
          </div>
          <div>
            <div className="text-muted-foreground">Total Actual</div>
            <div className="font-medium">${(totalActual/1000000).toFixed(1)}M</div>
          </div>
          <div>
            <div className="text-muted-foreground">Variance</div>
            <div className={`font-medium ${totalVariance < 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(totalVariance/1000000).toFixed(1)}M {totalVariance < 0 ? 'Under' : 'Over'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
