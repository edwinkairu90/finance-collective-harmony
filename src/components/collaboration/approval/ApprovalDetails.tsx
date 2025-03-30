
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ApprovalItem } from "../../../types/approval";
import { useAuth } from "@/context/AuthContext";

interface ApprovalDetailsProps {
  selectedItem: ApprovalItem | null;
  onApprove: (id: string, reason: string) => void;
  onReject: (id: string, reason: string) => void;
  onClose: () => void;
}

export const ApprovalDetails = ({ 
  selectedItem, 
  onApprove, 
  onReject, 
  onClose 
}: ApprovalDetailsProps) => {
  const [comment, setComment] = useState("");
  const { hasPermission } = useAuth();
  const isAdmin = hasPermission('manage:users');

  if (!selectedItem) {
    return (
      <Card className="md:col-span-2">
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <div className="text-center space-y-2 text-muted-foreground">
            <div className="text-5xl mb-3">👈</div>
            <h3 className="text-lg font-medium">Select an item</h3>
            <p className="text-xs">Click on a request to review the details and take action</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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

        {selectedItem.status !== "pending" && selectedItem.approver && (
          <div>
            <div className="font-medium mb-1 text-xs">
              {selectedItem.status === "approved" ? "Approved By" : "Rejected By"}
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">{selectedItem.approver.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs">{selectedItem.approver.name}</div>
                <div className="text-xs text-muted-foreground">
                  {selectedItem.approvalDate}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedItem.status !== "pending" && selectedItem.reason && (
          <div>
            <div className="font-medium mb-1 text-xs">
              {selectedItem.status === "approved" ? "Approval Justification" : "Rejection Reason"}
            </div>
            <div className="text-xs border p-2 rounded-md bg-slate-50">
              {selectedItem.reason}
            </div>
          </div>
        )}

        {selectedItem.status === "pending" && (
          <div>
            <div className="font-medium mb-1 text-xs">Add Comment</div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comments here..."
              className="resize-none text-xs"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="space-x-2 py-3">
        {selectedItem.status === "pending" && (
          <>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50 text-xs h-7"
              onClick={() => onReject(selectedItem.id, comment)}
            >
              Reject
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-xs h-7"
              onClick={() => onApprove(selectedItem.id, comment)}
            >
              Approve
            </Button>
          </>
        )}
        {selectedItem.status !== "pending" && (
          <Button variant="outline" className="text-xs h-7" onClick={onClose}>
            Close
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
