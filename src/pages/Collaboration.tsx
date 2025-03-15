import React, { useState } from "react";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Pencil, Save, X, Trash } from "lucide-react";

interface LineItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  notes?: string;
}

interface BudgetRequestData {
  id: string;
  department: string;
  totalAmount: number;
  period: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  status: 'completed' | 'in-progress' | 'not-started';
  dueDate: string;
  lineItems: LineItem[];
}

const budgetRequests: BudgetRequestData[] = [
  {
    id: "sales-q3",
    department: "Sales",
    totalAmount: 245000,
    period: "Q3 2025",
    assignedTo: {
      name: "John Doe",
      avatar: "JD",
    },
    status: "completed",
    dueDate: "Aug 15, 2025",
    lineItems: [
      { id: "s1", description: "Sales Training Program", amount: 75000, category: "Training" },
      { id: "s2", description: "Conference Attendance", amount: 45000, category: "Events" },
      { id: "s3", description: "CRM Software Licenses", amount: 35000, category: "Software" },
      { id: "s4", description: "Lead Generation Campaign", amount: 60000, category: "Marketing" },
      { id: "s5", description: "Sales Team Incentives", amount: 30000, category: "Compensation" },
    ]
  },
  {
    id: "marketing-q3",
    department: "Marketing",
    totalAmount: 250000,
    period: "Q3 2025",
    assignedTo: {
      name: "Jane Lee",
      avatar: "JL",
    },
    status: "in-progress",
    dueDate: "Aug 18, 2025",
    lineItems: [
      { id: "m1", description: "Digital Advertising", amount: 120000, category: "Advertising" },
      { id: "m2", description: "Content Creation", amount: 45000, category: "Creative" },
      { id: "m3", description: "Events & Sponsorships", amount: 60000, category: "Events" },
      { id: "m4", description: "Brand Development", amount: 25000, category: "Branding" },
    ]
  },
  {
    id: "engineering-q3",
    department: "Engineering",
    totalAmount: 410000,
    period: "Q3 2025",
    assignedTo: {
      name: "Robert Kim",
      avatar: "RK",
    },
    status: "completed",
    dueDate: "Aug 12, 2025",
    lineItems: [
      { id: "e1", description: "Cloud Infrastructure", amount: 150000, category: "Infrastructure" },
      { id: "e2", description: "Development Tools", amount: 75000, category: "Software" },
      { id: "e3", description: "QA Automation", amount: 95000, category: "Testing" },
      { id: "e4", description: "Security Audit", amount: 45000, category: "Security" },
      { id: "e5", description: "Technical Documentation", amount: 45000, category: "Documentation" },
    ]
  },
  {
    id: "support-q3",
    department: "Customer Support",
    totalAmount: 180000,
    period: "Q3 2025",
    assignedTo: {
      name: "Sarah Chen",
      avatar: "SC",
    },
    status: "completed",
    dueDate: "Aug 10, 2025",
    lineItems: [
      { id: "cs1", description: "Support Platform", amount: 85000, category: "Software" },
      { id: "cs2", description: "Knowledge Base Updates", amount: 35000, category: "Documentation" },
      { id: "cs3", description: "Customer Success Training", amount: 60000, category: "Training" },
    ]
  },
  {
    id: "finance-q3",
    department: "Finance",
    totalAmount: 120000,
    period: "Q3 2025",
    assignedTo: {
      name: "Mike Peters",
      avatar: "MP",
    },
    status: "not-started",
    dueDate: "Aug 20, 2025",
    lineItems: [
      { id: "f1", description: "Financial Software Upgrade", amount: 75000, category: "Software" },
      { id: "f2", description: "Compliance Training", amount: 25000, category: "Training" },
      { id: "f3", description: "Audit Services", amount: 20000, category: "Professional Services" },
    ]
  },
  {
    id: "hr-q3",
    department: "Human Resources",
    totalAmount: 155000,
    period: "Q3 2025",
    assignedTo: {
      name: "Lisa Geller",
      avatar: "LG",
    },
    status: "in-progress",
    dueDate: "Aug 18, 2025",
    lineItems: [
      { id: "h1", description: "Recruitment Software", amount: 45000, category: "Software" },
      { id: "h2", description: "Employee Training Program", amount: 60000, category: "Training" },
      { id: "h3", description: "Team Building Activities", amount: 30000, category: "Events" },
      { id: "h4", description: "Benefits Administration", amount: 20000, category: "Administration" },
    ]
  },
];

