
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CommentThread } from "../comments/CommentThread";
import { BudgetRequestData } from "../../types/collaboration";

interface BudgetCommentsProps {
  selectedDepartment: BudgetRequestData | null;
}

export const BudgetComments: React.FC<BudgetCommentsProps> = ({ 
  selectedDepartment
}) => {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const [showCommentThread, setShowCommentThread] = useState(false);

  // Current user data - would come from authentication in a real app
  const currentUser = {
    name: "Casey Kim",
    avatar: "",
    department: "Finance"
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      toast({
        title: "Comment Added",
        description: "Your comment has been added to the budget request.",
      });
      setComment("");
    }
  };

  const toggleCommentThread = () => {
    setShowCommentThread(prev => !prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Comments</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleCommentThread}
          className="flex items-center gap-1"
        >
          <MessageSquare className="h-4 w-4" />
          {showCommentThread ? "Hide All Comments" : "Show All Comments"}
        </Button>
      </div>
      
      {showCommentThread ? (
        <CommentThread 
          entityId={selectedDepartment?.id || ""}
          entityType="budget-request"
          entityTitle={`${selectedDepartment?.department} Budget Request`}
          className="border rounded-md"
        />
      ) : (
        <div className="space-y-3">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Textarea 
              placeholder="Add a comment about this budget request..." 
              className="min-h-[100px] flex-1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddComment}
              disabled={!comment.trim()}
              className="flex items-center gap-1"
            >
              <Send className="h-4 w-4" />
              Submit Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
