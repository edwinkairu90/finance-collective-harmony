
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
  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link to="/dashboard">
                <BarChart3Icon className="w-4 h-4 mr-2" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Actuals vs Budget">
              <Link to="/actuals-vs-budget">
                <LineChartIcon className="w-4 h-4 mr-2" />
                <span>Actuals vs Budget</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Budget Planning">
              <Link to="/budget-planning">
                <CreditCardIcon className="w-4 h-4 mr-2" />
                <span>Budget Planning</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Financial Statements">
              <Link to="/financial-statements">
                <FileTextIcon className="w-4 h-4 mr-2" />
                <span>Financial Statements</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Collaboration">
              <Link to="/collaboration">
                <MessageSquareIcon className="w-4 h-4 mr-2" />
                <span>Collaboration</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Approvals">
              <Link to="/approvals">
                <CheckIcon className="w-4 h-4 mr-2" />
                <span>Approvals</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Accounting Integrations">
              <Link to="/accounting-integrations">
                <LinkIcon className="w-4 h-4 mr-2" />
                <span>Accounting Integrations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Management">
              <Link to="/admin/users">
                <UsersIcon className="w-4 h-4 mr-2" />
                <span>User Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link to="/settings">
                <SettingsIcon className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
