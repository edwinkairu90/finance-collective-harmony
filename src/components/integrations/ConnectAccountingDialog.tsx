
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountingIntegrationConfig } from "@/types/integrations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ConnectAccountingDialogProps {
  softwareId: string;
  softwareName: string;
  isOpen: boolean;
  isConnecting: boolean;
  onClose: () => void;
  onConnect: (config: AccountingIntegrationConfig) => void;
}

export const ConnectAccountingDialog = ({
  softwareId,
  softwareName,
  isOpen,
  isConnecting,
  onClose,
  onConnect
}: ConnectAccountingDialogProps) => {
  const [config, setConfig] = useState<AccountingIntegrationConfig>({
    environment: "production"
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(config);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  // Different connection UIs based on the software
  const renderConnectionForm = () => {
    switch (softwareId) {
      case "quickbooks":
        return (
          <Tabs defaultValue="oauth" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="oauth">OAuth</TabsTrigger>
              <TabsTrigger value="apikey">API Key</TabsTrigger>
            </TabsList>
            
            <TabsContent value="oauth" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  name="clientId"
                  value={config.clientId || ""}
                  onChange={handleChange}
                  placeholder="QuickBooks OAuth Client ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  name="clientSecret"
                  type="password"
                  value={config.clientSecret || ""}
                  onChange={handleChange}
                  placeholder="QuickBooks OAuth Client Secret"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="redirectUri">Redirect URI</Label>
                <Input
                  id="redirectUri"
                  name="redirectUri"
                  value={config.redirectUri || ""}
                  onChange={handleChange}
                  placeholder="https://your-app.com/callback"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="apikey" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  value={config.apiKey || ""}
                  onChange={handleChange}
                  placeholder="QuickBooks API Key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">Company ID</Label>
                <Input
                  id="companyId"
                  name="companyId"
                  value={config.companyId || ""}
                  onChange={handleChange}
                  placeholder="QuickBooks Company ID"
                />
              </div>
            </TabsContent>
          </Tabs>
        );
        
      case "netsuite":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                name="clientId"
                value={config.clientId || ""}
                onChange={handleChange}
                placeholder="NetSuite Client ID"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientSecret">Client Secret</Label>
              <Input
                id="clientSecret"
                name="clientSecret"
                type="password"
                value={config.clientSecret || ""}
                onChange={handleChange}
                placeholder="NetSuite Client Secret"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyId">Account ID</Label>
              <Input
                id="companyId"
                name="companyId"
                value={config.companyId || ""}
                onChange={handleChange}
                placeholder="NetSuite Account ID"
              />
            </div>
          </div>
        );
        
      // Sage, Xero, etc. would have their own forms
      default:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                name="apiKey"
                type="password"
                value={config.apiKey || ""}
                onChange={handleChange}
                placeholder={`${softwareName} API Key`}
              />
            </div>
            {softwareId !== "freshbooks" && (
              <div className="space-y-2">
                <Label htmlFor="companyId">Company/Account ID</Label>
                <Input
                  id="companyId"
                  name="companyId"
                  value={config.companyId || ""}
                  onChange={handleChange}
                  placeholder={`${softwareName} Company ID`}
                />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect to {softwareName}</DialogTitle>
          <DialogDescription>
            Enter your {softwareName} credentials to connect and sync financial data.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {renderConnectionForm()}
            
            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="environment"
                    value="production"
                    checked={config.environment === "production"}
                    onChange={() => setConfig(prev => ({ ...prev, environment: "production" }))}
                  />
                  <span>Production</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="environment"
                    value="sandbox"
                    checked={config.environment === "sandbox"}
                    onChange={() => setConfig(prev => ({ ...prev, environment: "sandbox" }))}
                  />
                  <span>Sandbox</span>
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
