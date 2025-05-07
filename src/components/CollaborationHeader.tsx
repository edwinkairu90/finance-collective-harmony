
import { useState } from "react";
import { NotificationsPopover } from "./notifications/NotificationsPopover";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "./ui/button";
import { Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const CollaborationHeader = () => {
  const { 
    notifications, 
    unreadCount,
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  
  const { user } = useAuth();
  
  const handleViewAllNotifications = () => {
    // In a real app, this would navigate to a notifications page
    console.log("View all notifications");
  };

  return (
    <div className="flex items-center gap-3">
      {/* User Information */}
      {user && (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.role}</span>
          </div>
        </div>
      )}
      
      <Button variant="ghost" size="sm" className="gap-1">
        <Users className="h-4 w-4" />
        <span>Collaborators</span>
      </Button>
      
      <NotificationsPopover 
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
        onViewAll={handleViewAllNotifications}
      />
    </div>
  );
};
