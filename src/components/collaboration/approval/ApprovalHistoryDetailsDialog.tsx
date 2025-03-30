
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";
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
      <DialogContent className="max-w-2xl max-h-[90vh]">
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

          {item.conversation && item.conversation.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 font-medium mb-3">
                <MessageCircle className="h-4 w-4" />
                <h4>Approval Discussion</h4>
              </div>
              
              <ScrollArea className="h-[220px] rounded-md border p-4">
                <div className="space-y-4">
                  {item.conversation.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex flex-col ${message.isApprover ? 'items-end' : 'items-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.isApprover 
                          ? 'bg-blue-50 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{message.sender}</span>
                        <span>•</span>
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
