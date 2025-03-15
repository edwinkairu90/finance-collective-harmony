
import { useState, useEffect } from "react";
import { Notification } from "@/components/notifications/NotificationsPopover";
import { useToast } from "@/hooks/use-toast";

// In a real app, this would probably be fetched from a server
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Marketing Team",
    message: "mentioned you in a comment on Budget Planning",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    type: "mention",
    actor: {
      name: "Alex Martinez",
      avatar: "",
    },
    entityId: "budget-marketing",
    entityType: "budget",
    entityTitle: "Marketing Budget FY2025",
    link: "/budget"
  },
  {
    id: "2",
    title: "Jane Cooper",
    message: "requested your approval on Q2 Engineering Budget",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    type: "approval",
    actor: {
      name: "Jane Cooper",
      avatar: "",
    },
    entityId: "eng-q2-budget",
    entityType: "approval",
    entityTitle: "Engineering Q2 Budget",
    link: "/approvals"
  },
  {
    id: "3",
    title: "Morgan Lee",
    message: "commented on Sales Department Budget",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "comment",
    actor: {
      name: "Morgan Lee",
      avatar: "",
    },
    entityId: "sales-budget",
    entityType: "budget",
    entityTitle: "Sales Department Budget FY2025",
    link: "/budget"
  },
  {
    id: "4",
    title: "Budget Forecast",
    message: "for Q3 has been updated by Finance Team",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    type: "update",
    entityId: "q3-forecast",
    entityType: "forecast",
    entityTitle: "Q3 Budget Forecast",
    link: "/dashboard"
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const { toast } = useToast();

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
    });
    
    return newNotification.id;
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // In a real app, we would set up a websocket or polling here
  // to receive new notifications from the server
  useEffect(() => {
    // Mock receiving a new notification after 30 seconds
    // This is just for demonstration purposes
    const timer = setTimeout(() => {
      addNotification({
        title: "System Update",
        message: "Budget planning deadline extended to next Friday",
        type: "system",
        entityTitle: "System Announcement"
      });
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};
