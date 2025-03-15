
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PLStatement = () => {
  const [period, setPeriod] = useState("current-quarter");
  
  // Sample P&L data
  const plData = {
    revenue: [
      { item: "Product Sales", amount: 1250000 },
      { item: "Service Revenue", amount: 450000 },
      { item: "Subscription Revenue", amount: 320000 },
    ],
    expenses: [
      { item: "Cost of Goods Sold", amount: 620000 },
      { item: "Employee Salaries", amount: 380000 },
      { item: "Marketing Expenses", amount: 175000 },
      { item: "Rent & Utilities", amount: 85000 },
      { item: "Software & Tools", amount: 45000 },
      { item: "Insurance", amount: 28000 },
      { item: "Professional Services", amount: 65000 },
      { item: "Other Operating Expenses", amount: 95000 },
    ]
  };
  
  // Calculate totals
  const totalRevenue = plData.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = plData.expenses.reduce((sum, item) => sum + item.amount, 0);
  const grossProfit = totalRevenue - totalExpenses;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center mb-4">Profit & Loss Statement</h2>
          <p className="text-center text-muted-foreground mb-6">For the period ending June 30, 2023</p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Revenue Section */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Revenue</TableCell>
              </TableRow>
              
              {plData.revenue.map((item, index) => (
                <TableRow key={`revenue-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell>Total Revenue</TableCell>
                <TableCell className="text-right">${totalRevenue.toLocaleString()}</TableCell>
              </TableRow>
              
              {/* Expenses Section */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Expenses</TableCell>
              </TableRow>
              
              {plData.expenses.map((item, index) => (
                <TableRow key={`expense-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell>Total Expenses</TableCell>
                <TableCell className="text-right">${totalExpenses.toLocaleString()}</TableCell>
              </TableRow>
              
              {/* Net Profit/Loss */}
              <TableRow className="font-bold bg-muted/50">
                <TableCell>Net Profit/(Loss)</TableCell>
                <TableCell className={`text-right ${grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${grossProfit.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
