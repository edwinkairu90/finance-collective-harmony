
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { MonthlyRevenueData } from "./types/revenueTypes";
import { calculateSegmentProjections } from "./utils/revenueProjections";

interface SegmentProjectionsTableProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
}

export const SegmentProjectionsTable: React.FC<SegmentProjectionsTableProps> = ({ monthlyRevenueDrivers }) => {
  const segmentProjections = calculateSegmentProjections(monthlyRevenueDrivers);

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-xl font-montserrat font-semibold text-slate-800 dark:text-slate-200">Revenue by Segment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="w-[100px] text-sm text-slate-600 dark:text-slate-300 font-medium">Segment</TableHead>
                <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Projected Revenue</TableHead>
                <TableHead className="text-sm text-slate-600 dark:text-slate-300 font-medium">Growth</TableHead>
                <TableHead className="text-right text-sm text-slate-600 dark:text-slate-300 font-medium">% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segmentProjections.map((item) => (
                <TableRow key={item.segment} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <TableCell className="font-medium text-slate-800 dark:text-slate-200 text-sm">{item.segment}</TableCell>
                  <TableCell className="font-medium text-slate-800 dark:text-slate-200 text-sm">{formatCurrency(item.revenue)}</TableCell>
                  <TableCell className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">{item.growth}</TableCell>
                  <TableCell className="text-right text-blue-600 dark:text-blue-400 font-medium text-sm">{item.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
