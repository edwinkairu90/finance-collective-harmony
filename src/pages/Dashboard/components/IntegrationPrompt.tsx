
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAccountingIntegration } from "@/hooks/useAccountingIntegration";

export const IntegrationPrompt = () => {
  const navigate = useNavigate();
  const { integrations } = useAccountingIntegration();
  
  // Check if any integrations are connected
  const hasConnectedIntegrations = integrations.some(i => i.isConnected);
  
  if (hasConnectedIntegrations) {
    return null; // Don't show the prompt if already connected
  }
  
  return (
    <Card className="border-dashed border-teal-300 bg-teal-50">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-100 p-2 rounded-full">
            <Link className="h-5 w-5 text-teal-700" />
          </div>
          <div>
            <h3 className="font-medium text-teal-900">Connect Accounting Software</h3>
            <p className="text-sm text-teal-700">
              Import actual financial data by connecting QuickBooks, NetSuite, or Sage
            </p>
          </div>
        </div>
        <Button 
          size="sm" 
          className="bg-teal-700 hover:bg-teal-800"
          onClick={() => navigate("/accounting-integrations")}
        >
          Connect <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
