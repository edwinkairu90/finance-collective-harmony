
import {
  BarChart3Icon,
  BuildingIcon,
  CheckIcon,
  CommandIcon,
  ChevronsLeftRightIcon,
  ClockIcon,
  CreditCardIcon,
  FileTextIcon,
  LineChartIcon,
  LinkIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShuffleIcon,
  Users2Icon,
  UsersIcon
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuLink,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink href="/dashboard">
              <BarChart3Icon className="w-4 h-4 mr-2" />
              <span>Dashboard</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink href="/actuals-vs-budget">
              <LineChartIcon className="w-4 h-4 mr-2" />
              <span>Actuals vs Budget</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink href="/budget-planning">
              <CreditCardIcon className="w-4 h-4 mr-2" />
              <span>Budget Planning</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink href="/financial-statements">
              <FileTextIcon className="w-4 h-4 mr-2" />
              <span>Financial Statements</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink href="/collaboration">
              <MessageSquareIcon className="w-4 h-4 mr-2" />
              <span>Collaboration</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink href="/approvals">
              <CheckIcon className="w-4 h-4 mr-2" />
              <span>Approvals</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink href="/accounting-integrations">
              <LinkIcon className="w-4 h-4 mr-2" />
              <span>Accounting Integrations</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink href="/admin/users">
              <UsersIcon className="w-4 h-4 mr-2" />
              <span>User Management</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuLink href="/settings">
              <SettingsIcon className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </SidebarMenuLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
