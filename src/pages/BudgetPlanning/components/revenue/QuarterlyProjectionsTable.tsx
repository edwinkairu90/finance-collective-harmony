
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { MonthlyRevenueData } from "./types/revenueTypes";
import { calculateQuarterlyProjections } from "./utils/revenueProjections";

interface QuarterlyProjectionsTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const QuarterlyProjectionsTable: React.FC<QuarterlyProjectionsTableProps> = ({ monthlyRevenueDrivers }) => {
  const quarterlyProjections = calculateQuarterlyProjections(monthlyRevenueDrivers);

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-sm text-slate-800 dark:text-slate-200">Quarterly Revenue Projections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="w-[150px] text-xs font-semibold">Category</TableHead>
                {quarterlyProjections.map((item) => (
                  <TableHead key={item.quarter} className="text-center text-xs font-semibold">{item.quarter}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-slate-800 dark:text-slate-200 text-xs">Projected Revenue</TableCell>
                {quarterlyProjections.map((item) => (
                  <TableCell key={`revenue-${item.quarter}`} className="text-center font-medium text-xs">
                    {formatCurrency(item.revenue)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-slate-800 dark:text-slate-200 text-xs">Growth</TableCell>
                {quarterlyProjections.map((item) => (
                  <TableCell key={`growth-${item.quarter}`} className="text-center text-emerald-600 dark:text-emerald-400 font-medium text-xs">
                    {item.growth}
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