const historicalData = [
  { period: "Q2 2025", department: "Marketing", revenue: 245000, expenses: 198000, submittedBy: "Jane Lee" },
  { period: "Q2 2025", department: "Sales", revenue: 380000, expenses: 320000, submittedBy: "John Doe" },
  { period: "Q1 2025", department: "Marketing", revenue: 230000, expenses: 185000, submittedBy: "Jane Lee" },
  { period: "Q1 2025", department: "Sales", revenue: 365000, expenses: 310000, submittedBy: "John Doe" },
  { period: "Q4 2024", department: "Engineering", revenue: 0, expenses: 420000, submittedBy: "Robert Kim" },
];

// Category options for dropdown
const categories = [
  "Training", 
  "Events", 
  "Software", 
  "Marketing", 
  "Compensation", 
  "Infrastructure", 
  "Testing", 
  "Security", 
  "Documentation", 
  "Professional Services", 
  "Administration", 
  "Advertising", 
  "Creative", 
  "Branding"
];

const Collaboration = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<BudgetRequestData | null>(null);
  const [isLineItemsOpen, setIsLineItemsOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [editedLineItems, setEditedLineItems] = useState<LineItem[]>([]);
  const [newItem, setNewItem] = useState<Omit<LineItem, 'id'>>({
    description: '',
    amount: 0,
    category: categories[0],
  });

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
      description: "Your budget request has been submitted successfully.",
    });
  };

  const handleViewLineItems = (department: BudgetRequestData) => {
    setSelectedDepartment(department);
    setEditedLineItems(department.lineItems);
    setIsLineItemsOpen(true);
  };

  const startEditingItem = (itemId: string) => {
    setEditingItemId(itemId);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
    if (selectedDepartment) {
      setEditedLineItems(selectedDepartment.lineItems);
    }
  };

  const startAddingItem = () => {
    setIsAddingNewItem(true);
    setNewItem({
      description: '',
      amount: 0,
      category: categories[0],
    });
  };

  const cancelAddingItem = () => {
    setIsAddingNewItem(false);
  };

  const handleItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setEditedLineItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleNewItemChange = (field: keyof Omit<LineItem, 'id'>, value: string | number) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const saveEditedItem = () => {
    if (selectedDepartment && editingItemId) {
      // Update the budget request with edited line items
      const updatedRequests = budgetRequests.map(req => 
        req.id === selectedDepartment.id 
          ? { 
              ...req, 
              lineItems: editedLineItems,
              totalAmount: editedLineItems.reduce((sum, item) => sum + item.amount, 0)
            } 
          : req
      );
      
      // Find the updated department to update the selectedDepartment state
      const updatedDepartment = updatedRequests.find(req => req.id === selectedDepartment.id);
      if (updatedDepartment) {
        setSelectedDepartment(updatedDepartment);
      }
      
      setEditingItemId(null);
      toast({
        title: "Item Updated",
        description: "The line item has been updated successfully.",
      });
    }
  };

  const saveNewItem = () => {
    if (selectedDepartment) {
      const newId = `new-${Date.now()}`;
      const newLineItem: LineItem = {
        id: newId,
        ...newItem
      };
      
      const updatedLineItems = [...editedLineItems, newLineItem];
      
      // Update the budget request with the new line item
      const updatedRequests = budgetRequests.map(req => 
        req.id === selectedDepartment.id 
          ? { 
              ...req, 
              lineItems: updatedLineItems,
              totalAmount: updatedLineItems.reduce((sum, item) => sum + item.amount, 0)
            } 
          : req
      );
      
      // Find the updated department to update the selectedDepartment state
      const updatedDepartment = updatedRequests.find(req => req.id === selectedDepartment.id);
      if (updatedDepartment) {
        setSelectedDepartment(updatedDepartment);
        setEditedLineItems(updatedDepartment.lineItems);
      }
      
      setIsAddingNewItem(false);
      setNewItem({
        description: '',
        amount: 0,
        category: categories[0],
      });
      
      toast({
        title: "Item Added",
        description: "A new line item has been added to the budget request.",
      });
    }
  };

  const deleteLineItem = (itemId: string) => {
    if (selectedDepartment) {
      const updatedLineItems = editedLineItems.filter(item => item.id !== itemId);
      
      // Update the budget request with the filtered line items
      const updatedRequests = budgetRequests.map(req => 
        req.id === selectedDepartment.id 
          ? { 
              ...req, 
              lineItems: updatedLineItems,
              totalAmount: updatedLineItems.reduce((sum, item) => sum + item.amount, 0)
            } 
          : req
      );
      
      // Find the updated department to update the selectedDepartment state
      const updatedDepartment = updatedRequests.find(req => req.id === selectedDepartment.id);
      if (updatedDepartment) {
        setSelectedDepartment(updatedDepartment);
        setEditedLineItems(updatedLineItems);
      }
      
      toast({
        title: "Item Deleted",
        description: "The line item has been removed from the budget request.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Collaboration</h1>
        <Button onClick={handleSend}>Send Reminders</Button>
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">Collaboration Status</TabsTrigger>
          <TabsTrigger value="submit">Submit Budget Request</TabsTrigger>
          <TabsTrigger value="history">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Q3 2025 Budget Collaboration</CardTitle>
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
                  <div className="grid grid-cols-5 text-sm font-medium">
                    <div>Department</div>
                    <div>Assigned To</div>
                    <div>Status</div>
                    <div>Due Date</div>
                    <div>Actions</div>
                  </div>

                  {budgetRequests.map((item) => (
                    <div key={item.id} className="grid grid-cols-5 items-center gap-4 border-t pt-4">
                      <div>{item.department}</div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{item.assignedTo.avatar}</AvatarFallback>
                        </Avatar>
                        <span>{item.assignedTo.name}</span>
                      </div>
                      <div>
                        <Badge className={
                          item.status === "completed" 
                            ? "bg-green-500" 
                            : item.status === "in-progress" 
                              ? "bg-amber-500" 
                              : ""
                        }>
                          {item.status === "completed" 
                            ? "Completed" 
                            : item.status === "in-progress" 
                              ? "In Progress" 
                              : "Not Started"}
                        </Badge>
                      </div>
                      <div>{item.dueDate}</div>
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewLineItems(item)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Department Budget Request</CardTitle>
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
                      <option value="Q1-2025">Q1 2025</option>
                      <option value="Q2-2025">Q2 2025</option>
                      <option value="Q3-2025" selected>Q3 2025</option>
                      <option value="Q4-2025">Q4 2025</option>
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
                  <Button type="submit">Submit Request</Button>
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
                      {historicalData.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3">{item.period}</td>
                          <td className="py-3">{item.department}</td>
                          <td className="text-right py-3">${item.revenue.toLocaleString()}</td>
                          <td className="text-right py-3">${item.expenses.toLocaleString()}</td>
                          <td className="text-right py-3">{item.submittedBy}</td>
                          <td className="text-right py-3">
                            <Button variant="link" className="h-auto p-0">View</Button>
                          </td>
                        </tr>
                      ))}
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

      <Dialog open={isLineItemsOpen} onOpenChange={setIsLineItemsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedDepartment?.department} Budget Line Items</DialogTitle>
            <DialogDescription>
              Detailed breakdown of the ${selectedDepartment?.totalAmount.toLocaleString()} budget request for {selectedDepartment?.period}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Assigned to</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{selectedDepartment?.assignedTo.avatar}</AvatarFallback>
                    </Avatar>
                    <span>{selectedDepartment?.assignedTo.name}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={
                    selectedDepartment?.status === "completed" 
                      ? "bg-green-500 mt-1" 
                      : selectedDepartment?.status === "in-progress" 
                        ? "bg-amber-500 mt-1" 
                        : "mt-1"
                  }>
                    {selectedDepartment?.status === "completed" 
                      ? "Completed" 
                      : selectedDepartment?.status === "in-progress" 
                        ? "In Progress" 
                        : "Not Started"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-lg">Line Items</h3>
                  <Button 
                    onClick={startAddingItem} 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" /> Add Item
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editedLineItems.map((item) => (
                      <TableRow key={item.id}>
                        {editingItemId === item.id ? (
                          <>
                            <TableCell>
                              <Input 
                                value={item.description} 
                                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <select 
                                className="w-full p-2 border rounded-md"
                                value={item.category}
                                onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                              >
                                {categories.map(category => (
                                  <option key={category} value={category}>{category}</option>
                                ))}
                              </select>
                            </TableCell>
                            <TableCell className="text-right">
                              <Input 
                                type="number"
                                value={item.amount} 
                                onChange={(e) => handleItemChange(item.id, 'amount', Number(e.target.value))}
                                className="text-right"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={saveEditedItem}
                                >
                                  <Save className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={cancelEditing}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => startEditingItem(item.id)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => deleteLineItem(item.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                    
                    {isAddingNewItem && (
                      <TableRow>
                        <TableCell>
                          <Input 
                            value={newItem.description} 
                            onChange={(e) => handleNewItemChange('description', e.target.value)}
                            placeholder="Enter description"
                          />
                        </TableCell>
                        <TableCell>
                          <select 
                            className="w-full p-2 border rounded-md"
                            value={newItem.category}
                            onChange={(e) => handleNewItemChange('category', e.target.value)}
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Input 
                            type="number"
                            value={newItem.amount} 
                            onChange={(e) => handleNewItemChange('amount', Number(e.target.value))}
                            className="text-right"
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={saveNewItem}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={cancelAddingItem}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Budget Amount</span>
                  <span className="font-bold">${selectedDepartment?.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Comments</h3>
                <Textarea placeholder="Add a comment about this budget request..." className="min-h-[100px]" />
              </div>
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline">Add Comment</Button>
            <Button>Request Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Collaboration;
