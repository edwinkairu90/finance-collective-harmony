
import {
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DepartmentData {
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

interface DepartmentBarChartProps {
  data: DepartmentData[];
}

export const DepartmentBarChart = ({ data }: DepartmentBarChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual by Department</CardTitle>
        <CardDescription>Compare departmental budget allocation and spending</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
              <Legend />
              <Bar dataKey="budget" name="Budget" fill="#94a3b8" />
              <Bar dataKey="actual" name="Actual" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
