
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { getLastFourQuarters } from "./data/plStatementData";
import { calculateQuarterlyTotals, calculatePLSubtotals } from "./utils/plCalculations";
import { PLTable } from "./components/PLTable";
import { PeriodSelector, PeriodType } from "./components/PeriodSelector";

export const PLStatement = () => {
  // Available years for selection
  const availableYears = [2024, 2023, 2022, 2021];
  
  // State for period and year selection
  const [periodType, setPeriodType] = useState<PeriodType>('quarterly');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  
  // Get quarters data (this would normally filter by the selected year)
  const quarters = getLastFourQuarters();
  
  // Calculate quarterly totals
  const quarterlyTotals = calculateQuarterlyTotals(quarters);
  
  // Calculate P&L subtotals (gross profit, EBITDA, EBIT)
  const plSubtotals = calculatePLSubtotals(quarters);
  
  // Handle period type change
  const handlePeriodTypeChange = (newPeriodType: PeriodType) => {
    setPeriodType(newPeriodType);
  };
  
  // Handle year change
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // In a real application, you would fetch data for the selected year here
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Profit & Loss Statement</h3>
        
        <div className="flex items-center gap-4">
          <PeriodSelector 
            periodType={periodType} 
            onPeriodTypeChange={handlePeriodTypeChange}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            availableYears={availableYears}
          />
          
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
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl font-semibold mb-1">Complete Profit & Loss Statement</h2>
            <p className="text-muted-foreground">
              {periodType === 'monthly' && `Monthly View - ${selectedYear}`}
              {periodType === 'quarterly' && `Quarterly View - ${selectedYear}`}
              {periodType === 'annual' && `Annual View - ${selectedYear}`}
            </p>
            <p className="text-sm text-muted-foreground mt-1">All figures in USD</p>
          </div>
          
          <div className="overflow-x-auto mt-6">
            <PLTable 
              quarters={quarters} 
              quarterlyTotals={quarterlyTotals} 
              plSubtotals={plSubtotals}
              periodType={periodType}
            />
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
            <p className="font-medium mb-2">Notes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Variance percentage shows the change between actual and projected figures.</li>
              <li>Negative variance for expenses indicates a favorable outcome (under budget).</li>
              <li>EBITDA = Earnings Before Interest, Taxes, Depreciation, and Amortization</li>
              <li>EBIT = Earnings Before Interest and Taxes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
