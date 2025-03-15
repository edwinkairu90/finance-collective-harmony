
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, BarChart, ChartPie, ChevronUpIcon, ClipboardCheck, DollarSign, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, Legend } from 'recharts';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', planned: 4000, actual: 4200 },
    { month: 'Feb', planned: 4500, actual: 4300 },
    { month: 'Mar', planned: 5000, actual: 5200 },
    { month: 'Apr', planned: 5500, actual: 5700 },
    { month: 'May', planned: 6000, actual: 5800 },
    { month: 'Jun', planned: 6500, actual: 6800 },
  ];

  const expenseCategories = [
    { name: 'Salaries', planned: 3000, actual: 3100 },
    { name: 'Marketing', planned: 1200, actual: 1000 },
    { name: 'Operations', planned: 800, actual: 850 },
    { name: 'Tools', planned: 300, actual: 280 },
    { name: 'Other', planned: 500, actual: 470 },
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Financial Dashboard</h1>
        <Button onClick={showNotification}>
          Show Sample Notification
        </Button>
      </div>

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

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$1,248,000</div>
              <div className="flex items-center text-finance-positive text-sm">
                <ArrowUpIcon className="mr-1 h-4 w-4" />
                12.5%
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">vs last year</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Spend to Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$724,500</div>
              <div className="flex items-center text-finance-positive text-sm">
                <ChevronUpIcon className="mr-1 h-4 w-4" />
                4.3%
              </div>
            </div>
            <Progress value={58} className="h-2 mt-2" />
            <div className="text-xs text-muted-foreground mt-1">58% of annual budget</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="flex items-center text-finance-negative text-sm mt-1">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              3 more than usual
            </div>
            <Button variant="link" className="p-0 h-auto mt-2 text-sm" onClick={() => navigate('/approvals')}>
              View pending approvals
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Revenue vs Plan Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Plan</CardTitle>
          <CardDescription>Compare actual revenue against planned figures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                <Legend />
                <Area type="monotone" dataKey="planned" stroke="#0ea5e9" fill="#0ea5e980" name="Planned" />
                <Area type="monotone" dataKey="actual" stroke="#10b981" fill="#10b98180" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Expense by Category Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
          <CardDescription>Plan vs actual by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={expenseCategories} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                <Legend />
                <Bar dataKey="planned" name="Planned" fill="#0ea5e9" />
                <Bar dataKey="actual" name="Actual" fill="#10b981" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
