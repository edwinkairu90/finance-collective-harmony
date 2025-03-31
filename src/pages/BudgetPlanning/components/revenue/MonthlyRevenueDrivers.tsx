
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/format";

// Monthly revenue drivers projection
const initialMonthlyRevenueDrivers = [
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

export const MonthlyRevenueDrivers: React.FC = () => {
  const [monthlyRevenueDrivers, setMonthlyRevenueDrivers] = useState(initialMonthlyRevenueDrivers);
  const [additionalRevenueType, setAdditionalRevenueType] = useState("");
  const [additionalRevenueAmount, setAdditionalRevenueAmount] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("Jan");

  // Calculate monthly totals
  const calculateMonthlyTotal = (month: string) => {
    const data = monthlyRevenueDrivers.find(m => m.month === month);
    if (!data) return 0;
    
    return (
      data.enterprise.subscriptionRevenue +
      data.midMarket.subscriptionRevenue +
      data.smb.subscriptionRevenue +
      data.implementationRevenue +
      data.otherRevenue
    );
  };

  // Handle adding additional revenue
  const handleAddAdditionalRevenue = () => {
    if (additionalRevenueAmount <= 0 || !selectedMonth || !additionalRevenueType) return;

    setMonthlyRevenueDrivers(prevData => {
      return prevData.map(item => {
        if (item.month === selectedMonth) {
          if (additionalRevenueType === "implementation") {
            return { ...item, implementationRevenue: additionalRevenueAmount };
          } else if (additionalRevenueType === "other") {
            return { ...item, otherRevenue: additionalRevenueAmount };
          }
        }
        return item;
      });
    });

    // Reset form values
    setAdditionalRevenueAmount(0);
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">
          Monthly Revenue Drivers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
          <h4 className="text-sm font-medium mb-2 text-slate-800 dark:text-slate-200">Add Additional Revenue</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {monthlyRevenueDrivers.map(item => (
                    <SelectItem key={item.month} value={item.month}>{item.month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Revenue Type</label>
              <Select value={additionalRevenueType} onValueChange={setAdditionalRevenueType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="implementation">Implementation</SelectItem>
                  <SelectItem value="other">Other Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Amount</label>
              <Input
                type="number"
                value={additionalRevenueAmount || ''}
                onChange={(e) => setAdditionalRevenueAmount(Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleAddAdditionalRevenue}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Update Revenue
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="w-[180px]">Revenue Category</TableHead>
                {monthlyRevenueDrivers.map(item => (
                  <TableHead key={item.month} className="text-center">{item.month}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-purple-600 dark:text-purple-400">Enterprise New Clients</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`enterprise-clients-${item.month}`} className="text-center font-medium">
                    {item.enterprise.newClients}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-purple-600 dark:text-purple-400">Enterprise MRR</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`enterprise-mrr-${item.month}`} className="text-center font-medium">
                    ${formatCurrency(item.enterprise.subscriptionRevenue)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-blue-600 dark:text-blue-400">Mid-Market New Clients</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`midmarket-clients-${item.month}`} className="text-center font-medium">
                    {item.midMarket.newClients}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-blue-600 dark:text-blue-400">Mid-Market MRR</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`midmarket-mrr-${item.month}`} className="text-center font-medium">
                    ${formatCurrency(item.midMarket.subscriptionRevenue)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-emerald-600 dark:text-emerald-400">SMB New Clients</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`smb-clients-${item.month}`} className="text-center font-medium">
                    {item.smb.newClients}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-emerald-600 dark:text-emerald-400">SMB MRR</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`smb-mrr-${item.month}`} className="text-center font-medium">
                    ${formatCurrency(item.smb.subscriptionRevenue)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-blue-600 dark:text-blue-400">Implementation Revenue</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`implementation-${item.month}`} className="text-center font-medium">
                    ${formatCurrency(item.implementationRevenue)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-amber-600 dark:text-amber-400">Other Revenue</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`other-${item.month}`} className="text-center font-medium">
                    ${formatCurrency(item.otherRevenue)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="bg-slate-50 dark:bg-slate-800/20 border-t-2 border-slate-200">
                <TableCell className="font-bold text-teal-700 dark:text-teal-400">Monthly Total</TableCell>
                {monthlyRevenueDrivers.map(item => (
                  <TableCell key={`total-${item.month}`} className="text-center font-bold text-teal-700 dark:text-teal-400">
                    ${formatCurrency(calculateMonthlyTotal(item.month))}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
