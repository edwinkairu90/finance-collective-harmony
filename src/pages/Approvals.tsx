
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

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

const Approvals = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [comment, setComment] = useState("");
  const [items, setItems] = useState<ApprovalItem[]>(approvalItems);
  const [activeTab, setActiveTab] = useState("pending");

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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Budget Approvals</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="bg-amber-50 border-b">
            <CardTitle className="flex justify-between text-xl">
              <span>Pending</span>
              <Badge variant="outline">{filteredItems.pending.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-300px)]">
              {filteredItems.pending.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border-b last:border-0 cursor-pointer hover:bg-gray-50 text-sm ${
                    selectedItem?.id === item.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">{item.title}</div>
                    <Badge variant="outline" className="text-xs">${item.amount.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
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
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedItem.title}</CardTitle>
                  <CardDescription>
                    {selectedItem.department} - ${selectedItem.amount.toLocaleString()}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    selectedItem.status === "approved"
                      ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs px-3 py-0.5"
                      : selectedItem.status === "rejected"
                      ? "bg-red-100 text-red-800 hover:bg-red-100 text-xs px-3 py-0.5"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs px-3 py-0.5"
                  }
                >
                  {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-medium mb-1 text-sm">Request Details</div>
                <p className="text-muted-foreground text-sm">
                  {selectedItem.description}
                </p>
              </div>

              <div>
                <div className="font-medium mb-1 text-sm">Submitted By</div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs">{selectedItem.submitter.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{selectedItem.submitter.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedItem.dateSubmitted}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-medium mb-1 text-sm">Add Comment</div>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comments here..."
                  className="resize-none text-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              {selectedItem.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 text-xs h-8"
                    onClick={() => handleReject(selectedItem.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-xs h-8"
                    onClick={() => handleApprove(selectedItem.id)}
                  >
                    Approve
                  </Button>
                </>
              )}
              {selectedItem.status !== "pending" && (
                <Button variant="outline" className="text-xs h-8" onClick={() => setSelectedItem(null)}>
                  Close
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="md:col-span-2">
            <CardContent className="flex flex-col items-center justify-center h-full py-12">
              <div className="text-center space-y-2 text-muted-foreground">
                <div className="text-6xl mb-4">👈</div>
                <h3 className="text-xl font-medium">Select an item</h3>
                <p className="text-sm">Click on a request to review the details and take action</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Approval History</CardTitle>
          <CardDescription>View all approval requests and their statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending" className="text-sm">
                Pending ({filteredItems.pending.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="text-sm">
                Approved ({filteredItems.approved.length})
              </TabsTrigger>
              <TabsTrigger value="rejected" className="text-sm">
                Rejected ({filteredItems.rejected.length})
              </TabsTrigger>
            </TabsList>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium text-sm">Title</th>
                    <th className="text-left py-3 font-medium text-sm">Department</th>
                    <th className="text-left py-3 font-medium text-sm">Requester</th>
                    <th className="text-left py-3 font-medium text-sm">Date</th>
                    <th className="text-right py-3 font-medium text-sm">Amount</th>
                    <th className="text-right py-3 font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems[activeTab as keyof typeof filteredItems].map((item) => (
                    <tr key={item.id} className="border-b text-sm">
                      <td className="py-3">{item.title}</td>
                      <td className="py-3">{item.department}</td>
                      <td className="py-3">{item.submitter.name}</td>
                      <td className="py-3">{item.dateSubmitted}</td>
                      <td className="text-right py-3">${item.amount.toLocaleString()}</td>
                      <td className="text-right py-3">
                        <Badge
                          className={
                            item.status === "approved"
                              ? "bg-green-100 text-green-800 hover:bg-green-100 text-xs px-3 py-0.5"
                              : item.status === "rejected"
                              ? "bg-red-100 text-red-800 hover:bg-red-100 text-xs px-3 py-0.5"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs px-3 py-0.5"
                          }
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Approvals;
