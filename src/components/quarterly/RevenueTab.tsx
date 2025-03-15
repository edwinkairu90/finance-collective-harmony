
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { quarterlyData, revenueChartData } from "./QuarterlyData";

export const RevenueTab = () => {
  return (
    <div className="space-y-4">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => [`$${value}M`, undefined]} />
            <Legend />
            <Bar dataKey="Actual" fill="#0ea5e9" />
            <Bar dataKey="Target" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quarter</TableHead>
              <TableHead className="text-right">Actual</TableHead>
              <TableHead className="text-right">Target</TableHead>
              <TableHead className="text-right">vs Target</TableHead>
              <TableHead className="text-right">YoY Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quarterlyData.revenue.slice().reverse().map((quarter) => (
              <TableRow key={quarter.quarter}>
                <TableCell>{quarter.quarter}</TableCell>
                <TableCell className="text-right">${(quarter.actual / 1000000).toFixed(1)}M</TableCell>
                <TableCell className="text-right">${(quarter.target / 1000000).toFixed(1)}M</TableCell>
                <TableCell className="text-right">
                  <Badge variant={quarter.actual >= quarter.target ? "outline" : "destructive"} className="font-normal">
                    {(((quarter.actual - quarter.target) / quarter.target) * 100).toFixed(1)}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {quarter.growth >= 0 ? 
                      <TrendingUpIcon className="mr-1 h-4 w-4 text-emerald-500" /> : 
                      <TrendingDownIcon className="mr-1 h-4 w-4 text-red-500" />}
                    {quarter.growth}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
