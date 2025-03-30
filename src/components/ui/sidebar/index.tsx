
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Re-export all components
export { useSidebar, SidebarProvider as SidebarProviderBase } from "./context";
export { Sidebar } from "./sidebar";
export {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "./components";
export {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "./group";
export {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "./menu";
export {
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "./submenu";

// Import the original SidebarProvider to wrap it
import { SidebarProvider as OriginalSidebarProvider } from "./context";

// Wrap the provider with TooltipProvider to enable tooltips for the sidebar menu items
const SidebarProvider = (props: React.ComponentProps<typeof OriginalSidebarProvider>) => (
  <TooltipProvider>
    <OriginalSidebarProvider {...props} />
  </TooltipProvider>
);

SidebarProvider.displayName = "SidebarProvider";

// Export the wrapped provider
export { SidebarProvider };
