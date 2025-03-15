
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ComposedChart,
  Area
} from 'recharts';
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ActualsVsBudget = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("ytd");

  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', budget: 84000, actual: 85400, variance: 1400 },
    { name: 'Feb', budget: 86000, actual: 83200, variance: -2800 },
    { name: 'Mar', budget: 89000, actual: 87500, variance: -1500 },
    { name: 'Apr', budget: 88000, actual: 90200, variance: 2200 },
    { name: 'May', budget: 90000, actual: 93100, variance: 3100 },
    { name: 'Jun', budget: 94000, actual: 91800, variance: -2200 },
    { name: 'Jul', budget: 96000, actual: 95400, variance: -600 },
    { name: 'Aug', budget: 96000, actual: 97200, variance: 1200 },
  ];

  const departmentData = [
    { name: 'Sales', budget: 320000, actual: 335000, variance: 15000 },
    { name: 'Marketing', budget: 250000, actual: 245000, variance: -5000 },
    { name: 'Engineering', budget: 420000, actual: 428000, variance: 8000 },
    { name: 'Support', budget: 180000, actual: 175000, variance: -5000 },
    { name: 'HR', budget: 95000, actual: 93000, variance: -2000 },
    { name: 'Finance', budget: 110000, actual: 108000, variance: -2000 },
  ];

  const expenseCategories = [
    { name: 'Salaries', budget: 650000, actual: 648000, variance: -2000 },
    { name: 'Marketing', budget: 250000, actual: 245000, variance: -5000 },
    { name: 'Operations', budget: 180000, actual: 183000, variance: 3000 },
    { name: 'Technology', budget: 120000, actual: 125000, variance: 5000 },
    { name: 'Other', budget: 48000, actual: 45500, variance: -2500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Actuals vs Budget</h1>
        
        <div className="flex flex-wrap gap-2">
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="support">Customer Support</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ytd">Year-to-Date</SelectItem>
              <SelectItem value="q1">Q1 2023</SelectItem>
              <SelectItem value="q2">Q2 2023</SelectItem>
              <SelectItem value="q3">Q3 2023</SelectItem>
              <SelectItem value="q4">Q4 2023</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$723,000</div>
            <div className="text-xs text-muted-foreground mt-1">
              58% of annual budget
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Actual YTD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$720,300</div>
            <div className="flex items-center text-xs text-finance-negative mt-1">
              <Badge variant="outline" className="font-normal">
                -$2,700 variance
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.6%</div>
            <div className="text-xs text-muted-foreground mt-1">
              0.4% under budget overall
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monthly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
          <TabsTrigger value="department">By Department</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="details">Detailed Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget vs Actual</CardTitle>
              <CardDescription>Compare monthly budget and actual spending trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
                    <Legend />
                    <Bar dataKey="budget" name="Budget" fill="#94a3b8" />
                    <Bar dataKey="actual" name="Actual" fill="#0ea5e9" />
                    <Line type="monotone" dataKey="variance" name="Variance" stroke="#10b981" dot={{ r: 5 }} activeDot={{ r: 8 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual by Department</CardTitle>
              <CardDescription>Compare departmental budget allocation and spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Department</th>
                  <th className="text-right py-3 font-medium">Budget YTD</th>
                  <th className="text-right py-3 font-medium">Actual YTD</th>
                  <th className="text-right py-3 font-medium">Variance</th>
                  <th className="text-right py-3 font-medium">Variance %</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((dept) => (
                  <tr key={dept.name} className="border-b">
                    <td className="py-3">{dept.name}</td>
                    <td className="text-right py-3">${dept.budget.toLocaleString()}</td>
                    <td className="text-right py-3">${dept.actual.toLocaleString()}</td>
                    <td className={`text-right py-3 ${dept.variance >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                      {dept.variance >= 0 ? '+' : ''}{dept.variance.toLocaleString()}
                    </td>
                    <td className={`text-right py-3 ${dept.variance >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                      {dept.variance >= 0 ? '+' : ''}{((dept.variance / dept.budget) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="border-t font-medium">
                  <td className="py-3">Total</td>
                  <td className="text-right py-3">
                    ${departmentData.reduce((sum, dept) => sum + dept.budget, 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    ${departmentData.reduce((sum, dept) => sum + dept.actual, 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    ${departmentData.reduce((sum, dept) => sum + dept.variance, 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    {((departmentData.reduce((sum, dept) => sum + dept.variance, 0) / 
                      departmentData.reduce((sum, dept) => sum + dept.budget, 0)) * 100).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual by Category</CardTitle>
              <CardDescription>Compare spending across expense categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={expenseCategories} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Category</th>
                  <th className="text-right py-3 font-medium">Budget YTD</th>
                  <th className="text-right py-3 font-medium">Actual YTD</th>
                  <th className="text-right py-3 font-medium">Variance</th>
                  <th className="text-right py-3 font-medium">Variance %</th>
                </tr>
              </thead>
              <tbody>
                {expenseCategories.map((cat) => (
                  <tr key={cat.name} className="border-b">
                    <td className="py-3">{cat.name}</td>
                    <td className="text-right py-3">${cat.budget.toLocaleString()}</td>
                    <td className="text-right py-3">${cat.actual.toLocaleString()}</td>
                    <td className={`text-right py-3 ${cat.variance >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                      {cat.variance >= 0 ? '+' : ''}{cat.variance.toLocaleString()}
                    </td>
                    <td className={`text-right py-3 ${cat.variance >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                      {cat.variance >= 0 ? '+' : ''}{((cat.variance / cat.budget) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="border-t font-medium">
                  <td className="py-3">Total</td>
                  <td className="text-right py-3">
                    ${expenseCategories.reduce((sum, cat) => sum + cat.budget, 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    ${expenseCategories.reduce((sum, cat) => sum + cat.actual, 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    ${expenseCategories.reduce((sum, cat) => sum + cat.variance, 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3">
                    {((expenseCategories.reduce((sum, cat) => sum + cat.variance, 0) / 
                      expenseCategories.reduce((sum, cat) => sum + cat.budget, 0)) * 100).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Variance Analysis</CardTitle>
              <CardDescription>Detailed breakdown of significant budget variances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Top 3 Over Budget</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-medium">Item</th>
                          <th className="text-left py-3 font-medium">Department</th>
                          <th className="text-right py-3 font-medium">Budget</th>
                          <th className="text-right py-3 font-medium">Actual</th>
                          <th className="text-right py-3 font-medium">Variance</th>
                          <th className="text-left py-3 font-medium">Explanation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">Sales Compensation</td>
                          <td className="py-3">Sales</td>
                          <td className="text-right py-3">$180,000</td>
                          <td className="text-right py-3">$196,000</td>
                          <td className="text-right py-3 text-finance-negative">-$16,000</td>
                          <td className="py-3">Higher sales commissions due to exceeding targets</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Cloud Hosting</td>
                          <td className="py-3">Engineering</td>
                          <td className="text-right py-3">$58,000</td>
                          <td className="text-right py-3">$68,000</td>
                          <td className="text-right py-3 text-finance-negative">-$10,000</td>
                          <td className="py-3">Increased usage due to customer growth</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Recruitment</td>
                          <td className="py-3">HR</td>
                          <td className="text-right py-3">$25,000</td>
                          <td className="text-right py-3">$32,000</td>
                          <td className="text-right py-3 text-finance-negative">-$7,000</td>
                          <td className="py-3">Expanded hiring efforts for engineering team</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Top 3 Under Budget</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-medium">Item</th>
                          <th className="text-left py-3 font-medium">Department</th>
                          <th className="text-right py-3 font-medium">Budget</th>
                          <th className="text-right py-3 font-medium">Actual</th>
                          <th className="text-right py-3 font-medium">Variance</th>
                          <th className="text-left py-3 font-medium">Explanation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">Content Marketing</td>
                          <td className="py-3">Marketing</td>
                          <td className="text-right py-3">$45,000</td>
                          <td className="text-right py-3">$38,000</td>
                          <td className="text-right py-3 text-finance-positive">+$7,000</td>
                          <td className="py-3">Delayed content campaigns pending strategy review</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Office Supplies</td>
                          <td className="py-3">Operations</td>
                          <td className="text-right py-3">$12,000</td>
                          <td className="text-right py-3">$7,500</td>
                          <td className="text-right py-3 text-finance-positive">+$4,500</td>
                          <td className="py-3">Continued remote work reduced office supply needs</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Training & Development</td>
                          <td className="py-3">HR</td>
                          <td className="text-right py-3">$18,000</td>
                          <td className="text-right py-3">$14,000</td>
                          <td className="text-right py-3 text-finance-positive">+$4,000</td>
                          <td className="py-3">Shift to lower-cost online training options</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ActualsVsBudget;
