
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Filter } from "lucide-react";

export const PLStatement = () => {
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
  
  // Get last 4 quarters
  const lastFourQuarters = ["q1-2024", "q4-2023", "q3-2023", "q2-2023"];
  const quarters = lastFourQuarters.map(q => plDataByQuarter[q]);
  
  // Get all unique revenue and expense line items
  const getAllItems = () => {
    const revenueItems = new Set();
    const expenseItems = new Set();
    
    quarters.forEach(quarter => {
      quarter.revenue.forEach(item => revenueItems.add(item.item));
      quarter.expenses.forEach(item => expenseItems.add(item.item));
    });
    
    return {
      revenueItems: Array.from(revenueItems),
      expenseItems: Array.from(expenseItems)
    };
  };
  
  const { revenueItems, expenseItems } = getAllItems();
  
  // Calculate quarterly totals
  const calculateQuarterlyTotals = () => {
    return quarters.map(quarter => {
      const totalRevenue = quarter.revenue.reduce((sum, item) => sum + item.amount, 0);
      const totalExpenses = quarter.expenses.reduce((sum, item) => sum + item.amount, 0);
      return {
        title: quarter.title,
        totalRevenue,
        totalExpenses,
        netProfit: totalRevenue - totalExpenses
      };
    });
  };
  
  const quarterlyTotals = calculateQuarterlyTotals();
  
  // Get value for a specific item in a specific quarter
  const getItemValue = (quarterData, itemName, type) => {
    const items = type === 'revenue' ? quarterData.revenue : quarterData.expenses;
    const item = items.find(i => i.item === itemName);
    return item ? item.amount : 0;
  };
  
  // Calculate growth between quarters
  const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return null;
    return ((current - previous) / previous) * 100;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Last 4 Quarters Performance</h3>
        
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
          <h2 className="text-xl font-semibold text-center mb-4">Quarterly Profit & Loss Comparison</h2>
          <p className="text-center text-muted-foreground mb-6">Last 4 quarters comparison</p>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[20%]">Line Item</TableHead>
                  {quarters.map((quarter, idx) => (
                    <TableHead key={idx} className="text-right">
                      {quarter.title}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {/* Revenue Section */}
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={5} className="font-semibold">Revenue</TableCell>
                </TableRow>
                
                {revenueItems.map((item, index) => (
                  <TableRow key={`revenue-${index}`}>
                    <TableCell className="pl-8">{item}</TableCell>
                    {quarters.map((quarter, qIdx) => {
                      const value = getItemValue(quarter, item, 'revenue');
                      const prevValue = qIdx < quarters.length - 1 ? 
                        getItemValue(quarters[qIdx + 1], item, 'revenue') : null;
                      const growth = calculateGrowth(value, prevValue);
                      
                      return (
                        <TableCell key={`q-${qIdx}`} className="text-right">
                          <div>${value.toLocaleString()}</div>
                          {growth !== null && qIdx < quarters.length - 1 && (
                            <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                
                {/* Total Revenue */}
                <TableRow className="font-medium">
                  <TableCell>Total Revenue</TableCell>
                  {quarterlyTotals.map((total, idx) => {
                    const prevTotal = idx < quarterlyTotals.length - 1 ? 
                      quarterlyTotals[idx + 1].totalRevenue : null;
                    const growth = calculateGrowth(total.totalRevenue, prevTotal);
                    
                    return (
                      <TableCell key={`total-rev-${idx}`} className="text-right">
                        <div>${total.totalRevenue.toLocaleString()}</div>
                        {growth !== null && idx < quarterlyTotals.length - 1 && (
                          <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
                
                {/* Expenses Section */}
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={5} className="font-semibold">Expenses</TableCell>
                </TableRow>
                
                {expenseItems.map((item, index) => (
                  <TableRow key={`expense-${index}`}>
                    <TableCell className="pl-8">{item}</TableCell>
                    {quarters.map((quarter, qIdx) => {
                      const value = getItemValue(quarter, item, 'expenses');
                      const prevValue = qIdx < quarters.length - 1 ? 
                        getItemValue(quarters[qIdx + 1], item, 'expenses') : null;
                      const growth = calculateGrowth(value, prevValue);
                      
                      return (
                        <TableCell key={`q-${qIdx}`} className="text-right">
                          <div>${value.toLocaleString()}</div>
                          {growth !== null && qIdx < quarters.length - 1 && (
                            <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                
                {/* Total Expenses */}
                <TableRow className="font-medium">
                  <TableCell>Total Expenses</TableCell>
                  {quarterlyTotals.map((total, idx) => {
                    const prevTotal = idx < quarterlyTotals.length - 1 ? 
                      quarterlyTotals[idx + 1].totalExpenses : null;
                    const growth = calculateGrowth(total.totalExpenses, prevTotal);
                    
                    return (
                      <TableCell key={`total-exp-${idx}`} className="text-right">
                        <div>${total.totalExpenses.toLocaleString()}</div>
                        {growth !== null && idx < quarterlyTotals.length - 1 && (
                          <div className={`text-xs ${growth <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
                
                {/* Net Profit/Loss */}
                <TableRow className="font-bold bg-muted/50">
                  <TableCell>Net Profit/(Loss)</TableCell>
                  {quarterlyTotals.map((total, idx) => {
                    const prevTotal = idx < quarterlyTotals.length - 1 ? 
                      quarterlyTotals[idx + 1].netProfit : null;
                    const growth = calculateGrowth(total.netProfit, prevTotal);
                    
                    return (
                      <TableCell key={`net-${idx}`} className={`text-right ${total.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div>${total.netProfit.toLocaleString()}</div>
                        {growth !== null && idx < quarterlyTotals.length - 1 && (
                          <div className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Growth percentages show quarter-over-quarter changes. For expenses, negative growth (reduction) is shown in green.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
