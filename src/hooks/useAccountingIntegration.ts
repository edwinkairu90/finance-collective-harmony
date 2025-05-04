
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AccountingSoftware, AccountingIntegrationConfig, AccountingConnectionStatus } from "@/types/integrations";
import { availableAccountingSoftware } from "@/data/accountingSoftware";

export const useAccountingIntegration = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<AccountingSoftware[]>(availableAccountingSoftware);
  const [isConnecting, setIsConnecting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<AccountingConnectionStatus>({
    status: 'disconnected'
  });

  // Connect to accounting software
  const connectToSoftware = async (
    softwareId: string, 
    config: AccountingIntegrationConfig
  ): Promise<boolean> => {
    setIsConnecting(true);
    setSyncStatus({ status: 'syncing' });
    
    try {
      // In a real implementation, this would be an API call to your backend
      // that handles OAuth or API key authentication with the accounting software
      console.log(`Connecting to ${softwareId} with config:`, config);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the connected status
      setIntegrations(prev => 
        prev.map(software => 
          software.id === softwareId 
            ? { 
                ...software, 
                isConnected: true,
                lastSync: new Date().toISOString()
              } 
            : software
        )
      );
      
      setSyncStatus({ 
        status: 'connected',
        lastSync: new Date()
      });
      
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${softwareId}`,
      });
      
      return true;
    } catch (error) {
      console.error("Error connecting to accounting software:", error);
      
      setSyncStatus({ 
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
      
      toast({
        title: "Connection Failed",
        description: `Failed to connect to ${softwareId}. Please try again.`,
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect from accounting software
  const disconnectSoftware = (softwareId: string) => {
    // In a real implementation, this would revoke access tokens
    setIntegrations(prev => 
      prev.map(software => 
        software.id === softwareId 
          ? { ...software, isConnected: false, lastSync: undefined } 
          : software
      )
    );
    
    setSyncStatus({ status: 'disconnected' });
    
    toast({
      title: "Disconnected",
      description: `Successfully disconnected from ${softwareId}`,
    });
  };

  // Sync data from accounting software
  const syncData = async (
    softwareId: string, 
    startDate: Date, 
    endDate: Date
  ) => {
    setSyncStatus({ status: 'syncing' });
    
    try {
      // Mock API call to sync data
      console.log(`Syncing data from ${softwareId} for ${startDate.toISOString()} to ${endDate.toISOString()}`);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update last sync time
      const now = new Date();
      setIntegrations(prev => 
        prev.map(software => 
          software.id === softwareId 
            ? { ...software, lastSync: now.toISOString() } 
            : software
        )
      );
      
      setSyncStatus({
        status: 'connected',
        lastSync: now
      });
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced data from ${softwareId}`,
      });
      
      return true;
    } catch (error) {
      console.error("Error syncing data:", error);
      
      setSyncStatus({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
      
      toast({
        title: "Sync Failed",
        description: `Failed to sync data from ${softwareId}. Please try again.`,
        variant: "destructive"
      });
      
      return false;
    }
  };

  return {
    integrations,
    isConnecting,
    syncStatus,
    connectToSoftware,
    disconnectSoftware,
    syncData
  };
};
