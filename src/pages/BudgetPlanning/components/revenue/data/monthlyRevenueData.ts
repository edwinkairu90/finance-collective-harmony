
import { MonthlyRevenueData } from "../types/revenueTypes";

// Monthly revenue drivers projection
export const initialMonthlyRevenueDrivers: MonthlyRevenueData[] = [
  { 
    month: "Jan", 
    enterprise: { newClients: 1, subscriptionRevenue: 62500 },
    midMarket: { newClients: 2, subscriptionRevenue: 37000 },
    smb: { newClients: 7, subscriptionRevenue: 24500 },
    implementationRevenue: 15000,
    otherRevenue: 0
  },
  { 
    month: "Feb", 
    enterprise: { newClients: 1, subscriptionRevenue: 65000 },
    midMarket: { newClients: 2, subscriptionRevenue: 38000 },
    smb: { newClients: 7, subscriptionRevenue: 25000 },
    implementationRevenue: 18000,
    otherRevenue: 0
  },
  { 
    month: "Mar", 
    enterprise: { newClients: 1, subscriptionRevenue: 67500 },
    midMarket: { newClients: 2, subscriptionRevenue: 39000 },
    smb: { newClients: 7, subscriptionRevenue: 25500 },
    implementationRevenue: 12000,
    otherRevenue: 5000
  },
  { 
    month: "Apr", 
    enterprise: { newClients: 1, subscriptionRevenue: 70000 },
    midMarket: { newClients: 2, subscriptionRevenue: 40000 },
    smb: { newClients: 7, subscriptionRevenue: 26000 },
    implementationRevenue: 15000,
    otherRevenue: 0
  },
  { 
    month: "May", 
    enterprise: { newClients: 1, subscriptionRevenue: 72500 },
    midMarket: { newClients: 2, subscriptionRevenue: 41000 },
    smb: { newClients: 7, subscriptionRevenue: 26500 },
    implementationRevenue: 20000,
    otherRevenue: 0
  },
  { 
    month: "Jun", 
    enterprise: { newClients: 1, subscriptionRevenue: 75000 },
    midMarket: { newClients: 2, subscriptionRevenue: 42000 },
    smb: { newClients: 7, subscriptionRevenue: 27000 },
    implementationRevenue: 22000,
    otherRevenue: 0
  },
  { 
    month: "Jul", 
    enterprise: { newClients: 1, subscriptionRevenue: 77500 },
    midMarket: { newClients: 2, subscriptionRevenue: 43000 },
    smb: { newClients: 7, subscriptionRevenue: 27500 },
    implementationRevenue: 15000,
    otherRevenue: 8000
  },
  { 
    month: "Aug", 
    enterprise: { newClients: 1, subscriptionRevenue: 80000 },
    midMarket: { newClients: 2, subscriptionRevenue: 44000 },
    smb: { newClients: 7, subscriptionRevenue: 28000 },
    implementationRevenue: 18000,
    otherRevenue: 0
  },
  { 
    month: "Sep", 
    enterprise: { newClients: 1, subscriptionRevenue: 82500 },
    midMarket: { newClients: 3, subscriptionRevenue: 46000 },
    smb: { newClients: 8, subscriptionRevenue: 29000 },
    implementationRevenue: 25000,
    otherRevenue: 0
  },
  { 
    month: "Oct", 
    enterprise: { newClients: 1, subscriptionRevenue: 85000 },
    midMarket: { newClients: 2, subscriptionRevenue: 47000 },
    smb: { newClients: 7, subscriptionRevenue: 29500 },
    implementationRevenue: 15000,
    otherRevenue: 10000
  },
  { 
    month: "Nov", 
    enterprise: { newClients: 1, subscriptionRevenue: 87500 },
    midMarket: { newClients: 2, subscriptionRevenue: 48000 },
    smb: { newClients: 7, subscriptionRevenue: 30000 },
    implementationRevenue: 12000,
    otherRevenue: 0
  },
  { 
    month: "Dec", 
    enterprise: { newClients: 1, subscriptionRevenue: 90000 },
    midMarket: { newClients: 2, subscriptionRevenue: 49000 },
    smb: { newClients: 7, subscriptionRevenue: 30500 },
    implementationRevenue: 20000,
    otherRevenue: 5000
  },
];
