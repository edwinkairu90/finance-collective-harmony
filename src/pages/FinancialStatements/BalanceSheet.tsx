
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BalanceSheet = () => {
  const [period, setPeriod] = useState("current-quarter");
  
  // Sample Balance Sheet data
  const balanceSheetData = {
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
  };
  
  // Calculate totals
  const totalCurrentAssets = balanceSheetData.assets.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentAssets = balanceSheetData.assets.nonCurrent.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  
  const totalCurrentLiabilities = balanceSheetData.liabilities.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentLiabilities = balanceSheetData.liabilities.nonCurrent.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;
  
  const totalEquity = balanceSheetData.equity.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
  
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
          <h2 className="text-xl font-semibold text-center mb-4">Balance Sheet</h2>
          <p className="text-center text-muted-foreground mb-6">As of June 30, 2023</p>
          
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
              
              {balanceSheetData.assets.current.map((item, index) => (
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
              
              {balanceSheetData.assets.nonCurrent.map((item, index) => (
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
              
              {balanceSheetData.liabilities.current.map((item, index) => (
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
              
              {balanceSheetData.liabilities.nonCurrent.map((item, index) => (
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
              
              {balanceSheetData.equity.map((item, index) => (
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
