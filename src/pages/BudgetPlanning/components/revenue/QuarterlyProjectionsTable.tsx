
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";

// Quarterly projections
const quarterlyProjections = [
  { quarter: "Q1", revenue: 285000, growth: "8.2%" },
  { quarter: "Q2", revenue: 335000, growth: "13.5%" },
  { quarter: "Q3", revenue: 390000, growth: "15.2%" },
  { quarter: "Q4", revenue: 435000, growth: "11.2%" },
];

export const QuarterlyProjectionsTable: React.FC = () => {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">Quarterly Revenue Projections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100 dark:bg-slate-800/50">
              <TableRow>
                <TableHead className="w-[150px]">Category</TableHead>
                {quarterlyProjections.map((item) => (
                  <TableHead key={item.quarter} className="text-center">{item.quarter}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-slate-800 dark:text-slate-200">Projected Revenue</TableCell>
                {quarterlyProjections.map((item) => (
                  <TableCell key={`revenue-${item.quarter}`} className="text-center font-medium">
                    ${formatCurrency(item.revenue)}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <TableCell className="font-medium text-slate-800 dark:text-slate-200">Growth</TableCell>
                {quarterlyProjections.map((item) => (
                  <TableCell key={`growth-${item.quarter}`} className="text-center text-emerald-600 dark:text-emerald-400 font-medium">
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
