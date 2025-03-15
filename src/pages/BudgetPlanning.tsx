import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const BudgetPlanning = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const budgetData = [
    { name: 'Salaries & Benefits', value: 650000 },
    { name: 'Marketing', value: 250000 },
    { name: 'Operations', value: 180000 },
    { name: 'Technology', value: 120000 },
    { name: 'Other', value: 48000 },
  ];

  const departments = [
    { name: "Sales", id: "sales" },
    { name: "Marketing", id: "marketing" },
    { name: "Engineering", id: "engineering" },
    { name: "Customer Support", id: "customer-support" },
    { name: "Finance", id: "finance" },
    { name: "Human Resources", id: "hr" },
  ];

  const handleSave = () => {
    toast({
      title: "Budget Changes Saved",
      description: "Your budget changes have been saved successfully.",
    });
  };

  const handleSubmitForApproval = () => {
    toast({
      title: "Budget Submitted",
      description: "Your budget has been submitted for approval.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Budget Planning</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>Save Draft</Button>
          <Button onClick={handleSubmitForApproval}>Submit for Approval</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="planning">Planning Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>FY 2025 Budget Allocation</CardTitle>
              <CardDescription>Overview of how your budget is distributed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, undefined]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Total Budget: $1,248,000
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Budget Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Planning Phase</div>
                      <div className="text-sm text-muted-foreground">Data collection and initial budgets</div>
                    </div>
                    <div className="text-sm font-medium text-green-500">Completed</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Department Review</div>
                      <div className="text-sm text-muted-foreground">Teams review and adjust budgets</div>
                    </div>
                    <div className="text-sm font-medium text-amber-500">In Progress</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Executive Approval</div>
                      <div className="text-sm text-muted-foreground">Final review and sign-off</div>
                    </div>
                    <div className="text-sm font-medium text-gray-500">Pending</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Implementation</div>
                      <div className="text-sm text-muted-foreground">Budget rollout and tracking setup</div>
                    </div>
                    <div className="text-sm font-medium text-gray-500">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">Import Data</Button>
                  <Button variant="outline" className="justify-start">Export Budget</Button>
                  <Button variant="outline" className="justify-start">Department Comparison</Button>
                  <Button variant="outline" className="justify-start">Historical Analysis</Button>
                  <Button variant="outline" className="justify-start">Share Budget</Button>
                  <Button variant="outline" className="justify-start">Send Reminders</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Budgets</CardTitle>
              <CardDescription>Manage budgets by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4 items-end">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select defaultValue="2025">
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="mb-0.5">View Budget</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing Department Budget</CardTitle>
              <CardDescription>FY 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="digital-advertising">Digital Advertising</Label>
                    <Input id="digital-advertising" type="number" defaultValue="120000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content-creation">Content Creation</Label>
                    <Input id="content-creation" type="number" defaultValue="45000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="events">Events</Label>
                    <Input id="events" type="number" defaultValue="60000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand-development">Brand Development</Label>
                    <Input id="brand-development" type="number" defaultValue="25000" />
                  </div>
                </div>
                <div className="text-right text-sm">
                  Total: $250,000
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget by Category</CardTitle>
              <CardDescription>View and manage budget categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium">Category</th>
                        <th className="text-right py-3 font-medium">Last Year</th>
                        <th className="text-right py-3 font-medium">Current Budget</th>
                        <th className="text-right py-3 font-medium">YoY Change</th>
                        <th className="text-right py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Salaries & Benefits</td>
                        <td className="text-right py-3">$580,000</td>
                        <td className="text-right py-3">$650,000</td>
                        <td className="text-right py-3 text-finance-positive">+12%</td>
                        <td className="text-right py-3">Approved</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Marketing</td>
                        <td className="text-right py-3">$225,000</td>
                        <td className="text-right py-3">$250,000</td>
                        <td className="text-right py-3 text-finance-positive">+11.1%</td>
                        <td className="text-right py-3">Under Review</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Operations</td>
                        <td className="text-right py-3">$175,000</td>
                        <td className="text-right py-3">$180,000</td>
                        <td className="text-right py-3 text-finance-positive">+2.9%</td>
                        <td className="text-right py-3">Approved</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Technology</td>
                        <td className="text-right py-3">$100,000</td>
                        <td className="text-right py-3">$120,000</td>
                        <td className="text-right py-3 text-finance-positive">+20%</td>
                        <td className="text-right py-3">Draft</td>
                      </tr>
                      <tr>
                        <td className="py-3">Other</td>
                        <td className="text-right py-3">$50,000</td>
                        <td className="text-right py-3">$48,000</td>
                        <td className="text-right py-3 text-finance-negative">-4%</td>
                        <td className="text-right py-3">Approved</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t">
                        <th className="text-left py-3 font-medium">Total</th>
                        <th className="text-right py-3 font-medium">$1,130,000</th>
                        <th className="text-right py-3 font-medium">$1,248,000</th>
                        <th className="text-right py-3 font-medium text-finance-positive">+10.4%</th>
                        <th className="text-right py-3 font-medium"></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Planning Tools</CardTitle>
              <CardDescription>Utilize our planning tools to optimize your budget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Scenario Planning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Create different budget scenarios to plan for various business conditions.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Launch Tool</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Forecasting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Predict future budget needs based on historical data and trends.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Launch Tool</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Variance Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Compare actual spending to budgeted amounts and analyze the differences.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Launch Tool</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetPlanning;
