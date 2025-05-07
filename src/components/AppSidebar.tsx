
import {
  BarChart3Icon,
  CheckIcon,
  CreditCardIcon,
  FileTextIcon,
  LineChartIcon,
  LinkIcon,
  MessageSquareIcon,
  SettingsIcon,
  UsersIcon,
  ExternalLinkIcon,
  UserIcon
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  
  // Helper function to create links with target="_blank" option
  const createLink = (to: string, icon: React.ReactNode, text: string, openInNewTab: boolean = false) => {
    if (openInNewTab) {
      return (
        <a 
          href={to} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center"
        >
          {icon}
          <span>{text}</span>
        </a>
      );
    }
    
    return (
      <Link to={to}>
        {icon}
        <span>{text}</span>
      </Link>
    );
  };

  return (
    <Sidebar className="border-none">
      <SidebarHeader>
        <div className="px-2 py-3">
          <div className="flex items-center gap-2 px-2">
            <Avatar>
              {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback>{user?.name.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">{user?.name || "User"}</span>
              <span className="text-xs text-muted-foreground truncate capitalize">{user?.role || "Guest"}</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Profile">
              {createLink("/profile", <UserIcon className="w-4 h-4 mr-2" />, "Profile")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              {createLink("/dashboard", <BarChart3Icon className="w-4 h-4 mr-2" />, "Dashboard")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Actuals vs Budget">
              {createLink("/actuals-vs-budget", <LineChartIcon className="w-4 h-4 mr-2" />, "Actuals vs Budget")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Budget Planning">
              {createLink("/budget-planning", <CreditCardIcon className="w-4 h-4 mr-2" />, "Budget Planning")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Financial Statements">
              {createLink("/financial-statements", <FileTextIcon className="w-4 h-4 mr-2" />, "Financial Statements")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Collaboration">
              {createLink("/collaboration", <MessageSquareIcon className="w-4 h-4 mr-2" />, "Collaboration")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Approvals">
              {createLink("/approvals", <CheckIcon className="w-4 h-4 mr-2" />, "Approvals")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Accounting Integrations">
              {createLink("/accounting-integrations", <LinkIcon className="w-4 h-4 mr-2" />, "Accounting Integrations")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {/* Added new menu item to open current page in new tab */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Open in new tab">
              {createLink(location.pathname, <ExternalLinkIcon className="w-4 h-4 mr-2" />, "Open in new tab", true)}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Management">
              {createLink("/admin/users", <UsersIcon className="w-4 h-4 mr-2" />, "User Management")}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              {createLink("/settings", <SettingsIcon className="w-4 h-4 mr-2" />, "Settings")}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
