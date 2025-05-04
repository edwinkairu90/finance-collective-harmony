
import { Badge } from "@/components/ui/badge";
import { useAccountingIntegration } from "@/hooks/useAccountingIntegration";
import { Calendar, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const AccountingSourceBadge = () => {
  const { integrations } = useAccountingIntegration();
  
  // Find the connected integration
  const connectedIntegration = integrations.find(i => i.isConnected);
  
  if (!connectedIntegration) {
    return null;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex">
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <RefreshCw size={12} />
              {connectedIntegration.name} Connected
              {connectedIntegration.lastSync && (
                <span className="ml-1 flex items-center text-green-600">
                  <Calendar size={10} className="mr-0.5" />
                  {new Date(connectedIntegration.lastSync).toLocaleDateString()}
                </span>
              )}
            </Badge>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Actual data imported from {connectedIntegration.name}</p>
          {connectedIntegration.lastSync && (
            <p className="text-xs text-muted-foreground">
              Last synced on {new Date(connectedIntegration.lastSync).toLocaleString()}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
