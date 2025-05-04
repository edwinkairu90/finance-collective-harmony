
import {
  ArrowLeftIcon,
  BarChart3Icon,
  BuildingIcon,
  Check2Icon,
  ChevronsLeftRightIcon,
  ClockIcon,
  CommandLineIcon,
  CreditCardIcon,
  FileTextIcon,
  LineChartIcon,
  LinkIcon,
  MessagesIcon,
  SettingsIcon,
  ShuffleIcon,
  Users2Icon,
  UsersIcon
} from "lucide-react";

import { Sidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar className="border-none">
      <Sidebar.Main>
        <Sidebar.Nav>
          <Sidebar.NavItem href="/dashboard" icon={BarChart3Icon}>
            Dashboard
          </Sidebar.NavItem>
          <Sidebar.NavItem href="/actuals-vs-budget" icon={LineChartIcon}>
            Actuals vs Budget
          </Sidebar.NavItem>
          <Sidebar.NavItem href="/budget-planning" icon={CreditCardIcon}>
            Budget Planning
          </Sidebar.NavItem>
          <Sidebar.NavItem href="/financial-statements" icon={FileTextIcon}>
            Financial Statements
          </Sidebar.NavItem>
          <Sidebar.NavItem href="/collaboration" icon={MessagesIcon}>
            Collaboration
          </Sidebar.NavItem>
          <Sidebar.NavItem href="/approvals" icon={Check2Icon}>
            Approvals
          </Sidebar.NavItem>
          <Sidebar.NavItem href="/accounting-integrations" icon={LinkIcon}>
            Accounting Integrations
          </Sidebar.NavItem>
        </Sidebar.Nav>
      </Sidebar.Main>
      <Sidebar.Footer>
        <Sidebar.Nav>
          <Sidebar.NavItem href="/admin/users" icon={UsersIcon}>
            User Management
          </Sidebar.NavItem>
          <Sidebar.NavItem href="/settings" icon={SettingsIcon}>
            Settings
          </Sidebar.NavItem>
        </Sidebar.Nav>
      </Sidebar.Footer>
    </Sidebar>
  );
}
