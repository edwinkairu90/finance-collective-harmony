
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BalanceSheet = () => {
  const [period, setPeriod] = useState("q1-2024");
  
  // Sample quarterly Balance Sheet data
  const balanceSheetByQuarter = {
    "q1-2024": {
      title: "Q1 2024",
      date: "March 31, 2024",
      assets: {
        current: [
          { item: "Cash and Cash Equivalents", amount: 850000 },
          { item: "Short-term Investments", amount: 250000 },
          { item: "Accounts Receivable", amount: 420000 },
          { item: "Inventory", amount: 360000 },
          { item: "Prepaid Expenses", amount: 85000 },
        ],
        nonCurrent: [
          { item: "Property, Plant & Equipment", amount: 1200000 },
          { item: "Intangible Assets", amount: 450000 },
          { item: "Long-term Investments", amount: 750000 },
        ]
      },
      liabilities: {
        current: [
          { item: "Accounts Payable", amount: 320000 },
          { item: "Short-term Debt", amount: 150000 },
          { item: "Accrued Expenses", amount: 95000 },
          { item: "Deferred Revenue", amount: 120000 },
        ],
        nonCurrent: [
          { item: "Long-term Debt", amount: 850000 },
          { item: "Lease Obligations", amount: 420000 },
          { item: "Deferred Tax Liabilities", amount: 175000 },
        ]
      },
      equity: [
        { item: "Common Stock", amount: 1000000 },
        { item: "Retained Earnings", amount: 1235000 },
      ]
    },
    "q4-2023": {
      title: "Q4 2023",
      date: "December 31, 2023",
      assets: {
        current: [
          { item: "Cash and Cash Equivalents", amount: 780000 },
          { item: "Short-term Investments", amount: 230000 },
          { item: "Accounts Receivable", amount: 400000 },
          { item: "Inventory", amount: 350000 },
          { item: "Prepaid Expenses", amount: 80000 },
        ],
        nonCurrent: [
          { item: "Property, Plant & Equipment", amount: 1180000 },
          { item: "Intangible Assets", amount: 440000 },
          { item: "Long-term Investments", amount: 720000 },
        ]
      },
      liabilities: {
        current: [
          { item: "Accounts Payable", amount: 300000 },
          { item: "Short-term Debt", amount: 140000 },
          { item: "Accrued Expenses", amount: 90000 },
          { item: "Deferred Revenue", amount: 110000 },
        ],
        nonCurrent: [
          { item: "Long-term Debt", amount: 830000 },
          { item: "Lease Obligations", amount: 410000 },
          { item: "Deferred Tax Liabilities", amount: 170000 },
        ]
      },
      equity: [
        { item: "Common Stock", amount: 1000000 },
        { item: "Retained Earnings", amount: 1130000 },
      ]
    },
    "q3-2023": {
      title: "Q3 2023",
      date: "September 30, 2023",
      assets: {
        current: [
          { item: "Cash and Cash Equivalents", amount: 750000 },
          { item: "Short-term Investments", amount: 210000 },
          { item: "Accounts Receivable", amount: 380000 },
          { item: "Inventory", amount: 340000 },
          { item: "Prepaid Expenses", amount: 75000 },
        ],
        nonCurrent: [
          { item: "Property, Plant & Equipment", amount: 1160000 },
          { item: "Intangible Assets", amount: 430000 },
          { item: "Long-term Investments", amount: 700000 },
        ]
      },
      liabilities: {
        current: [
          { item: "Accounts Payable", amount: 290000 },
          { item: "Short-term Debt", amount: 130000 },
          { item: "Accrued Expenses", amount: 85000 },
          { item: "Deferred Revenue", amount: 105000 },
        ],
        nonCurrent: [
          { item: "Long-term Debt", amount: 820000 },
          { item: "Lease Obligations", amount: 400000 },
          { item: "Deferred Tax Liabilities", amount: 165000 },
        ]
      },
      equity: [
        { item: "Common Stock", amount: 1000000 },
        { item: "Retained Earnings", amount: 1050000 },
      ]
    },
    "q2-2023": {
      title: "Q2 2023",
      date: "June 30, 2023",
      assets: {
        current: [
          { item: "Cash and Cash Equivalents", amount: 720000 },
          { item: "Short-term Investments", amount: 200000 },
          { item: "Accounts Receivable", amount: 360000 },
          { item: "Inventory", amount: 330000 },
          { item: "Prepaid Expenses", amount: 70000 },
        ],
        nonCurrent: [
          { item: "Property, Plant & Equipment", amount: 1140000 },
          { item: "Intangible Assets", amount: 420000 },
          { item: "Long-term Investments", amount: 680000 },
        ]
      },
      liabilities: {
        current: [
          { item: "Accounts Payable", amount: 280000 },
          { item: "Short-term Debt", amount: 120000 },
          { item: "Accrued Expenses", amount: 80000 },
          { item: "Deferred Revenue", amount: 100000 },
        ],
        nonCurrent: [
          { item: "Long-term Debt", amount: 810000 },
          { item: "Lease Obligations", amount: 390000 },
          { item: "Deferred Tax Liabilities", amount: 160000 },
        ]
      },
      equity: [
        { item: "Common Stock", amount: 1000000 },
        { item: "Retained Earnings", amount: 980000 },
      ]
    },
    "q1-2023": {
      title: "Q1 2023",
      date: "March 31, 2023",
      assets: {
        current: [
          { item: "Cash and Cash Equivalents", amount: 680000 },
          { item: "Short-term Investments", amount: 180000 },
          { item: "Accounts Receivable", amount: 340000 },
          { item: "Inventory", amount: 320000 },
          { item: "Prepaid Expenses", amount: 65000 },
        ],
        nonCurrent: [
          { item: "Property, Plant & Equipment", amount: 1120000 },
          { item: "Intangible Assets", amount: 410000 },
          { item: "Long-term Investments", amount: 650000 },
        ]
      },
      liabilities: {
        current: [
          { item: "Accounts Payable", amount: 270000 },
          { item: "Short-term Debt", amount: 110000 },
          { item: "Accrued Expenses", amount: 75000 },
          { item: "Deferred Revenue", amount: 95000 },
        ],
        nonCurrent: [
          { item: "Long-term Debt", amount: 800000 },
          { item: "Lease Obligations", amount: 380000 },
          { item: "Deferred Tax Liabilities", amount: 155000 },
        ]
      },
      equity: [
        { item: "Common Stock", amount: 1000000 },
        { item: "Retained Earnings", amount: 880000 },
      ]
    }
  };
  
  const selectedData = balanceSheetByQuarter[period] || balanceSheetByQuarter["q1-2024"];
  
  // Calculate totals
  const totalCurrentAssets = selectedData.assets.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentAssets = selectedData.assets.nonCurrent.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  
  const totalCurrentLiabilities = selectedData.liabilities.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentLiabilities = selectedData.liabilities.nonCurrent.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;
  
  const totalEquity = selectedData.equity.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
  
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
          <h2 className="text-xl font-semibold text-center mb-4">Balance Sheet</h2>
          <p className="text-center text-muted-foreground mb-6">As of {selectedData.date}</p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%]">Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Assets Section */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Assets</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="pl-4 font-medium">Current Assets</TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {selectedData.assets.current.map((item, index) => (
                <TableRow key={`current-asset-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell className="pl-4">Total Current Assets</TableCell>
                <TableCell className="text-right">${totalCurrentAssets.toLocaleString()}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="pl-4 font-medium">Non-Current Assets</TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {selectedData.assets.nonCurrent.map((item, index) => (
                <TableRow key={`non-current-asset-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell className="pl-4">Total Non-Current Assets</TableCell>
                <TableCell className="text-right">${totalNonCurrentAssets.toLocaleString()}</TableCell>
              </TableRow>
              
              <TableRow className="font-bold bg-muted/50">
                <TableCell>Total Assets</TableCell>
                <TableCell className="text-right">${totalAssets.toLocaleString()}</TableCell>
              </TableRow>
              
              {/* Liabilities Section */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Liabilities</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="pl-4 font-medium">Current Liabilities</TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {selectedData.liabilities.current.map((item, index) => (
                <TableRow key={`current-liability-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell className="pl-4">Total Current Liabilities</TableCell>
                <TableCell className="text-right">${totalCurrentLiabilities.toLocaleString()}</TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell className="pl-4 font-medium">Non-Current Liabilities</TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {selectedData.liabilities.nonCurrent.map((item, index) => (
                <TableRow key={`non-current-liability-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell className="pl-4">Total Non-Current Liabilities</TableCell>
                <TableCell className="text-right">${totalNonCurrentLiabilities.toLocaleString()}</TableCell>
              </TableRow>
              
              <TableRow className="font-medium">
                <TableCell>Total Liabilities</TableCell>
                <TableCell className="text-right">${totalLiabilities.toLocaleString()}</TableCell>
              </TableRow>
              
              {/* Equity Section */}
              <TableRow className="bg-muted/30">
                <TableCell colSpan={2} className="font-semibold">Equity</TableCell>
              </TableRow>
              
              {selectedData.equity.map((item, index) => (
                <TableRow key={`equity-${index}`}>
                  <TableCell className="pl-8">{item.item}</TableCell>
                  <TableCell className="text-right">${item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              
              <TableRow className="font-medium">
                <TableCell>Total Equity</TableCell>
                <TableCell className="text-right">${totalEquity.toLocaleString()}</TableCell>
              </TableRow>
              
              {/* Total Liabilities and Equity */}
              <TableRow className="font-bold bg-muted/50">
                <TableCell>Total Liabilities and Equity</TableCell>
                <TableCell className="text-right">${totalLiabilitiesAndEquity.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
