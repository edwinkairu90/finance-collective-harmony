
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { BarChart, ChartPie, ClipboardCheck, Compass, Home, Settings, Users } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-sidebar-primary" />
          <span className="text-lg font-bold">Kompass</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/budget">
                    <ChartPie className="h-4 w-4 mr-2" />
                    <span>Budget Planning</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/data-collection">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Data Collection</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/approvals">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    <span>Approvals</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/actuals">
                    <BarChart className="h-4 w-4 mr-2" />
                    <span>Actuals vs Budget</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4">
        <div className="text-xs text-muted-foreground">
          &copy; 2025 Kompass Inc.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
