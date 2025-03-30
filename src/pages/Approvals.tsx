import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ApprovalItem } from "@/types/approval";
import { PendingApprovalsList } from "@/components/approvals/PendingApprovalsList";
import { ApprovalDetailView } from "@/components/approvals/ApprovalDetailView";
import { ApprovalHistoryTable } from "@/components/approvals/ApprovalHistoryTable";

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
        <PendingApprovalsList
          items={filteredItems.pending}
          selectedItem={selectedItem}
          onSelectItem={setSelectedItem}
        />
        
        <ApprovalDetailView
          selectedItem={selectedItem}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Approval History</CardTitle>
          <CardDescription>View all approval requests and their statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <ApprovalHistoryTable
            items={filteredItems}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Approvals;
