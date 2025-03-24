
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
import { Link, useNavigate } from "react-router-dom";
import { BarChart, ChartPie, ClipboardCheck, Compass, FileText, Home, LogOut, Settings, Shield, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Sidebar className="w-auto">
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-sidebar-primary" />
          <span className="text-lg font-bold">Kompass</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {user ? (
          <>
            <div className="p-3">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarFallback>{user.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role} • {user.department}</p>
                </div>
              </div>
            </div>
            
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
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/budget">
                          <ChartPie className="h-4 w-4 mr-2" />
                          <span>Budget Planning</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/financial-statements">
                          <FileText className="h-4 w-4 mr-2" />
                          <span>Financial Statements</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/collaboration">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Collaboration</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {hasPermission('approve:budgets') && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/approvals">
                          <ClipboardCheck className="h-4 w-4 mr-2" />
                          <span>Approvals</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/actuals">
                          <BarChart className="h-4 w-4 mr-2" />
                          <span>Actuals vs Budget</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {hasPermission('manage:users') && (
              <SidebarGroup>
                <SidebarGroupLabel>Administration</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/admin/users">
                          <Shield className="h-4 w-4 mr-2" />
                          <span>User Management</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
            
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
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <div className="p-4 text-center">
            <p className="mb-3 text-sm">Please log in to access the application</p>
            <Button onClick={() => navigate('/login')} className="w-full">Login</Button>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="px-3 py-3">
        <div className="text-xs text-muted-foreground">
          &copy; 2025 Kompass Inc.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
