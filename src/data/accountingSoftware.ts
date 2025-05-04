
import { AccountingSoftware } from "@/types/integrations";

// List of available accounting software integrations
export const availableAccountingSoftware: AccountingSoftware[] = [
  {
    id: "quickbooks",
    name: "QuickBooks",
    logo: "/integrations/quickbooks-logo.png",
    description: "Connect to QuickBooks to import your financial data",
    isConnected: false
  },
  {
    id: "netsuite",
    name: "NetSuite",
    logo: "/integrations/netsuite-logo.png",
    description: "Connect to NetSuite for enterprise financial data",
    isConnected: false
  },
  {
    id: "sage",
    name: "Sage",
    logo: "/integrations/sage-logo.png",
    description: "Import data from Sage accounting software",
    isConnected: false
  },
  {
    id: "xero",
    name: "Xero",
    logo: "/integrations/xero-logo.png",
    description: "Sync financial data from your Xero account",
    isConnected: false
  },
  {
    id: "freshbooks",
    name: "FreshBooks",
    logo: "/integrations/freshbooks-logo.png", 
    description: "Connect to FreshBooks for small business accounting data",
    isConnected: false
  }
];
