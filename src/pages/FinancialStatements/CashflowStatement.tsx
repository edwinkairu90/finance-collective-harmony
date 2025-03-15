
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CashflowStatement = () => {
  const [period, setPeriod] = useState("current-quarter");
  
  // Sample Cash Flow data
  const cashflowData = {
    operating: [
      { item: "Net Income", amount: 820000 },
      { item: "Depreciation and Amortization", amount: 125000 },
      { item: "Increase in Accounts Receivable", amount: -65000 },
      { item: "Decrease in Inventory", amount: 42000 },
      { item: "Increase in Accounts Payable", amount: 35000 },
      { item: "Decrease in Accrued Expenses", amount: -18000 },
    ],
    investing: [
      { item: "Purchase of Property and Equipment", amount: -250000 },
      { item: "Purchase of Investments", amount: -180000 },
      { item: "Sale of Investments", amount: 95000 },
    ],
    financing: [
      { item: "Proceeds from Issuance of Debt", amount: 300000 },
      { item: "Repayment of Debt", amount: -150000 },
      { item: "Dividends Paid", amount: -120000 },
      { item: "Repurchase of Common Stock", amount: -75000 },
    ]
  };
  
  // Calculate totals
  const totalOperating = cashflowData.operating.reduce((sum, item) => sum + item.amount, 0);
  const totalInvesting = cashflowData.investing.reduce((sum, item) => sum + item.amount, 0);
  const totalFinancing = cashflowData.financing.reduce((sum, item) => sum + item.amount, 0);
  const netCashflow = totalOperating + totalInvesting + totalFinancing;
  
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
          <h2 className="text-xl font-semibold text-center mb-4">Cash Flow Statement</h2>
          <p className="text-center text-muted-foreground mb-6">For the period ending June 30, 2023</p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Operating Activities */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Cash Flow from Operating Activities</TableCell>
              </TableRow>
              
              {cashflowData.operating.map((item, index) => (
                <TableRow key={`operating-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell>Net Cash from Operating Activities</TableCell>
                <TableCell className={`text-right ${totalOperating >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${totalOperating.toLocaleString()}
                </TableCell>
              </TableRow>
              
              {/* Investing Activities */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Cash Flow from Investing Activities</TableCell>
              </TableRow>
              
              {cashflowData.investing.map((item, index) => (
                <TableRow key={`investing-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell>Net Cash from Investing Activities</TableCell>
                <TableCell className={`text-right ${totalInvesting >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${totalInvesting.toLocaleString()}
                </TableCell>
              </TableRow>
              
              {/* Financing Activities */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Cash Flow from Financing Activities</TableCell>
              </TableRow>
              
              {cashflowData.financing.map((item, index) => (
                <TableRow key={`financing-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell>Net Cash from Financing Activities</TableCell>
                <TableCell className={`text-right ${totalFinancing >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${totalFinancing.toLocaleString()}
                </TableCell>
              </TableRow>
              
              {/* Net Cash Flow */}
              <TableRow className="font-bold bg-muted/50">
                <TableCell>Net Increase/(Decrease) in Cash</TableCell>
                <TableCell className={`text-right ${netCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${netCashflow.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
