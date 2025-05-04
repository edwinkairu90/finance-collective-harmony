
import {
  BarChart3Icon,
  CheckIcon,
  CreditCardIcon,
  FileTextIcon,
  LineChartIcon,
  LinkIcon,
  MessageSquareIcon,
  SettingsIcon,
  UsersIcon
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AppSidebar() {
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
      <SidebarContent>
        <SidebarMenu>
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
