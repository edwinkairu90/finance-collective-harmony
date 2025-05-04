
import {
  BarChart3Icon,
  BuildingIcon,
  CheckIcon,
  CreditCardIcon,
  FileTextIcon,
  LineChartIcon,
  LinkIcon,
  MessageSquareIcon,
  SettingsIcon,
  UsersIcon
} from "lucide-react";

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
              <a href="/dashboard">
                <BarChart3Icon className="w-4 h-4 mr-2" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Actuals vs Budget">
              <a href="/actuals-vs-budget">
                <LineChartIcon className="w-4 h-4 mr-2" />
                <span>Actuals vs Budget</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Budget Planning">
              <a href="/budget-planning">
                <CreditCardIcon className="w-4 h-4 mr-2" />
                <span>Budget Planning</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Financial Statements">
              <a href="/financial-statements">
                <FileTextIcon className="w-4 h-4 mr-2" />
                <span>Financial Statements</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Collaboration">
              <a href="/collaboration">
                <MessageSquareIcon className="w-4 h-4 mr-2" />
                <span>Collaboration</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Approvals">
              <a href="/approvals">
                <CheckIcon className="w-4 h-4 mr-2" />
                <span>Approvals</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Accounting Integrations">
              <a href="/accounting-integrations">
                <LinkIcon className="w-4 h-4 mr-2" />
                <span>Accounting Integrations</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="User Management">
              <a href="/admin/users">
                <UsersIcon className="w-4 h-4 mr-2" />
                <span>User Management</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <a href="/settings">
                <SettingsIcon className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
