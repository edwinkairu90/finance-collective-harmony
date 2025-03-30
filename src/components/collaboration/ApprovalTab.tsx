
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History } from "lucide-react";
import { ApprovalItemsList } from "./approval/ApprovalItemsList";
import { ApprovalDetails } from "./approval/ApprovalDetails";
import { ApprovalHistory } from "./approval/ApprovalHistory";
import { approvalItems, historicalApprovals } from "../../data/approvalData";
import { ApprovalItem } from "../../types/approval";
import { useAuth } from "@/context/AuthContext";

export const ApprovalTab = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [items, setItems] = useState<ApprovalItem[]>(approvalItems);
  const [activeTab, setActiveTab] = useState("current");

  const handleApprove = (id: string, reason: string) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    setItems(
      items.map((item) =>
        item.id === id ? { 
          ...item, 
          status: "approved",
          approver: {
            name: user?.name || "Admin User",
            avatar: user?.name ? user.name.substring(0, 2).toUpperCase() : "AU"
          },
          approvalDate: currentDate,
          reason: reason.trim() || "Approved based on budget alignment and business needs."
        } : item
      )
    );
    toast({
      title: "Approved",
      description: "The budget request has been approved.",
    });
    setSelectedItem(null);
  };

  const handleReject = (id: string, reason: string) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    setItems(
      items.map((item) =>
        item.id === id ? { 
          ...item, 
          status: "rejected",
          approver: {
            name: user?.name || "Admin User",
            avatar: user?.name ? user.name.substring(0, 2).toUpperCase() : "AU"
          },
          approvalDate: currentDate,
          reason: reason.trim() || "Rejected due to budget constraints."
        } : item
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
            <ApprovalItemsList 
              items={filteredItems.pending} 
              selectedItem={selectedItem} 
              onSelectItem={setSelectedItem} 
            />
            
            <ApprovalDetails 
              selectedItem={selectedItem}
              onApprove={handleApprove}
              onReject={handleReject}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        </TabsContent>

        <TabsContent value="history">
          <ApprovalHistory historicalApprovals={historicalApprovals} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
