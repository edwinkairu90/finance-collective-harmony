
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const OpexBarChart = () => {
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
              data={[
                { month: "Jan", deptA: 100, deptB: 50, deptC: 70 },
                { month: "Feb", deptA: 110, deptB: 80, deptC: 75 },
                { month: "Mar", deptA: 105, deptB: 70, deptC: 80 },
                { month: "Apr", deptA: 90, deptB: 60, deptC: 50 },
                { month: "May", deptA: 80, deptB: 50, deptC: 40 },
                { month: "Jun", deptA: 70, deptB: 45, deptC: 35 },
                { month: "Jul", deptA: 60, deptB: 40, deptC: 30 },
                { month: "Aug", deptA: 50, deptB: 35, deptC: 25 },
                { month: "Sep", deptA: 40, deptB: 30, deptC: 20 },
                { month: "Oct", deptA: 30, deptB: 25, deptC: 15 },
                { month: "Nov", deptA: 20, deptB: 20, deptC: 10 },
                { month: "Dec", deptA: 10, deptB: 15, deptC: 5 },
              ]}
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
