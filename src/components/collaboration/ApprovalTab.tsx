
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History } from "lucide-react";
import { ApprovalItemsList } from "./approval/ApprovalItemsList";
import { ApprovalDetails } from "./approval/ApprovalDetails";
import { ApprovalHistory } from "./approval/ApprovalHistory";
import { approvalItems, historicalApprovals } from "../../data/approvalData";
import { ApprovalItem } from "../../types/approval";

export const ApprovalTab = () => {
  const { toast } = useToast();
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <ApprovalItemsList 
                items={filteredItems.pending} 
                selectedItem={selectedItem} 
                onSelectItem={setSelectedItem} 
              />
            </div>
            
            <div className="md:col-span-1">
              <ApprovalDetails 
                selectedItem={selectedItem}
                onApprove={handleApprove}
                onReject={handleReject}
                onClose={() => setSelectedItem(null)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <ApprovalHistory historicalApprovals={historicalApprovals} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
