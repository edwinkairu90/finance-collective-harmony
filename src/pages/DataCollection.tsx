
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DataCollection = () => {
  const { toast } = useToast();

  const handleSend = () => {
    toast({
      title: "Reminder Sent",
      description: "Reminder has been sent to all pending contributors.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Data Submitted",
      description: "Your data has been submitted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Data Collection</h1>
        <Button onClick={handleSend}>Send Reminders</Button>
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">Collection Status</TabsTrigger>
          <TabsTrigger value="submit">Submit Data</TabsTrigger>
          <TabsTrigger value="history">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Q3 2023 Budget Data Collection</CardTitle>
              <CardDescription>Status overview for all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>Overall Completion</div>
                  <div>65%</div>
                </div>
                <Progress value={65} className="h-2" />

                <div className="pt-6 space-y-4">
                  <div className="grid grid-cols-4 text-sm font-medium">
                    <div>Department</div>
                    <div>Assigned To</div>
                    <div>Status</div>
                    <div>Due Date</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                    <div>Sales</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span>John Doe</span>
                    </div>
                    <div><Badge className="bg-green-500">Completed</Badge></div>
                    <div>Aug 15, 2023</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                    <div>Marketing</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JL</AvatarFallback>
                      </Avatar>
                      <span>Jane Lee</span>
                    </div>
                    <div><Badge className="bg-amber-500">In Progress</Badge></div>
                    <div>Aug 18, 2023</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                    <div>Engineering</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>RK</AvatarFallback>
                      </Avatar>
                      <span>Robert Kim</span>
                    </div>
                    <div><Badge className="bg-green-500">Completed</Badge></div>
                    <div>Aug 12, 2023</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                    <div>Customer Support</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <span>Sarah Chen</span>
                    </div>
                    <div><Badge className="bg-green-500">Completed</Badge></div>
                    <div>Aug 10, 2023</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                    <div>Finance</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MP</AvatarFallback>
                      </Avatar>
                      <span>Mike Peters</span>
                    </div>
                    <div><Badge>Not Started</Badge></div>
                    <div>Aug 20, 2023</div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                    <div>Human Resources</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>LG</AvatarFallback>
                      </Avatar>
                      <span>Lisa Geller</span>
                    </div>
                    <div><Badge className="bg-amber-500">In Progress</Badge></div>
                    <div>Aug 18, 2023</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Department Data</CardTitle>
              <CardDescription>Enter your department's financial planning data</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <select className="w-full p-2 border rounded-md" id="department">
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="engineering">Engineering</option>
                      <option value="finance">Finance</option>
                      <option value="hr">Human Resources</option>
                      <option value="support">Customer Support</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period">Period</Label>
                    <select className="w-full p-2 border rounded-md" id="period">
                      <option value="Q1-2023">Q1 2023</option>
                      <option value="Q2-2023">Q2 2023</option>
                      <option value="Q3-2023" selected>Q3 2023</option>
                      <option value="Q4-2023">Q4 2023</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Current Quarter Projections</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="revenue">Revenue</Label>
                      <Input id="revenue" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expenses">Expenses</Label>
                      <Input id="expenses" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="headcount">Headcount</Label>
                      <Input id="headcount" type="number" placeholder="0" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Major Expense Categories</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="labor">Labor</Label>
                      <Input id="labor" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="materials">Materials/Supplies</Label>
                      <Input id="materials" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="services">External Services</Label>
                      <Input id="services" type="number" placeholder="0.00" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional context or notes here..." className="min-h-[100px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload Supporting Documents</Label>
                  <Input id="file" type="file" />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline">Save Draft</Button>
                  <Button type="submit">Submit Data</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>View and download previous submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium">Period</th>
                        <th className="text-left py-3 font-medium">Department</th>
                        <th className="text-right py-3 font-medium">Revenue</th>
                        <th className="text-right py-3 font-medium">Expenses</th>
                        <th className="text-right py-3 font-medium">Submitted By</th>
                        <th className="text-right py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Q2 2023</td>
                        <td className="py-3">Marketing</td>
                        <td className="text-right py-3">$245,000</td>
                        <td className="text-right py-3">$198,000</td>
                        <td className="text-right py-3">Jane Lee</td>
                        <td className="text-right py-3">
                          <Button variant="link" className="h-auto p-0">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Q2 2023</td>
                        <td className="py-3">Sales</td>
                        <td className="text-right py-3">$380,000</td>
                        <td className="text-right py-3">$320,000</td>
                        <td className="text-right py-3">John Doe</td>
                        <td className="text-right py-3">
                          <Button variant="link" className="h-auto p-0">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Q1 2023</td>
                        <td className="py-3">Marketing</td>
                        <td className="text-right py-3">$230,000</td>
                        <td className="text-right py-3">$185,000</td>
                        <td className="text-right py-3">Jane Lee</td>
                        <td className="text-right py-3">
                          <Button variant="link" className="h-auto p-0">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Q1 2023</td>
                        <td className="py-3">Sales</td>
                        <td className="text-right py-3">$365,000</td>
                        <td className="text-right py-3">$310,000</td>
                        <td className="text-right py-3">John Doe</td>
                        <td className="text-right py-3">
                          <Button variant="link" className="h-auto p-0">View</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Q4 2022</td>
                        <td className="py-3">Engineering</td>
                        <td className="text-right py-3">$0</td>
                        <td className="text-right py-3">$420,000</td>
                        <td className="text-right py-3">Robert Kim</td>
                        <td className="text-right py-3">
                          <Button variant="link" className="h-auto p-0">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Export All Data</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataCollection;
