
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

// Revenue projection data
const revenueProjectionData = [
  { month: "Jan", actual: 92000, projected: 90000 },
  { month: "Feb", actual: 98000, projected: 95000 },
  { month: "Mar", actual: 103000, projected: 100000 },
  { month: "Apr", actual: 105000, projected: 108000 },
  { month: "May", actual: 112000, projected: 115000 },
  { month: "Jun", actual: 118000, projected: 120000 },
  { month: "Jul", actual: null, projected: 125000 },
  { month: "Aug", actual: null, projected: 130000 },
  { month: "Sep", actual: null, projected: 135000 },
  { month: "Oct", actual: null, projected: 140000 },
  { month: "Nov", actual: null, projected: 145000 },
  { month: "Dec", actual: null, projected: 150000 },
];

const chartConfig = {
  actual: {
    label: "Actual Revenue",
    theme: { light: "#1F4D46", dark: "#4DC1CB" }, // Using colors from the scenario colors
  },
  projected: {
    label: "Projected Revenue",
    theme: { light: "#F8D25B", dark: "#F8D25B" }, // Using colors from the scenario colors
  },
};

export const RevenueChart: React.FC = () => {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">Monthly Revenue Projection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer config={chartConfig}>
            <LineChart data={revenueProjectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="rgba(148, 163, 184, 0.6)" />
              <YAxis
                width={70}
                tickFormatter={(value) => `$${value/1000}k`}
                tick={{ fontSize: 12 }}
                stroke="rgba(148, 163, 184, 0.6)"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                name="actual"
                type="monotone"
                dataKey="actual"
                stroke="var(--color-actual)"
                activeDot={{ r: 6 }}
                strokeWidth={2}
                connectNulls
              />
              <Line
                name="projected"
                type="monotone"
                dataKey="projected"
                stroke="var(--color-projected)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
