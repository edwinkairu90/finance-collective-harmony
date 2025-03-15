
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentItem, CommentProps } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CommentThreadProps {
  entityId: string;
  entityType: string;
  entityTitle?: string;
  className?: string;
  initialComments?: CommentProps[];
}

export const CommentThread: React.FC<CommentThreadProps> = ({
  entityId,
  entityType,
  entityTitle,
  className,
  initialComments = [],
}) => {
  const { toast } = useToast();
  const [comments, setComments] = useState<CommentProps[]>(initialComments);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  
  // Current user data - would come from authentication in a real app
  const currentUser = {
    name: "Casey Kim",
    avatar: "",
    department: "Finance"
  };

  const handleAddComment = (content: string, mentions: string[]) => {
    const newComment: CommentProps = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        department: currentUser.department
      },
      content,
      timestamp: new Date(),
      mentions,
      likes: 0,
      replies: []
    };
    
    setComments(prev => [newComment, ...prev]);
    
    // Notify when users are mentioned
    if (mentions.length > 0) {
      toast({
        title: "Notification sent",
        description: `Notified ${mentions.length} user${mentions.length > 1 ? 's' : ''} about your comment.`,
      });
    }
  };

  const handleReply = (id: string) => {
    setReplyToId(id);
  };

  const handleLike = (id: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === id 
          ? { ...comment, likes: (comment.likes || 0) + 1 } 
          : comment
      )
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-1.5">
            <MessageSquare className="h-5 w-5" />
            <span>Comments</span>
            {comments.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {comments.length}
              </Badge>
            )}
          </CardTitle>
          
          {entityTitle && (
            <div className="text-sm text-muted-foreground">
              <span>on </span>
              <span className="font-medium">{entityTitle}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <CommentInput 
          onSubmit={handleAddComment}
          currentUser={currentUser}
          placeholder="Add a comment or @mention a colleague..."
        />
        
        {comments.length > 0 ? (
          <div className="mt-4 space-y-1">
            {comments.map(comment => (
              <CommentItem 
                key={comment.id}
                {...comment}
                onReply={handleReply}
                onLike={handleLike}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 py-6 text-center text-muted-foreground">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
