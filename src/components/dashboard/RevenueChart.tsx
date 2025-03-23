
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Revenue Forecast vs. Actuals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-xs mb-2 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#4DC1CB] mr-1"></div>
            <span>Target</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#0EA5E9] mr-1"></div>
            <span>Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full border border-[#4DC1CB] bg-transparent mr-1"></div>
            <span>Forecast</span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis 
                axisLine={false} 
                tickLine={false}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="projected" 
                stroke="#4DC1CB" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#0EA5E9" 
                strokeWidth={2}
                dot={{ r: 4, fill: "#0EA5E9" }} 
                activeDot={{ r: 6 }}
              />
              <CartesianGrid stroke="#eee" vertical={false} />
              
              {/* Area to represent forecasted months */}
              <defs>
                <linearGradient id="colorProjArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4DC1CB" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4DC1CB" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
