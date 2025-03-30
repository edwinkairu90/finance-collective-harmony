
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HistoricalApproval } from "../../../types/approval";
import { ApprovalHistoryDetailsDialog } from "./ApprovalHistoryDetailsDialog";

interface ApprovalHistoryProps {
  historicalApprovals: HistoricalApproval[];
}

export const ApprovalHistory = ({ historicalApprovals }: ApprovalHistoryProps) => {
  const [selectedItem, setSelectedItem] = useState<HistoricalApproval | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleRowClick = (item: HistoricalApproval) => {
    if (item.status === "approved" || item.status === "rejected") {
      setSelectedItem(item);
      setIsDetailsOpen(true);
    }
  };

  return (
    <>
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
                <TableRow 
                  key={item.id} 
                  className={`text-xs ${
                    (item.status === "approved" || item.status === "rejected") 
                      ? "cursor-pointer hover:bg-gray-50" 
                      : ""
                  }`}
                  onClick={() => handleRowClick(item)}
                >
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

      <ApprovalHistoryDetailsDialog 
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        item={selectedItem}
      />
    </>
  );
};
