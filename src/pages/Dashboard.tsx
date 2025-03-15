import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, BarChart, ChartPie, ChevronUpIcon, ClipboardCheck, Compass, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  Legend,
  LineChart,
  Line 
} from 'recharts';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { QuarterlyMetrics } from "@/components/QuarterlyMetrics";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for revenue projections vs actuals
  const revenueData = [
    { month: 'Jan', projected: 4200, actual: 4100 },
    { month: 'Feb', projected: 4500, actual: 4600 },
    { month: 'Mar', projected: 5000, actual: 5100 },
    { month: 'Apr', projected: 5500, actual: 5300 },
    { month: 'May', projected: 6000, actual: 6200 },
    { month: 'Jun', projected: 6500, actual: 6300 },
    { month: 'Jul', projected: 7000, actual: 7200 },
    { month: 'Aug', projected: 7500, actual: null },
    { month: 'Sep', projected: 8000, actual: null },
    { month: 'Oct', projected: 8500, actual: null },
    { month: 'Nov', projected: 9000, actual: null },
    { month: 'Dec', projected: 9500, actual: null },
  ];

  // Mock data for operational expenses
  const opexData = [
    { category: 'Personnel', amount: 3600000, percentage: 45 },
    { category: 'Technology', amount: 1200000, percentage: 15 },
    { category: 'Marketing', amount: 1000000, percentage: 12.5 },
    { category: 'Facilities', amount: 800000, percentage: 10 },
    { category: 'Travel', amount: 600000, percentage: 7.5 },
    { category: 'R&D', amount: 400000, percentage: 5 },
    { category: 'Other', amount: 400000, percentage: 5 },
  ];

  // Mock data for BVA (Budget vs Actual) by department YTD
  const bvaData = [
    { department: 'Sales', budget: 1200000, actual: 1150000, variance: -50000 },
    { department: 'Marketing', budget: 900000, actual: 950000, variance: 50000 },
    { department: 'Engineering', budget: 2200000, actual: 2100000, variance: -100000 },
    { department: 'Operations', budget: 1400000, actual: 1450000, variance: 50000 },
    { department: 'Finance', budget: 600000, actual: 580000, variance: -20000 },
    { department: 'HR', budget: 500000, actual: 490000, variance: -10000 },
  ];

  const quickLinks = [
    { icon: ChartPie, label: "Budget Planning", path: "/budget", color: "bg-blue-100 text-blue-600" },
    { icon: Users, label: "Data Collection", path: "/data-collection", color: "bg-purple-100 text-purple-600" },
    { icon: ClipboardCheck, label: "Approvals", path: "/approvals", color: "bg-amber-100 text-amber-600" },
    { icon: BarChart, label: "Actuals vs Budget", path: "/actuals", color: "bg-emerald-100 text-emerald-600" },
  ];

  const showNotification = () => {
    toast({
      title: "Budget Reminder",
      description: "Q3 budget planning cycle starts next week. Please prepare your department inputs.",
      duration: 5000,
    });
  };

  // Calculate total Opex
  const totalOpex = opexData.reduce((acc, item) => acc + item.amount, 0);
  
  // Calculate BVA totals
  const totalBudget = bvaData.reduce((acc, item) => acc + item.budget, 0);
  const totalActual = bvaData.reduce((acc, item) => acc + item.actual, 0);
  const totalVariance = totalActual - totalBudget;
  const variancePercentage = (totalVariance / totalBudget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <Button onClick={showNotification}>
          Show Sample Notification
        </Button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Annual Revenue Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$76.5M</div>
              <div className="flex items-center text-emerald-500 text-sm">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                8.2%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">vs previous forecast</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">YTD Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${(totalOpex / 1000000).toFixed(1)}M</div>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                3.5%
              </div>
            </div>
            <Progress value={58} className="h-2 mt-2" />
            <div className="text-xs text-muted-foreground mt-1">58% of annual budget</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overall Budget Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${(totalVariance / 1000000).toFixed(1)}M</div>
              <div className={`flex items-center ${variancePercentage < 0 ? 'text-green-500' : 'text-red-500'} text-sm`}>
                {variancePercentage < 0 ? <ArrowDownIcon className="mr-1 h-4 w-4" /> : <ArrowUpIcon className="mr-1 h-4 w-4" />}
                {Math.abs(variancePercentage).toFixed(1)}%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {variancePercentage < 0 ? 'Under budget' : 'Over budget'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarterly Metrics Section */}
      <QuarterlyMetrics />

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => navigate(link.path)}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className={`p-3 rounded-full mb-4 ${link.color}`}>
                <link.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium">{link.label}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Projection vs Actuals */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Projection vs Actuals</CardTitle>
          <CardDescription>FY 2025 monthly revenue performance against projections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => value ? [`$${value.toLocaleString()}K`, ''] : ['Projected', '']} 
                  labelFormatter={(label) => `${label} 2025`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#8884d8" 
                  name="Projected Revenue" 
                  strokeWidth={2} 
                  dot={{ r: 3 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#0ea5e9" 
                  name="Actual Revenue" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Opex Summary and BVA Summary in two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Opex Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Operational Expenses</CardTitle>
            <CardDescription>2025 YTD expense breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart 
                  data={opexData} 
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
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground text-right mt-2">
              Total Opex: ${(totalOpex/1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>

        {/* BVA Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs. Actual YTD</CardTitle>
            <CardDescription>Department-level performance against budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart 
                  data={bvaData}
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
                </RechartsBarChart>
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
      </div>
    </div>
  );
};

export default Dashboard;
