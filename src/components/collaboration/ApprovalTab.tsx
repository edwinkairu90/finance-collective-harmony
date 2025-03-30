
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History } from "lucide-react";

interface ApprovalItem {
  id: string;
  title: string;
  department: string;
  submitter: {
    name: string;
    avatar: string;
  };
  dateSubmitted: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  description: string;
}

interface HistoricalApproval {
  id: string;
  title: string;
  department: string;
  amount: number;
  requestedBy: string;
  requestDate: string;
  approvedBy: string;
  approvedDate: string;
  status: "approved" | "rejected";
}

const approvalItems: ApprovalItem[] = [
  {
    id: "ap-001",
    title: "Q3 Marketing Budget Increase",
    department: "Marketing",
    submitter: {
      name: "Jane Lee",
      avatar: "JL",
    },
    dateSubmitted: "Aug 15, 2023",
    amount: 32000,
    status: "pending",
    description: "Request to increase digital marketing budget for Q3 campaign targeting new market segments.",
  },
  {
    id: "ap-002",
    title: "Sales Team Training Program",
    department: "Sales",
    submitter: {
      name: "John Doe",
      avatar: "JD",
    },
    dateSubmitted: "Aug 14, 2023",
    amount: 15000,
    status: "pending",
    description: "Advanced sales techniques training program for the entire team to improve conversion rates.",
  },
  {
    id: "ap-003",
    title: "Office Equipment Upgrade",
    department: "Operations",
    submitter: {
      name: "Lisa Geller",
      avatar: "LG",
    },
    dateSubmitted: "Aug 12, 2023",
    amount: 8500,
    status: "pending",
    description: "Replace outdated workstations and purchase ergonomic chairs for the customer support team.",
  },
  {
    id: "ap-004",
    title: "Cloud Infrastructure Expansion",
    department: "Engineering",
    submitter: {
      name: "Robert Kim",
      avatar: "RK",
    },
    dateSubmitted: "Aug 10, 2023",
    amount: 45000,
    status: "pending",
    description: "Increase cloud server capacity to support new product features and growing user base.",
  },
  {
    id: "ap-005",
    title: "Customer Success Portal",
    department: "Customer Support",
    submitter: {
      name: "Sarah Chen",
      avatar: "SC",
    },
    dateSubmitted: "Aug 9, 2023",
    amount: 28000,
    status: "pending",
    description: "Development of a customer success portal to improve customer onboarding and reduce support tickets.",
  },
  {
    id: "ap-006",
    title: "HR Recruitment Software",
    department: "Human Resources",
    submitter: {
      name: "Mike Peters",
      avatar: "MP",
    },
    dateSubmitted: "Aug 8, 2023",
    amount: 12000,
    status: "pending",
    description: "Annual subscription for advanced recruitment and applicant tracking software.",
  },
  {
    id: "ap-007",
    title: "Team Building Event",
    department: "Human Resources",
    submitter: {
      name: "Mike Peters",
      avatar: "MP",
    },
    dateSubmitted: "Aug 7, 2023",
    amount: 5000,
    status: "pending",
    description: "Company-wide team building event to improve collaboration across departments.",
  },
];

// Historical approval data
const historicalApprovals: HistoricalApproval[] = [
  {
    id: "ha-001",
    title: "Q2 Marketing Campaign",
    department: "Marketing",
    amount: 28500,
    requestedBy: "Jane Lee",
    requestDate: "May 10, 2023",
    approvedBy: "David Wilson",
    approvedDate: "May 12, 2023",
    status: "approved"
  },
  {
    id: "ha-002",
    title: "Sales Conference",
    department: "Sales",
    amount: 18000,
    requestedBy: "John Doe",
    requestDate: "Apr 22, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Apr 25, 2023",
    status: "approved"
  },
  {
    id: "ha-003",
    title: "Developer Licenses",
    department: "Engineering",
    amount: 9500,
    requestedBy: "Robert Kim",
    requestDate: "Apr 15, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Apr 16, 2023",
    status: "approved"
  },
  {
    id: "ha-004",
    title: "Office Renovation",
    department: "Operations",
    amount: 45000,
    requestedBy: "Lisa Geller",
    requestDate: "Mar 28, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Apr 2, 2023",
    status: "rejected"
  },
  {
    id: "ha-005",
    title: "Customer Support Training",
    department: "Customer Support",
    amount: 12500,
    requestedBy: "Sarah Chen",
    requestDate: "Mar 15, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Mar 17, 2023",
    status: "approved"
  }
];

