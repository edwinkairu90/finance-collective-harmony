
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import BudgetPlanning from "./pages/BudgetPlanning/index";
import Collaboration from "./pages/Collaboration";
import Approvals from "./pages/Approvals";
import ActualsVsBudget from "./pages/ActualsVsBudget";
import FinancialStatements from "./pages/FinancialStatements";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="budget" element={<BudgetPlanning />} />
            <Route path="financial-statements" element={<FinancialStatements />} />
            <Route path="collaboration" element={<Collaboration />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="actuals" element={<ActualsVsBudget />} />
          </Route>
          <Route path="/welcome" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
