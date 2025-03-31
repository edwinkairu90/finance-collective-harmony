
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

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

// Quarterly projections
const quarterlyProjections = [
  { quarter: "Q1", revenue: 285000, growth: "8.2%" },
  { quarter: "Q2", revenue: 335000, growth: "13.5%" },
  { quarter: "Q3", revenue: 390000, growth: "15.2%" },
  { quarter: "Q4", revenue: 435000, growth: "11.2%" },
];

// Annual projections by segment
const segmentProjections = [
  { segment: "Enterprise", revenue: 720000, growth: "18.5%", percentage: "49.6%" },
  { segment: "Mid-Market", revenue: 430000, growth: "9.2%", percentage: "29.7%" },
  { segment: "SMB", revenue: 295000, growth: "5.8%", percentage: "20.7%" },
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

export const RevenueProjection: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Annual Projected Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,445,000</div>
            <div className="text-xs text-muted-foreground">+12.3% YoY Growth</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Avg. Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <div className="text-xs text-muted-foreground">Month-over-Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projection Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="text-xs text-muted-foreground">Based on historical accuracy</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Monthly Revenue Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <LineChart data={revenueProjectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  width={70}
                  tickFormatter={(value) => `$${value/1000}k`}
                  tick={{ fontSize: 12 }}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Quarterly Revenue Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Quarter</TableHead>
                  <TableHead>Projected Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quarterlyProjections.map((item) => (
                  <TableRow key={item.quarter}>
                    <TableCell className="font-medium">{item.quarter}</TableCell>
                    <TableCell>${(item.revenue).toLocaleString()}</TableCell>
                    <TableCell className="text-right">{item.growth}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue by Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Segment</TableHead>
                  <TableHead>Projected Revenue</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {segmentProjections.map((item) => (
                  <TableRow key={item.segment}>
                    <TableCell className="font-medium">{item.segment}</TableCell>
                    <TableCell>${(item.revenue).toLocaleString()}</TableCell>
                    <TableCell>{item.growth}</TableCell>
                    <TableCell className="text-right">{item.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
