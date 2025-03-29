
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { 
  getLastFourQuarters, 
  getMonthsForYear
} from "./data/balanceSheetData";
import { BalanceSheetTable } from "./components/BalanceSheetTable";
import { PeriodSelector, PeriodType } from "./components/PeriodSelector";
import { 
  calculateMonthlyBalanceSheetTotals,
  calculateAnnualBalanceSheetTotal
} from "./utils/balanceSheetCalculations";

export const BalanceSheet = () => {
  // Available years for selection
  const availableYears = [2024, 2023, 2022, 2021];
  
  // State for period and year selection
  const [periodType, setPeriodType] = useState<PeriodType>('quarterly');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  
  // Get data based on selected period type
  let quarters = getLastFourQuarters();
  let monthsData = getMonthsForYear(selectedYear);
  
  // Calculate appropriate totals based on period type
  let yearlyTotal;
  
  if (periodType === 'monthly') {
    yearlyTotal = calculateAnnualBalanceSheetTotal(monthsData);
  }
  
  // Handle period type change
  const handlePeriodTypeChange = (newPeriodType: PeriodType) => {
    setPeriodType(newPeriodType);
    // In a real app, this would trigger different data fetching
  };
  
  // Handle year change
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // In a real application, you would fetch data for the selected year here
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Balance Sheet</h3>
        
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
            <h2 className="text-xl font-semibold mb-1">Balance Sheet</h2>
            <p className="text-muted-foreground">
              {periodType === 'monthly' && `Monthly View - ${selectedYear}`}
              {periodType === 'quarterly' && `Quarterly View - ${selectedYear}`}
              {periodType === 'annual' && `Annual View - ${selectedYear}`}
            </p>
            <p className="text-sm text-muted-foreground mt-1">All figures in USD</p>
          </div>
          
          <div className="overflow-x-auto mt-6">
            {periodType === 'monthly' ? (
              <BalanceSheetTable 
                quarters={monthsData}
                periodType={periodType}
                yearlyTotal={yearlyTotal}
              />
            ) : (
              <BalanceSheetTable 
                quarters={quarters}
                periodType={periodType}
              />
            )}
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Growth percentages show {periodType === 'monthly' ? 'month-over-month' : periodType === 'quarterly' ? 'quarter-over-quarter' : 'year-over-year'} changes. For liabilities, negative growth (reduction) is shown in green.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
