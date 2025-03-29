
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: "mention" | "comment" | "approval" | "update" | "system";
  actor?: {
    name: string;
    avatar?: string;
  };
  entityId?: string;
  entityType?: string;
  entityTitle?: string;
  link?: string;
}

interface NotificationsPopoverProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onViewAll: () => void;
  className?: string;
}

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onViewAll,
  className,
}) => {
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    setOpen(false);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "mention":
        return <span className="text-primary text-lg">@</span>;
      case "comment":
        return <span className="text-primary text-lg">💬</span>;
      case "approval":
        return <span className="text-primary text-lg">✓</span>;
      case "update":
        return <span className="text-primary text-lg">📊</span>;
      case "system":
        return <span className="text-primary text-lg">🔔</span>;
      default:
        return <span className="text-primary text-lg">•</span>;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("relative", className)}
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 h-5 min-w-5 flex items-center justify-center"
              variant="destructive"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[360px] p-0" 
        align="end" 
        sideOffset={4}
      >
        <div className="p-4 pb-2 border-b flex justify-between items-center">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={onMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        {notifications.length > 0 ? (
          <>
            <ScrollArea className="max-h-[300px]">
              <div className="p-1">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex gap-3 p-3 rounded-md cursor-pointer",
                      notification.read ? "opacity-70" : "bg-muted"
                    )}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {notification.actor ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.actor.avatar} alt={notification.actor.name} />
                          <AvatarFallback>
                            {notification.actor.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <p className="text-sm leading-tight">
                        <span className="font-medium">{notification.title}</span>
                        {" "}{notification.message}
                      </p>
                      
                      {notification.entityTitle && (
                        <p className="text-xs text-muted-foreground">
                          on <span className="font-medium">{notification.entityTitle}</span>
                        </p>
                      )}
                      
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                    
                    {!notification.read && (
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-2 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full h-8 justify-center"
                onClick={onViewAll}
              >
                View all notifications
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No notifications</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
