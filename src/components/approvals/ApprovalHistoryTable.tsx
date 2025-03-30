
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApprovalItem } from "@/types/approval";
import { ApprovalStatusBadge } from "./ApprovalStatusBadge";

interface ApprovalHistoryTableProps {
  items: {
    pending: ApprovalItem[];
    approved: ApprovalItem[];
    rejected: ApprovalItem[];
  };
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const ApprovalHistoryTable = ({
  items,
  activeTab,
  onTabChange,
}: ApprovalHistoryTableProps) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="pending" className="text-sm">
          Pending ({items.pending.length})
        </TabsTrigger>
        <TabsTrigger value="approved" className="text-sm">
          Approved ({items.approved.length})
        </TabsTrigger>
        <TabsTrigger value="rejected" className="text-sm">
          Rejected ({items.rejected.length})
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
            {items[activeTab as keyof typeof items].map((item) => (
              <tr key={item.id} className="border-b text-sm">
                <td className="py-3">{item.title}</td>
                <td className="py-3">{item.department}</td>
                <td className="py-3">{item.submitter.name}</td>
                <td className="py-3">{item.dateSubmitted}</td>
                <td className="text-right py-3">${item.amount.toLocaleString()}</td>
                <td className="text-right py-3">
                  <ApprovalStatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tabs>
  );
};
