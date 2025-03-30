
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
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { BarChart, ChartPie, Compass, FileText, Home, LogOut, Settings, Shield, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();

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
        <div className="flex items-center gap-2 justify-center">
          <Compass className="h-6 w-6 text-sidebar-primary" />
          <span className={`text-lg font-bold ${state === "collapsed" ? "hidden" : "block"}`}>Kompass</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {user ? (
          <>
            <div className="p-3">
              <div className="flex justify-center">
                <Avatar onClick={toggleSidebar} className="cursor-pointer h-10 w-10">
                  <AvatarFallback className="text-gray-800">{user.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                </Avatar>
                {state === "expanded" && (
                  <div className="ml-3">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role} • {user.department}</p>
                  </div>
                )}
              </div>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel className={state === "collapsed" ? "hidden" : "block"}>Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard" className="flex items-center">
                      <Link to="/" className="flex items-center justify-center">
                        <Home className="h-6 w-6 mx-auto" />
                        <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"}`}>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Budget Planning & Forecasting" className="flex items-center">
                        <Link to="/budget" className="flex items-center justify-center">
                          <ChartPie className="h-6 w-6 mx-auto" />
                          <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"} leading-tight`}>Budget Planning<br />&amp; Forecasting</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Financial Statements" className="flex items-center">
                        <Link to="/financial-statements" className="flex items-center justify-center">
                          <FileText className="h-6 w-6 mx-auto" />
                          <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"}`}>Financial Statements</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Collaboration" className="flex items-center">
                        <Link to="/collaboration" className="flex items-center justify-center">
                          <Users className="h-6 w-6 mx-auto" />
                          <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"}`}>Collaboration</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  
                  {(hasPermission('view:all') || hasPermission('view:department')) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Actuals vs Budget" className="flex items-center">
                        <Link to="/actuals" className="flex items-center justify-center">
                          <BarChart className="h-6 w-6 mx-auto" />
                          <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"}`}>Actuals vs Budget</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {hasPermission('manage:users') && (
              <SidebarGroup>
                <SidebarGroupLabel className={state === "collapsed" ? "hidden" : "block"}>Administration</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="User Management" className="flex items-center">
                        <Link to="/admin/users" className="flex items-center justify-center">
                          <Shield className="h-6 w-6 mx-auto" />
                          <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"}`}>User Management</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
            
            <SidebarGroup>
              <SidebarGroupLabel className={state === "collapsed" ? "hidden" : "block"}>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings" className="flex items-center">
                      <Link to="/settings" className="flex items-center justify-center">
                        <Settings className="h-6 w-6 mx-auto" />
                        <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"}`}>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} tooltip="Logout" className="flex items-center">
                      <div className="flex items-center justify-center">
                        <LogOut className="h-6 w-6 mx-auto" />
                        <span className={`ml-3 ${state === "collapsed" ? "hidden" : "block"}`}>Logout</span>
                      </div>
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
        <div className={`text-xs text-muted-foreground ${state === "collapsed" ? "text-center" : ""}`}>
          &copy; 2025 Kompass Inc.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
