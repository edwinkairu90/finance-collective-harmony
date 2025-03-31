import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formatCurrency } from "@/lib/format";

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

// Revenue drivers by segment
const revenueDrivers = [
  { 
    segment: "Enterprise", 
    newClients: 12, 
    totalClients: 48, 
    avgRevenuePerClient: 15000, 
    clientRetention: "92%",
    expansionRevenue: 125000
  },
  { 
    segment: "Mid-Market", 
    newClients: 25, 
    totalClients: 120, 
    avgRevenuePerClient: 3580, 
    clientRetention: "85%",
    expansionRevenue: 92000
  },
  { 
    segment: "SMB", 
    newClients: 85, 
    totalClients: 410, 
    avgRevenuePerClient: 720, 
    clientRetention: "78%",
    expansionRevenue: 45000
  },
];

// Monthly revenue drivers projection
const initialMonthlyRevenueDrivers = [
  { 
    month: "Jan", 
    enterprise: { newClients: 1, subscriptionRevenue: 62500 },
    midMarket: { newClients: 2, subscriptionRevenue: 37000 },
    smb: { newClients: 7, subscriptionRevenue: 24500 },
    implementationRevenue: 15000,
    otherRevenue: 0
  },
  { 
    month: "Feb", 
    enterprise: { newClients: 1, subscriptionRevenue: 65000 },
    midMarket: { newClients: 2, subscriptionRevenue: 38000 },
    smb: { newClients: 7, subscriptionRevenue: 25000 },
    implementationRevenue: 18000,
    otherRevenue: 0
  },
  { 
    month: "Mar", 
    enterprise: { newClients: 1, subscriptionRevenue: 67500 },
    midMarket: { newClients: 2, subscriptionRevenue: 39000 },
    smb: { newClients: 7, subscriptionRevenue: 25500 },
    implementationRevenue: 12000,
    otherRevenue: 5000
  },
  { 
    month: "Apr", 
    enterprise: { newClients: 1, subscriptionRevenue: 70000 },
    midMarket: { newClients: 2, subscriptionRevenue: 40000 },
    smb: { newClients: 7, subscriptionRevenue: 26000 },
    implementationRevenue: 15000,
    otherRevenue: 0
  },
  { 
    month: "May", 
    enterprise: { newClients: 1, subscriptionRevenue: 72500 },
    midMarket: { newClients: 2, subscriptionRevenue: 41000 },
    smb: { newClients: 7, subscriptionRevenue: 26500 },
    implementationRevenue: 20000,
    otherRevenue: 0
  },
  { 
    month: "Jun", 
    enterprise: { newClients: 1, subscriptionRevenue: 75000 },
    midMarket: { newClients: 2, subscriptionRevenue: 42000 },
    smb: { newClients: 7, subscriptionRevenue: 27000 },
    implementationRevenue: 22000,
    otherRevenue: 0
  },
  { 
    month: "Jul", 
    enterprise: { newClients: 1, subscriptionRevenue: 77500 },
    midMarket: { newClients: 2, subscriptionRevenue: 43000 },
    smb: { newClients: 7, subscriptionRevenue: 27500 },
    implementationRevenue: 15000,
    otherRevenue: 8000
  },
  { 
    month: "Aug", 
    enterprise: { newClients: 1, subscriptionRevenue: 80000 },
    midMarket: { newClients: 2, subscriptionRevenue: 44000 },
    smb: { newClients: 7, subscriptionRevenue: 28000 },
    implementationRevenue: 18000,
    otherRevenue: 0
  },
  { 
    month: "Sep", 
    enterprise: { newClients: 1, subscriptionRevenue: 82500 },
    midMarket: { newClients: 3, subscriptionRevenue: 46000 },
    smb: { newClients: 8, subscriptionRevenue: 29000 },
    implementationRevenue: 25000,
    otherRevenue: 0
  },
  { 
    month: "Oct", 
    enterprise: { newClients: 1, subscriptionRevenue: 85000 },
    midMarket: { newClients: 2, subscriptionRevenue: 47000 },
    smb: { newClients: 7, subscriptionRevenue: 29500 },
    implementationRevenue: 15000,
    otherRevenue: 10000
  },
  { 
    month: "Nov", 
    enterprise: { newClients: 1, subscriptionRevenue: 87500 },
    midMarket: { newClients: 2, subscriptionRevenue: 48000 },
    smb: { newClients: 7, subscriptionRevenue: 30000 },
    implementationRevenue: 12000,
    otherRevenue: 0
  },
  { 
    month: "Dec", 
    enterprise: { newClients: 1, subscriptionRevenue: 90000 },
    midMarket: { newClients: 2, subscriptionRevenue: 49000 },
    smb: { newClients: 7, subscriptionRevenue: 30500 },
    implementationRevenue: 20000,
    otherRevenue: 5000
  },
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
  const [monthlyRevenueDrivers, setMonthlyRevenueDrivers] = useState(initialMonthlyRevenueDrivers);
  const [additionalRevenueType, setAdditionalRevenueType] = useState("");
  const [additionalRevenueAmount, setAdditionalRevenueAmount] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("Jan");
  
  // Form for adding additional revenue
  const form = useForm({
    defaultValues: {
      month: "Jan",
      revenueType: "implementation",
      amount: 0
    }
  });

  // Calculate monthly totals
  const calculateMonthlyTotal = (month: string) => {
    const data = monthlyRevenueDrivers.find(m => m.month === month);
    if (!data) return 0;
    
    return (
      data.enterprise.subscriptionRevenue +
      data.midMarket.subscriptionRevenue +
      data.smb.subscriptionRevenue +
      data.implementationRevenue +
      data.otherRevenue
    );
  };

  // Handle adding additional revenue
  const handleAddAdditionalRevenue = () => {
    if (additionalRevenueAmount <= 0 || !selectedMonth || !additionalRevenueType) return;

    setMonthlyRevenueDrivers(prevData => {
      return prevData.map(item => {
        if (item.month === selectedMonth) {
          if (additionalRevenueType === "implementation") {
            return { ...item, implementationRevenue: additionalRevenueAmount };
          } else if (additionalRevenueType === "other") {
            return { ...item, otherRevenue: additionalRevenueAmount };
          }
        }
        return item;
      });
    });

    // Reset form values
    setAdditionalRevenueAmount(0);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/30 border-teal-200 dark:border-teal-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-teal-800 dark:text-teal-300">Annual Projected Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900 dark:text-teal-200">$1,445,000</div>
            <div className="text-xs text-teal-700 dark:text-teal-400">+12.3% YoY Growth</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/30 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-blue-800 dark:text-blue-300">Avg. Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">4.2%</div>
            <div className="text-xs text-blue-700 dark:text-blue-400">Month-over-Month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/50 dark:to-amber-800/30 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-800 dark:text-amber-300">Projection Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-200">85%</div>
            <div className="text-xs text-amber-700 dark:text-amber-400">Based on historical accuracy</div>
          </CardContent>
        </Card>
      </div>
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
            <CardTitle className="text-base text-slate-800 dark:text-slate-200">Quarterly Revenue Projections</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
                <TableRow>
                  <TableHead className="w-[100px]">Quarter</TableHead>
                  <TableHead>Projected Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quarterlyProjections.map((item) => (
                  <TableRow key={item.quarter} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                    <TableCell className="font-medium">{item.quarter}</TableCell>
                    <TableCell>${(item.revenue).toLocaleString()}</TableCell>
                    <TableCell className="text-right text-emerald-600 dark:text-emerald-400">{item.growth}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
            <CardTitle className="text-base text-slate-800 dark:text-slate-200">Revenue by Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
                <TableRow>
                  <TableHead className="w-[100px]">Segment</TableHead>
                  <TableHead>Projected Revenue</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {segmentProjections.map((item) => (
                  <TableRow key={item.segment} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                    <TableCell className="font-medium">{item.segment}</TableCell>
                    <TableCell>${(item.revenue).toLocaleString()}</TableCell>
                    <TableCell className="text-emerald-600 dark:text-emerald-400">{item.growth}</TableCell>
                    <TableCell className="text-right text-blue-600 dark:text-blue-400">{item.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
          <CardTitle className="text-base text-slate-800 dark:text-slate-200">Revenue Drivers by Segment</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="w-[100px]">Segment</TableHead>
                <TableHead>New Clients</TableHead>
                <TableHead>Total Clients</TableHead>
                <TableHead>Avg. Revenue per Client</TableHead>
                <TableHead>Client Retention</TableHead>
                <TableHead className="text-right">Expansion Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueDrivers.map((item) => (
                <TableRow key={item.segment} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <TableCell className="font-medium">{item.segment}</TableCell>
                  <TableCell className="text-purple-600 dark:text-purple-400 font-medium">{item.newClients}</TableCell>
                  <TableCell>{item.totalClients}</TableCell>
                  <TableCell className="text-blue-600 dark:text-blue-400 font-medium">
                    ${item.avgRevenuePerClient.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-emerald-600 dark:text-emerald-400">{item.clientRetention}</TableCell>
                  <TableCell className="text-right text-amber-600 dark:text-amber-400 font-medium">
                    ${item.expansionRevenue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
          <CardTitle className="text-base text-slate-800 dark:text-slate-200">
            Monthly Revenue Drivers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
            <h4 className="text-sm font-medium mb-2 text-slate-800 dark:text-slate-200">Add Additional Revenue</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Month</label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthlyRevenueDrivers.map(item => (
                      <SelectItem key={item.month} value={item.month}>{item.month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Revenue Type</label>
                <Select value={additionalRevenueType} onValueChange={setAdditionalRevenueType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="implementation">Implementation</SelectItem>
                    <SelectItem value="other">Other Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Amount</label>
                <Input
                  type="number"
                  value={additionalRevenueAmount || ''}
                  onChange={(e) => setAdditionalRevenueAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleAddAdditionalRevenue}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Update Revenue
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
                <TableRow>
                  <TableHead className="w-[80px]">Month</TableHead>
                  <TableHead className="text-center">
                    <div className="text-purple-600 dark:text-purple-400 font-medium">Enterprise</div>
                    <div className="flex justify-between text-xs mt-1 font-normal">
                      <span>New Clients</span>
                      <span>MRR</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="text-blue-600 dark:text-blue-400 font-medium">Mid-Market</div>
                    <div className="flex justify-between text-xs mt-1 font-normal">
                      <span>New Clients</span>
                      <span>MRR</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="text-emerald-600 dark:text-emerald-400 font-medium">SMB</div>
                    <div className="flex justify-between text-xs mt-1 font-normal">
                      <span>New Clients</span>
                      <span>MRR</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-blue-600 dark:text-blue-400 font-medium">Implementation</TableHead>
                  <TableHead className="text-amber-600 dark:text-amber-400 font-medium">Other Revenue</TableHead>
                  <TableHead className="text-right font-medium text-teal-700 dark:text-teal-400">Monthly Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyRevenueDrivers.map((item) => (
                  <TableRow key={item.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                    <TableCell className="font-medium">{item.month}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-between">
                        <span className="text-purple-600 dark:text-purple-400 font-medium">{item.enterprise.newClients}</span>
                        <span>${formatCurrency(item.enterprise.subscriptionRevenue)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-between">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{item.midMarket.newClients}</span>
                        <span>${formatCurrency(item.midMarket.subscriptionRevenue)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-between">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{item.smb.newClients}</span>
                        <span>${formatCurrency(item.smb.subscriptionRevenue)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-blue-600 dark:text-blue-400 font-medium">
                      ${formatCurrency(item.implementationRevenue)}
                    </TableCell>
                    <TableCell className="text-amber-600 dark:text-amber-400 font-medium">
                      ${formatCurrency(item.otherRevenue)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-teal-700 dark:text-teal-400">
                      ${formatCurrency(calculateMonthlyTotal(item.month))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
