
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  revenueData, 
  opexData, 
  bvaData, 
  getTotalOpex, 
  getTotalBudget, 
  getTotalActual,
  getAnnualRevenue
} from "@/components/dashboard/dashboardData";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Calculate values for KPI cards
  const totalOpex = getTotalOpex();
  const annualRevenue = getAnnualRevenue();
  
  const showNotification = () => {
    toast({
      title: "Budget Reminder",
      description: "Q3 budget planning cycle starts next week. Please prepare your department inputs.",
      duration: 5000,
    });
  };

  // Format data for BVA table
  const bvaTableData = [
    { name: "Salaries", actuals: "(70M)", forecast: "(84M)", variance: "$14M", variancePercent: "17%" },
    { name: "Sales Commissions", actuals: "(9.3M)", forecast: "(9.7M)", variance: "$0.4M", variancePercent: "4%" },
    { name: "Bonus", actuals: "(12M)", forecast: "(13M)", variance: "$1M", variancePercent: "8%" },
    { name: "- Gross Profit", actuals: "$90M", forecast: "$120M", variance: "(30M)", variancePercent: "(25%)" },
    { name: "+ Operating Expenses", actuals: "(80M)", forecast: "(90M)", variance: "$10M", variancePercent: "9%" },
    { name: "= EBITDA", actuals: "$10M", forecast: "$30M", variance: "(20)", variancePercent: "(70%)" },
    { name: "Depreciation & Amortization", actuals: "(30M)", forecast: "(28M)", variance: "$2M", variancePercent: "8%" },
  ];

  // Waterfall chart data
  const waterfallData = [
    { name: "Gross", value: 275000 },
    { name: "Payroll", value: -125000 },
    { name: "Services", value: -75000 },
    { name: "Net", value: 75000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
        <Button onClick={showNotification}>
          Show Sample Notification
        </Button>
      </div>

      {/* KPI Cards - Top Row */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-blue-100">
          <CardContent className="p-6">
            <div className="text-3xl font-bold">$280M</div>
            <div className="text-sm text-gray-600">FY24 Revenue YTD</div>
          </CardContent>
        </Card>
        
        <Card className="bg-teal-800 text-white">
          <CardContent className="p-6">
            <div className="text-3xl font-bold">34.6%</div>
            <div className="text-sm">QTR YoY Growth %</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-100">
          <CardContent className="p-6">
            <div className="text-3xl font-bold">$14M</div>
            <div className="text-sm text-gray-600">FY24 OPEX YTD</div>
          </CardContent>
        </Card>
        
        <Card className="bg-teal-800 text-white">
          <CardContent className="p-6">
            <div className="text-3xl font-bold">4.8%</div>
            <div className="text-sm">FY24 OPEX % of Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Middle Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Revenue Chart */}
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
                <div className="w-3 h-3 rounded-full bg-blue-800 mr-1"></div>
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
                  data={revenueData} 
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
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
                    stroke="#1e3a8a" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#1e3a8a" }} 
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

        {/* OPEX Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">OPEX Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs mb-2 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-teal-800 mr-1"></div>
                <span>Dept A</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#4DC1CB] mr-1"></div>
                <span>Dept B</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-300 mr-1"></div>
                <span>Dept C</span>
              </div>
            </div>
            <div className="h-80">
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
                  <XAxis dataKey="month" />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip />
                  <Bar dataKey="deptA" stackId="a" fill="#0E5B61" /> {/* Dark teal */}
                  <Bar dataKey="deptB" stackId="a" fill="#4DC1CB" /> {/* Teal */}
                  <Bar dataKey="deptC" stackId="a" fill="#FDC675" /> {/* Amber */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables - Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* BVA Summary Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">BVA Summary YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]"></TableHead>
                  <TableHead className="text-right">Actuals</TableHead>
                  <TableHead className="text-right">Forecast</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead className="text-right">Variance %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bvaTableData.map((row, index) => (
                  <TableRow 
                    key={index}
                    className={row.name === "= EBITDA" ? "bg-blue-100" : ""}
                  >
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-right">{row.actuals}</TableCell>
                    <TableCell className="text-right">{row.forecast}</TableCell>
                    <TableCell className="text-right">{row.variance}</TableCell>
                    <TableCell className="text-right">{row.variancePercent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* BVA Variance by Type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">BVA Var by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Plan", value: -75000, fill: "#0E5B61" },
                    { name: "Timing", value: -25000, fill: "#4DC1CB" },
                    { name: "Permanent", value: -15000, fill: "#989898" },
                    { name: "Total", value: 90000, fill: "#FDC675" },
                  ]}
                  margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${Math.abs(value/1000)}K`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value: ValueType) => {
                      // Fix the type error by handling the potential string type properly
                      const numValue = typeof value === 'number' ? value : 0;
                      return [`$${Math.abs(numValue).toLocaleString()}`, ''];
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 4, 4, 0]}
                    fill="#FDC675" // Default color
                  >
                    {/* Custom colors for each bar */}
                    {[
                      <rect key="1" fill="#0E5B61" />, // Dark teal
                      <rect key="2" fill="#4DC1CB" />, // Teal
                      <rect key="3" fill="#989898" />, // Gray
                      <rect key="4" fill="#FDC675" />, // Amber
                    ]}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
