
import { useState } from "react";
import { NotificationsPopover } from "./notifications/NotificationsPopover";
import { useNotifications } from "@/hooks/useNotifications";
import { Button } from "./ui/button";
import { Users } from "lucide-react";

export const CollaborationHeader = () => {
  const { 
    notifications, 
    unreadCount,
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  
  const handleViewAllNotifications = () => {
    // In a real app, this would navigate to a notifications page
    console.log("View all notifications");
  };

  return (
    <div className="flex items-center gap-2">
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
