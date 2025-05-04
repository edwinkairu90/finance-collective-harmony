
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";

export const OpexBarChart = () => {
  // Use the same data source
  const { monthlyData } = useActualsData();
  
  // Transform the data for the OPEX chart format
  const opexData = monthlyData.map(item => {
    // Create a distribution of the total across departments for demonstration
    // In a real app, this would come from actual department breakdowns by month
    const deptAPercent = 0.5; // 50% to dept A
    const deptBPercent = 0.3; // 30% to dept B
    const deptCPercent = 0.2; // 20% to dept C
    
    return {
      month: item.name,
      deptA: Math.round(item.actual * deptAPercent),
      deptB: Math.round(item.actual * deptBPercent),
      deptC: Math.round(item.actual * deptCPercent)
    };
  });

  return (
    <Card>
      <CardHeader className="pb-1 pt-3">
        <CardTitle className="text-sm">OPEX Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-xs mb-2 space-x-4">
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-800 mr-1"></div>
            <span>Dept A</span>
          </div>
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-500 mr-1"></div>
            <span>Dept B</span>
          </div>
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-300 mr-1"></div>
            <span>Dept C</span>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={opexData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <Tooltip />
              <Bar dataKey="deptA" stackId="a" fill="#134e4a" /> 
              <Bar dataKey="deptB" stackId="a" fill="#14b8a6" /> 
              <Bar dataKey="deptC" stackId="a" fill="#fcd34d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
