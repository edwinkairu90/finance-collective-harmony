
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp, Reply } from "lucide-react";

export interface CommentProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    department?: string;
  };
  content: string;
  timestamp: Date;
  mentions?: string[];
  likes?: number;
  replies?: CommentProps[];
  onReply?: (id: string) => void;
  onLike?: (id: string) => void;
}

export const CommentItem: React.FC<CommentProps> = ({
  id,
  author,
  content,
  timestamp,
  mentions,
  likes = 0,
  onReply,
  onLike,
}) => {
  // Function to highlight mentions in the comment text
  const highlightMentions = (text: string): React.ReactNode => {
    if (!mentions || mentions.length === 0) return text;
    
    // Split text by @mentions
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('@')) {
        return <span key={i} className="font-medium text-primary">{part}</span>;
      }
      return part;
    });
  };

  return (
    <div className="flex gap-3 py-3 border-b">
      <Avatar className="h-8 w-8">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{author.name}</span>
          {author.department && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
              {author.department}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        
        <div className="mt-1 text-sm">
          {highlightMentions(content)}
        </div>
        
        <div className="flex gap-3 mt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs gap-1"
            onClick={() => onLike?.(id)}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            {likes > 0 && <span>{likes}</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs gap-1"
            onClick={() => onReply?.(id)}
          >
            <Reply className="h-3.5 w-3.5" />
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
