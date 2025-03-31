import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { MonthlyRevenueData } from "./types/revenueTypes";
import { calculateMonthlyTotal } from "./utils/revenueCalculations";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface MonthlyRevenueTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const MonthlyRevenueTable: React.FC<MonthlyRevenueTableProps> = ({
  monthlyRevenueDrivers
}) => {
  const [selectedSegment, setSelectedSegment] = useState<string>("all");

  // Filter the segments based on selection
  const showEnterprise = selectedSegment === "all" || selectedSegment === "enterprise";
  const showMidMarket = selectedSegment === "all" || selectedSegment === "midMarket";
  const showSMB = selectedSegment === "all" || selectedSegment === "smb";
  const showOther = selectedSegment === "all" || selectedSegment === "other";

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2">
          <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm text-slate-500 dark:text-slate-400">Segment:</span>
          <Select
            value={selectedSegment}
            onValueChange={setSelectedSegment}
          >
            <SelectTrigger className="w-[140px] h-8 text-sm border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="Select segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="midMarket">Mid-Market</SelectItem>
              <SelectItem value="smb">SMB</SelectItem>
              <SelectItem value="other">Other Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-200 dark:border-slate-700">
        <Table>
          <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="w-[180px] font-semibold">Revenue Category</TableHead>
              {monthlyRevenueDrivers.map(item => (
                <TableHead key={item.month} className="text-center font-semibold">{item.month}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Enterprise Section */}
            {showEnterprise && (
              <>
                <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
                  <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                      Enterprise
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">New Clients</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`enterprise-clients-${item.month}`} className="text-center">
                      {item.enterprise.newClients}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">Revenue</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`enterprise-mrr-${item.month}`} className="text-center">
                      ${formatCurrency(item.enterprise.subscriptionRevenue)}
                    </TableCell>
                  ))}
                </TableRow>
              </>
            )}
            
            {/* Mid-Market Section */}
            {showMidMarket && (
              <>
                <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
                  <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                      Mid-Market
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">New Clients</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`midmarket-clients-${item.month}`} className="text-center">
                      {item.midMarket.newClients}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">Revenue</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`midmarket-mrr-${item.month}`} className="text-center">
                      ${formatCurrency(item.midMarket.subscriptionRevenue)}
                    </TableCell>
                  ))}
                </TableRow>
              </>
            )}
            
            {/* SMB Section */}
            {showSMB && (
              <>
                <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
                  <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                      SMB
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">New Clients</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`smb-clients-${item.month}`} className="text-center">
                      {item.smb.newClients}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">Revenue</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`smb-mrr-${item.month}`} className="text-center">
                      ${formatCurrency(item.smb.subscriptionRevenue)}
                    </TableCell>
                  ))}
                </TableRow>
              </>
            )}
            
            {/* Other Revenue Streams */}
            {showOther && (
              <>
                <TableRow className="bg-slate-50/50 dark:bg-slate-800/10">
                  <TableCell colSpan={monthlyRevenueDrivers.length + 1} className="py-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800">
                      Other Revenue
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">Implementation</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`implementation-${item.month}`} className="text-center">
                      ${formatCurrency(item.implementationRevenue)}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium pl-6">Other</TableCell>
                  {monthlyRevenueDrivers.map(item => (
                    <TableCell key={`other-${item.month}`} className="text-center">
                      ${formatCurrency(item.otherRevenue)}
                    </TableCell>
                  ))}
                </TableRow>
              </>
            )}
            
            {/* Total Row - Always show this */}
            <TableRow className="bg-slate-100 dark:bg-slate-800/30 border-t border-slate-300 dark:border-slate-700">
              <TableCell className="font-bold text-teal-700 dark:text-teal-400">Monthly Total</TableCell>
              {monthlyRevenueDrivers.map(item => (
                <TableCell key={`total-${item.month}`} className="text-center font-bold text-teal-700 dark:text-teal-400">
                  ${formatCurrency(calculateMonthlyTotal(item.month, monthlyRevenueDrivers))}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
