
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AccountingSoftwareCard } from "@/components/integrations/AccountingSoftwareCard";
import { ConnectAccountingDialog } from "@/components/integrations/ConnectAccountingDialog";
import { SyncDataDialog } from "@/components/integrations/SyncDataDialog";
import { useAccountingIntegration } from "@/hooks/useAccountingIntegration";
import { AccountingIntegrationConfig, AccountingDataSyncOptions } from "@/types/integrations";
import { Progress } from "@/components/ui/progress";

const AccountingIntegrations = () => {
  const { toast } = useToast();
  const {
    integrations,
    isConnecting,
    syncStatus,
    connectToSoftware,
    disconnectSoftware,
    syncData
  } = useAccountingIntegration();
  
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [isSyncDialogOpen, setIsSyncDialogOpen] = useState(false);
  
  const handleConnect = (softwareId: string) => {
    setSelectedSoftware(softwareId);
    setIsConnectDialogOpen(true);
  };
  
  const handleDisconnect = (softwareId: string) => {
    disconnectSoftware(softwareId);
  };
  
  const handleOpenSyncDialog = (softwareId: string) => {
    setSelectedSoftware(softwareId);
    setIsSyncDialogOpen(true);
  };
  
  const handleConnectSubmit = async (config: AccountingIntegrationConfig) => {
    if (!selectedSoftware) return;
    
    const success = await connectToSoftware(selectedSoftware, config);
    if (success) {
      setIsConnectDialogOpen(false);
    }
  };
  
  const handleSyncSubmit = async (options: AccountingDataSyncOptions) => {
    if (!selectedSoftware) return;
    
    const success = await syncData(selectedSoftware, options.startDate, options.endDate);
    if (success) {
      setIsSyncDialogOpen(false);
      
      toast({
        title: "Data Import Complete",
        description: "Your financial data has been imported successfully.",
      });
    }
  };
  
  const getSelectedSoftwareName = () => {
    if (!selectedSoftware) return "";
    
    const software = integrations.find(s => s.id === selectedSoftware);
    return software ? software.name : "";
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Accounting Integrations</h1>
        <p className="text-muted-foreground">Connect to your accounting software to import actual financial data.</p>
      </div>
      
      {syncStatus.status === 'syncing' && (
        <div className="rounded-md border p-4 mb-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">Syncing data...</p>
            <Progress value={45} className="h-2" />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map(software => (
          <AccountingSoftwareCard
            key={software.id}
            software={software}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onSync={handleOpenSyncDialog}
          />
        ))}
      </div>
      
      {selectedSoftware && (
        <>
          <ConnectAccountingDialog
            softwareId={selectedSoftware}
            softwareName={getSelectedSoftwareName()}
            isOpen={isConnectDialogOpen}
            isConnecting={isConnecting}
            onClose={() => setIsConnectDialogOpen(false)}
            onConnect={handleConnectSubmit}
          />
          
          <SyncDataDialog
            softwareId={selectedSoftware}
            softwareName={getSelectedSoftwareName()}
            isOpen={isSyncDialogOpen}
            isSyncing={syncStatus.status === 'syncing'}
            onClose={() => setIsSyncDialogOpen(false)}
            onSync={handleSyncSubmit}
          />
        </>
      )}
    </div>
  );
};

export default AccountingIntegrations;
