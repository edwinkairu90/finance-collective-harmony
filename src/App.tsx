
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AppLayout } from './components/AppLayout';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ActualsVsBudget from './pages/ActualsVsBudget';
import Collaboration from './pages/Collaboration';
import Approvals from './pages/Approvals';
import BudgetPlanning from './pages/BudgetPlanning';
import FinancialStatements from './pages/FinancialStatements';
import UserManagement from './pages/admin/UserManagement';
import Login from './pages/auth/Login';
import AccountingIntegrations from './pages/AccountingIntegrations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Index />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="actuals-vs-budget" element={<ActualsVsBudget />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="budget-planning/*" element={<BudgetPlanning />} />
          <Route path="financial-statements/*" element={<FinancialStatements />} />
          <Route path="admin/users" element={<UserManagement />} />
          <Route path="accounting-integrations" element={<AccountingIntegrations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
