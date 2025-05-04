
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { CollaborationHeader } from "./CollaborationHeader";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";

export function AppLayout() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AuthenticatedLayout />
      </SidebarProvider>
    </AuthProvider>
  );
}

// Separate the authenticated content to use hooks inside the AuthProvider
function AuthenticatedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b py-2 px-4 flex justify-end">
          <CollaborationHeader />
        </header>
        <main className="flex-1 p-5 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
