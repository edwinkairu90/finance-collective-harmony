
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PLStatement = () => {
  const [period, setPeriod] = useState("q1-2024");
  
  // Sample quarterly P&L data
  const plDataByQuarter = {
    "q1-2024": {
      title: "Q1 2024",
      endDate: "March 31, 2024",
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
    },
    "q4-2023": {
      title: "Q4 2023",
      endDate: "December 31, 2023",
      revenue: [
        { item: "Product Sales", amount: 1150000 },
        { item: "Service Revenue", amount: 420000 },
        { item: "Subscription Revenue", amount: 300000 },
      ],
      expenses: [
        { item: "Cost of Goods Sold", amount: 590000 },
        { item: "Employee Salaries", amount: 360000 },
        { item: "Marketing Expenses", amount: 165000 },
        { item: "Rent & Utilities", amount: 82000 },
        { item: "Software & Tools", amount: 42000 },
        { item: "Insurance", amount: 27000 },
        { item: "Professional Services", amount: 60000 },
        { item: "Other Operating Expenses", amount: 90000 },
      ]
    },
    "q3-2023": {
      title: "Q3 2023",
      endDate: "September 30, 2023",
      revenue: [
        { item: "Product Sales", amount: 1050000 },
        { item: "Service Revenue", amount: 390000 },
        { item: "Subscription Revenue", amount: 280000 },
      ],
      expenses: [
        { item: "Cost of Goods Sold", amount: 560000 },
        { item: "Employee Salaries", amount: 340000 },
        { item: "Marketing Expenses", amount: 155000 },
        { item: "Rent & Utilities", amount: 80000 },
        { item: "Software & Tools", amount: 38000 },
        { item: "Insurance", amount: 26000 },
        { item: "Professional Services", amount: 55000 },
        { item: "Other Operating Expenses", amount: 85000 },
      ]
    },
    "q2-2023": {
      title: "Q2 2023",
      endDate: "June 30, 2023",
      revenue: [
        { item: "Product Sales", amount: 980000 },
        { item: "Service Revenue", amount: 360000 },
        { item: "Subscription Revenue", amount: 260000 },
      ],
      expenses: [
        { item: "Cost of Goods Sold", amount: 520000 },
        { item: "Employee Salaries", amount: 320000 },
        { item: "Marketing Expenses", amount: 145000 },
        { item: "Rent & Utilities", amount: 78000 },
        { item: "Software & Tools", amount: 35000 },
        { item: "Insurance", amount: 25000 },
        { item: "Professional Services", amount: 52000 },
        { item: "Other Operating Expenses", amount: 82000 },
      ]
    },
    "q1-2023": {
      title: "Q1 2023",
      endDate: "March 31, 2023",
      revenue: [
        { item: "Product Sales", amount: 920000 },
        { item: "Service Revenue", amount: 330000 },
        { item: "Subscription Revenue", amount: 230000 },
      ],
      expenses: [
        { item: "Cost of Goods Sold", amount: 490000 },
        { item: "Employee Salaries", amount: 300000 },
        { item: "Marketing Expenses", amount: 135000 },
        { item: "Rent & Utilities", amount: 75000 },
        { item: "Software & Tools", amount: 32000 },
        { item: "Insurance", amount: 24000 },
        { item: "Professional Services", amount: 48000 },
        { item: "Other Operating Expenses", amount: 78000 },
      ]
    }
  };
  
  const selectedData = plDataByQuarter[period] || plDataByQuarter["q1-2024"];
  
  // Calculate totals
  const totalRevenue = selectedData.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = selectedData.expenses.reduce((sum, item) => sum + item.amount, 0);
  const grossProfit = totalRevenue - totalExpenses;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Quarter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
              <SelectItem value="q3-2023">Q3 2023</SelectItem>
              <SelectItem value="q2-2023">Q2 2023</SelectItem>
              <SelectItem value="q1-2023">Q1 2023</SelectItem>
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
          <p className="text-center text-muted-foreground mb-6">For the period ending {selectedData.endDate}</p>
          
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
              
              {selectedData.revenue.map((item, index) => (
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
              
              {selectedData.expenses.map((item, index) => (
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
