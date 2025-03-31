
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Annual projections by segment
const segmentProjections = [
  { segment: "Enterprise", revenue: 720000, growth: "18.5%", percentage: "49.6%" },
  { segment: "Mid-Market", revenue: 430000, growth: "9.2%", percentage: "29.7%" },
  { segment: "SMB", revenue: 295000, growth: "5.8%", percentage: "20.7%" },
];

export const SegmentProjectionsTable: React.FC = () => {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">Revenue by Segment</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="w-[100px]">Segment</TableHead>
              <TableHead>Projected Revenue</TableHead>
              <TableHead>Growth</TableHead>
              <TableHead className="text-right">% of Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {segmentProjections.map((item) => (
              <TableRow key={item.segment} className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium">{item.segment}</TableCell>
                <TableCell>${(item.revenue).toLocaleString()}</TableCell>
                <TableCell className="text-emerald-600 dark:text-emerald-400">{item.growth}</TableCell>
                <TableCell className="text-right text-blue-600 dark:text-blue-400">{item.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