export const ApprovalTab = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [comment, setComment] = useState("");
  const [items, setItems] = useState<ApprovalItem[]>(approvalItems);
  const [activeTab, setActiveTab] = useState("current");

  const handleApprove = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item
      )
    );
    toast({
      title: "Approved",
      description: "The budget request has been approved.",
    });
    setSelectedItem(null);
  };

  const handleReject = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item
      )
    );
    toast({
      title: "Rejected",
      description: "The budget request has been rejected.",
    });
    setSelectedItem(null);
  };

  const filteredItems = {
    pending: items.filter((item) => item.status === "pending"),
    approved: items.filter((item) => item.status === "approved"),
    rejected: items.filter((item) => item.status === "rejected"),
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="current" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="current" className="text-xs">Current Approvals</TabsTrigger>
          <TabsTrigger value="history" className="text-xs">
            <History className="w-3.5 h-3.5 mr-1" />
            Approval History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="bg-amber-50 border-b py-3">
                <CardTitle className="flex justify-between text-base">
                  <span>Pending</span>
                  <Badge variant="outline" className="text-xs">{filteredItems.pending.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-380px)]">
                  {filteredItems.pending.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 border-b last:border-0 cursor-pointer hover:bg-gray-50 text-xs ${
                        selectedItem?.id === item.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{item.title}</div>
                        <Badge variant="outline" className="text-xs">${item.amount.toLocaleString()}</Badge>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">
                              {item.submitter.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-muted-foreground">
                            {item.department}
                          </span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {item.dateSubmitted}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {selectedItem ? (
              <Card className="md:col-span-2">
                <CardHeader className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{selectedItem.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {selectedItem.department} - ${selectedItem.amount.toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        selectedItem.status === "approved"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0.5"
                          : selectedItem.status === "rejected"
                          ? "bg-red-100 text-red-800 hover:bg-red-100 text-xs px-2 py-0.5"
                          : "bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs px-2 py-0.5"
                      }
                    >
                      {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 py-0">
                  <div>
                    <div className="font-medium mb-1 text-xs">Request Details</div>
                    <p className="text-muted-foreground text-xs">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div>
                    <div className="font-medium mb-1 text-xs">Submitted By</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{selectedItem.submitter.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs">{selectedItem.submitter.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {selectedItem.dateSubmitted}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="font-medium mb-1 text-xs">Add Comment</div>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter your comments here..."
                      className="resize-none text-xs"
                    />
                  </div>
                </CardContent>
                <CardFooter className="space-x-2 py-3">
                  {selectedItem.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 text-xs h-7"
                        onClick={() => handleReject(selectedItem.id)}
                      >
                        Reject
                      </Button>
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-xs h-7"
                        onClick={() => handleApprove(selectedItem.id)}
                      >
                        Approve
                      </Button>
                    </>
                  )}
                  {selectedItem.status !== "pending" && (
                    <Button variant="outline" className="text-xs h-7" onClick={() => setSelectedItem(null)}>
                      Close
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ) : (
              <Card className="md:col-span-2">
                <CardContent className="flex flex-col items-center justify-center h-full py-12">
                  <div className="text-center space-y-2 text-muted-foreground">
                    <div className="text-5xl mb-3">👈</div>
                    <h3 className="text-lg font-medium">Select an item</h3>
                    <p className="text-xs">Click on a request to review the details and take action</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-base">Approval History</CardTitle>
              <CardDescription className="text-xs">
                Past approvals and rejections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="text-xs">
                    <TableHead className="w-[250px]">Request</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicalApprovals.map((item) => (
                    <TableRow key={item.id} className="text-xs">
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>${item.amount.toLocaleString()}</TableCell>
                      <TableCell>{item.requestedBy}</TableCell>
                      <TableCell>{item.requestDate}</TableCell>
                      <TableCell>{item.approvedBy}</TableCell>
                      <TableCell>
                        <Badge className={
                          item.status === "approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs px-2 py-0.5"
                            : "bg-red-100 text-red-800 hover:bg-red-100 text-xs px-2 py-0.5"
                        }>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

