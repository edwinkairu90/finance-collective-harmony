
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { HistoricalApproval } from "../../../types/approval";

interface ApprovalHistoryDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: HistoricalApproval | null;
}

export const ApprovalHistoryDetailsDialog = ({
  isOpen,
  onOpenChange,
  item
}: ApprovalHistoryDetailsDialogProps) => {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center justify-between">
            <span>{item.title}</span>
            <Badge className={
              item.status === "approved"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "bg-red-100 text-red-800 hover:bg-red-100"
            }>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
          </DialogTitle>
          <DialogDescription className="pt-2">
            {item.department} - ${item.amount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-1">Request Details</h4>
            <p className="text-muted-foreground">
              {item.status === "approved" 
                ? "This budget request was approved by the finance department."
                : "This budget request was rejected due to budget constraints."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-1">Requested By</h4>
              <p className="text-muted-foreground">{item.requestedBy}</p>
              <p className="text-muted-foreground text-xs">{item.requestDate}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Reviewed By</h4>
              <p className="text-muted-foreground">{item.approvedBy}</p>
              <p className="text-muted-foreground text-xs">{item.approvedDate}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-1">
              {item.status === "approved" ? "Approval Notes" : "Rejection Reason"}
            </h4>
            <p className="text-muted-foreground">
              {item.status === "approved"
                ? "Budget request approved as it aligns with department goals and is within budget guidelines."
                : "Budget request rejected due to budget constraints. Consider resubmitting with a revised scope."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
