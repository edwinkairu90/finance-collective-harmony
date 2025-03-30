
import { useState } from "react";
import { ApprovalItem } from "@/types/approval";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ApprovalStatusBadge } from "./ApprovalStatusBadge";

interface ApprovalDetailViewProps {
  selectedItem: ApprovalItem | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ApprovalDetailView = ({
  selectedItem,
  onApprove,
  onReject,
}: ApprovalDetailViewProps) => {
  const [comment, setComment] = useState("");

  if (!selectedItem) {
    return (
      <Card className="md:col-span-2">
        <CardContent className="flex flex-col items-center justify-center h-full py-12">
          <div className="text-center space-y-2 text-muted-foreground">
            <div className="text-6xl mb-4">👈</div>
            <h3 className="text-xl font-medium">Select an item</h3>
            <p className="text-sm">Click on a request to review the details and take action</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{selectedItem.title}</CardTitle>
            <CardDescription>
              {selectedItem.department} - ${selectedItem.amount.toLocaleString()}
            </CardDescription>
          </div>
          <ApprovalStatusBadge status={selectedItem.status} />
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
              onClick={() => onReject(selectedItem.id)}
            >
              Reject
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-xs h-8"
              onClick={() => onApprove(selectedItem.id)}
            >
              Approve
            </Button>
          </>
        )}
        {selectedItem.status !== "pending" && (
          <Button variant="outline" className="text-xs h-8" onClick={() => {}}>
            Close
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
