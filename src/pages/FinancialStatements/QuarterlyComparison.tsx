
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { quarterlyData } from "@/components/quarterly/QuarterlyData";

export const QuarterlyComparison = () => {
  const [statementType, setStatementType] = useState("revenue");
  
  // Data for quarterly comparison
  const comparisonData = {
    revenue: [
      { quarter: "Q1 2023", amount: 1480000, change: null },
      { quarter: "Q2 2023", amount: 1600000, change: 8.1 },
      { quarter: "Q3 2023", amount: 1720000, change: 7.5 },
      { quarter: "Q4 2023", amount: 1870000, change: 8.7 },
      { quarter: "Q1 2024", amount: 2020000, change: 8.0 },
    ],
    grossProfit: [
      { quarter: "Q1 2023", amount: 990000, change: null },
      { quarter: "Q2 2023", amount: 1080000, change: 9.1 },
      { quarter: "Q3 2023", amount: 1160000, change: 7.4 },
      { quarter: "Q4 2023", amount: 1280000, change: 10.3 },
      { quarter: "Q1 2024", amount: 1400000, change: 9.4 },
    ],
    netIncome: [
      { quarter: "Q1 2023", amount: 660000, change: null },
      { quarter: "Q2 2023", amount: 700000, change: 6.1 },
      { quarter: "Q3 2023", amount: 740000, change: 5.7 },
      { quarter: "Q4 2023", amount: 780000, change: 5.4 },
      { quarter: "Q1 2024", amount: 820000, change: 5.1 },
    ],
    totalAssets: [
      { quarter: "Q1 2023", amount: 3765000, change: null },
      { quarter: "Q2 2023", amount: 3920000, change: 4.1 },
      { quarter: "Q3 2023", amount: 4045000, change: 3.2 },
      { quarter: "Q4 2023", amount: 4180000, change: 3.3 },
      { quarter: "Q1 2024", amount: 4365000, change: 4.4 },
    ],
    operatingCashFlow: [
      { quarter: "Q1 2023", amount: 765000, change: null },
      { quarter: "Q2 2023", amount: 808000, change: 5.6 },
      { quarter: "Q3 2023", amount: 851000, change: 5.3 },
      { quarter: "Q4 2023", amount: 894000, change: 5.1 },
      { quarter: "Q1 2024", amount: 939000, change: 5.0 },
    ],
  };

  // Get quarters and growth trend
  const getComparisonRows = () => {
    const data = comparisonData[statementType];
    const quarters = data.map(item => item.quarter);
    
    return quarters.map((quarter, index) => {
      if (index === 0) return null; // Skip first quarter as we need previous quarter for comparison
      
      const currentData = data[index];
      const previousData = data[index - 1];
      const changePercent = currentData.change;
      
      // Calculate growth trend
      const previousChange = index > 1 ? data[index - 1].change : null;
      const growthTrend = previousChange !== null ? 
        (changePercent > previousChange ? 'increasing' : 
         changePercent < previousChange ? 'decreasing' : 'stable') : 'stable';
      
      return {
        quarter,
        currentAmount: currentData.amount,
        previousAmount: previousData.amount,
        changePercent,
        growthTrend
      };
    }).filter(Boolean);
  };

  const metrics = {
    revenue: "Revenue",
    grossProfit: "Gross Profit",
    netIncome: "Net Income",
    totalAssets: "Total Assets",
    operatingCashFlow: "Operating Cash Flow",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Quarter-over-Quarter Growth Analysis</h2>
          <Select value={statementType} onValueChange={setStatementType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="grossProfit">Gross Profit</SelectItem>
              <SelectItem value="netIncome">Net Income</SelectItem>
              <SelectItem value="totalAssets">Total Assets</SelectItem>
              <SelectItem value="operatingCashFlow">Operating Cash Flow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Current Quarter</TableHead>
              <TableHead>Previous Quarter</TableHead>
              <TableHead className="text-right">Current</TableHead>
              <TableHead className="text-right">Previous</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Growth Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getComparisonRows().map((row, index) => (
              <TableRow key={`comparison-${index}`} className={index % 2 === 0 ? "bg-muted/40" : ""}>
                <TableCell className="font-medium">{row.quarter}</TableCell>
                <TableCell>{comparisonData[statementType][index].quarter}</TableCell>
                <TableCell className="text-right font-medium">${row.currentAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right">${row.previousAmount.toLocaleString()}</TableCell>
                <TableCell className={`text-right font-semibold ${row.changePercent > 0 ? "text-green-600" : "text-red-600"}`}>
                  {row.changePercent > 0 ? "+" : ""}{row.changePercent.toFixed(1)}%
                </TableCell>
                <TableCell className="text-right">
                  {row.growthTrend === 'increasing' ? (
                    <div className="flex items-center justify-end gap-1 text-green-600">
                      <span>Accelerating</span>
                      <TrendingUpIcon className="h-4 w-4" />
                    </div>
                  ) : row.growthTrend === 'decreasing' ? (
                    <div className="flex items-center justify-end gap-1 text-amber-600">
                      <span>Decelerating</span>
                      <TrendingDownIcon className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1 text-blue-600">
                      <span>Stable</span>
                      <ArrowUpIcon className="h-4 w-4" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Growth trends show quarter-over-quarter acceleration or deceleration in growth rates, not just absolute growth.</p>
        </div>
      </CardContent>
    </Card>
  );
};
