
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CashflowStatement = () => {
  const [period, setPeriod] = useState("q1-2024");
  
  // Sample quarterly Cash Flow data
  const cashflowByQuarter = {
    "q1-2024": {
      title: "Q1 2024",
      endDate: "March 31, 2024",
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
    },
    "q4-2023": {
      title: "Q4 2023",
      endDate: "December 31, 2023",
      operating: [
        { item: "Net Income", amount: 780000 },
        { item: "Depreciation and Amortization", amount: 120000 },
        { item: "Increase in Accounts Receivable", amount: -60000 },
        { item: "Decrease in Inventory", amount: 38000 },
        { item: "Increase in Accounts Payable", amount: 32000 },
        { item: "Decrease in Accrued Expenses", amount: -16000 },
      ],
      investing: [
        { item: "Purchase of Property and Equipment", amount: -230000 },
        { item: "Purchase of Investments", amount: -170000 },
        { item: "Sale of Investments", amount: 85000 },
      ],
      financing: [
        { item: "Proceeds from Issuance of Debt", amount: 280000 },
        { item: "Repayment of Debt", amount: -140000 },
        { item: "Dividends Paid", amount: -110000 },
        { item: "Repurchase of Common Stock", amount: -70000 },
      ]
    },
    "q3-2023": {
      title: "Q3 2023",
      endDate: "September 30, 2023",
      operating: [
        { item: "Net Income", amount: 740000 },
        { item: "Depreciation and Amortization", amount: 115000 },
        { item: "Increase in Accounts Receivable", amount: -55000 },
        { item: "Decrease in Inventory", amount: 35000 },
        { item: "Increase in Accounts Payable", amount: 30000 },
        { item: "Decrease in Accrued Expenses", amount: -14000 },
      ],
      investing: [
        { item: "Purchase of Property and Equipment", amount: -220000 },
        { item: "Purchase of Investments", amount: -160000 },
        { item: "Sale of Investments", amount: 80000 },
      ],
      financing: [
        { item: "Proceeds from Issuance of Debt", amount: 260000 },
        { item: "Repayment of Debt", amount: -130000 },
        { item: "Dividends Paid", amount: -100000 },
        { item: "Repurchase of Common Stock", amount: -65000 },
      ]
    },
    "q2-2023": {
      title: "Q2 2023",
      endDate: "June 30, 2023",
      operating: [
        { item: "Net Income", amount: 700000 },
        { item: "Depreciation and Amortization", amount: 110000 },
        { item: "Increase in Accounts Receivable", amount: -50000 },
        { item: "Decrease in Inventory", amount: 32000 },
        { item: "Increase in Accounts Payable", amount: 28000 },
        { item: "Decrease in Accrued Expenses", amount: -12000 },
      ],
      investing: [
        { item: "Purchase of Property and Equipment", amount: -210000 },
        { item: "Purchase of Investments", amount: -150000 },
        { item: "Sale of Investments", amount: 75000 },
      ],
      financing: [
        { item: "Proceeds from Issuance of Debt", amount: 240000 },
        { item: "Repayment of Debt", amount: -120000 },
        { item: "Dividends Paid", amount: -90000 },
        { item: "Repurchase of Common Stock", amount: -60000 },
      ]
    },
    "q1-2023": {
      title: "Q1 2023",
      endDate: "March 31, 2023",
      operating: [
        { item: "Net Income", amount: 660000 },
        { item: "Depreciation and Amortization", amount: 105000 },
        { item: "Increase in Accounts Receivable", amount: -45000 },
        { item: "Decrease in Inventory", amount: 30000 },
        { item: "Increase in Accounts Payable", amount: 25000 },
        { item: "Decrease in Accrued Expenses", amount: -10000 },
      ],
      investing: [
        { item: "Purchase of Property and Equipment", amount: -200000 },
        { item: "Purchase of Investments", amount: -140000 },
        { item: "Sale of Investments", amount: 70000 },
      ],
      financing: [
        { item: "Proceeds from Issuance of Debt", amount: 220000 },
        { item: "Repayment of Debt", amount: -110000 },
        { item: "Dividends Paid", amount: -80000 },
        { item: "Repurchase of Common Stock", amount: -55000 },
      ]
    }
  };
  
  const selectedData = cashflowByQuarter[period] || cashflowByQuarter["q1-2024"];
  
  // Calculate totals
  const totalOperating = selectedData.operating.reduce((sum, item) => sum + item.amount, 0);
  const totalInvesting = selectedData.investing.reduce((sum, item) => sum + item.amount, 0);
  const totalFinancing = selectedData.financing.reduce((sum, item) => sum + item.amount, 0);
  const netCashflow = totalOperating + totalInvesting + totalFinancing;
  
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
          <h2 className="text-xl font-semibold text-center mb-4">Cash Flow Statement</h2>
          <p className="text-center text-muted-foreground mb-6">For the period ending {selectedData.endDate}</p>
          
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
              
              {selectedData.operating.map((item, index) => (
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
              
              {selectedData.investing.map((item, index) => (
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
              
              {selectedData.financing.map((item, index) => (
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
