
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import { PermissionGuard } from "./components/auth/PermissionGuard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard/index";
import BudgetPlanning from "./pages/BudgetPlanning/index";
import Collaboration from "./pages/Collaboration";
import ActualsVsBudget from "./pages/ActualsVsBudget/index";
import FinancialStatements from "./pages/FinancialStatements";
import Login from "./pages/auth/Login";
import UserManagement from "./pages/admin/UserManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/welcome" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="budget" element={
                <PermissionGuard requiredPermission="view:department">
                  <BudgetPlanning />
                </PermissionGuard>
              } />
              <Route path="financial-statements" element={
                <PermissionGuard requiredPermission="view:department">
                  <FinancialStatements />
                </PermissionGuard>
              } />
              <Route path="collaboration" element={
                <PermissionGuard requiredPermission="view:department">
                  <Collaboration />
                </PermissionGuard>
              } />
              <Route path="actuals" element={
                <PermissionGuard requiredPermission="view:department">
                  <ActualsVsBudget />
                </PermissionGuard>
              } />
              <Route path="admin/users" element={
                <PermissionGuard requiredPermission="manage:users">
                  <UserManagement />
                </PermissionGuard>
              } />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
