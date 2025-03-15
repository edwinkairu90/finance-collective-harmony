
import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface User {
  id: string;
  name: string;
  avatar?: string;
  department: string;
}

interface CommentInputProps {
  onSubmit: (content: string, mentions: string[]) => void;
  className?: string;
  placeholder?: string;
  currentUser: {
    name: string;
    avatar?: string;
  };
}

// Mock users data - in a real app, this would come from an API
const USERS: User[] = [
  { id: "1", name: "Jane Cooper", department: "Finance", avatar: "" },
  { id: "2", name: "Alex Martinez", department: "Marketing", avatar: "" },
  { id: "3", name: "Morgan Lee", department: "Engineering", avatar: "" },
  { id: "4", name: "Taylor Chen", department: "Sales", avatar: "" },
  { id: "5", name: "Jordan Smith", department: "HR", avatar: "" },
];

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  className,
  placeholder = "Add a comment...",
  currentUser,
}) => {
  const [comment, setComment] = useState("");
  const [mentions, setMentions] = useState<string[]>([]);
  const [mentionSearch, setMentionSearch] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    
    // Get cursor position
    const curPos = e.target.selectionStart || 0;
    setCursorPosition(curPos);
    
    // Check if we need to show mentions
    const textBeforeCursor = value.substring(0, curPos);
    const atSignIndex = textBeforeCursor.lastIndexOf('@');
    
    if (atSignIndex !== -1 && (atSignIndex === 0 || value[atSignIndex - 1] === ' ')) {
      const searchText = textBeforeCursor.substring(atSignIndex + 1);
      setMentionSearch(searchText);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
      e.preventDefault();
    }
  };

  const insertMention = (user: User) => {
    const textBeforeCursor = comment.substring(0, cursorPosition);
    const textAfterCursor = comment.substring(cursorPosition);
    
    // Find position of the last @ before cursor
    const atSignIndex = textBeforeCursor.lastIndexOf('@');
    if (atSignIndex === -1) return;
    
    // Replace the @partial with @username
    const newText = 
      textBeforeCursor.substring(0, atSignIndex) + 
      `@${user.name} ` + 
      textAfterCursor;
    
    setComment(newText);
    setMentions([...mentions, user.id]);
    setShowMentions(false);
    
    // Focus back on textarea
    if (textareaRef.current) {
      const newCursorPos = atSignIndex + `@${user.name} `.length;
      textareaRef.current.focus();
      
      // Need to use setTimeout because React's setState is asynchronous
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
        }
      }, 0);
    }
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment, mentions);
      setComment("");
      setMentions([]);
    }
  };

  // Filter users based on mention search
  const filteredUsers = USERS.filter(user => 
    mentionSearch === "" || 
    user.name.toLowerCase().includes(mentionSearch.toLowerCase()) ||
    user.department.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={comment}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="min-h-[80px] w-full"
          />
          
          {showMentions && (
            <div className="absolute top-full left-0 mt-1 w-full bg-background border rounded-md shadow-md z-10 max-h-[200px] overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <div 
                    key={user.id}
                    className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer"
                    onClick={() => insertMention(user)}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.department}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-sm text-muted-foreground">No users found</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Users className="h-4 w-4" />
              <span>Tag someone</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <div className="max-h-[200px] overflow-y-auto">
              {USERS.map(user => (
                <div 
                  key={user.id}
                  className="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer"
                  onClick={() => {
                    setComment(prev => `${prev} @${user.name} `);
                    setMentions(prev => [...prev, user.id]);
                    if (textareaRef.current) {
                      textareaRef.current.focus();
                    }
                  }}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{user.name}</div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          onClick={handleSubmit} 
          size="sm" 
          className="gap-1"
        >
          <Send className="h-4 w-4" />
          <span>Send</span>
        </Button>
      </div>
    </div>
  );
};
