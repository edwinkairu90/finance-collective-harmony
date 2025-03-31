
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Revenue drivers by segment
const revenueDrivers = [
  { 
    segment: "Enterprise", 
    newClients: 12, 
    totalClients: 48, 
    avgRevenuePerClient: 15000, 
    clientRetention: "92%",
    expansionRevenue: 125000
  },
  { 
    segment: "Mid-Market", 
    newClients: 25, 
    totalClients: 120, 
    avgRevenuePerClient: 3580, 
    clientRetention: "85%",
    expansionRevenue: 92000
  },
  { 
    segment: "SMB", 
    newClients: 85, 
    totalClients: 410, 
    avgRevenuePerClient: 720, 
    clientRetention: "78%",
    expansionRevenue: 45000
  },
];

export const RevenueDriversTable: React.FC = () => {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">Revenue Drivers by Segment</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="w-[100px]">Segment</TableHead>
              <TableHead>New Clients</TableHead>
              <TableHead>Total Clients</TableHead>
              <TableHead>Avg. Revenue per Client</TableHead>
              <TableHead>Client Retention</TableHead>
              <TableHead className="text-right">Expansion Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueDrivers.map((item) => (
              <TableRow key={item.segment} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium">{item.segment}</TableCell>
                <TableCell className="text-purple-600 dark:text-purple-400 font-medium">{item.newClients}</TableCell>
                <TableCell>{item.totalClients}</TableCell>
                <TableCell className="text-blue-600 dark:text-blue-400 font-medium">
                  ${item.avgRevenuePerClient.toLocaleString()}
                </TableCell>
                <TableCell className="text-emerald-600 dark:text-emerald-400">{item.clientRetention}</TableCell>
                <TableCell className="text-right text-amber-600 dark:text-amber-400 font-medium">
                  ${item.expansionRevenue.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
