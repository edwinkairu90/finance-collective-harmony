
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { getLastFourQuarters } from "./data/cashflowData";
import { CashflowTable } from "./components/CashflowTable";
import { PeriodSelector, PeriodType } from "./components/PeriodSelector";

export const CashflowStatement = () => {
  // Available years for selection
  const availableYears = [2024, 2023, 2022, 2021];
  
  // State for period and year selection
  const [periodType, setPeriodType] = useState<PeriodType>('quarterly');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  
  // Get quarters data (this would normally filter by the selected year)
  // In a real app, we would fetch different data based on periodType (monthly/quarterly/annual)
  const quarters = getLastFourQuarters();
  
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
        <h3 className="text-lg font-medium">Cash Flow Statement</h3>
        
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
            <h2 className="text-xl font-semibold mb-1">Cash Flow Statement</h2>
            <p className="text-muted-foreground">
              {periodType === 'monthly' && `Monthly View - ${selectedYear}`}
              {periodType === 'quarterly' && `Quarterly View - ${selectedYear}`}
              {periodType === 'annual' && `Annual View - ${selectedYear}`}
            </p>
            <p className="text-sm text-muted-foreground mt-1">All figures in USD</p>
          </div>
          
          <div className="overflow-x-auto mt-6">
            <CashflowTable quarters={quarters} periodType={periodType} />
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Growth percentages show {periodType === 'monthly' ? 'month-over-month' : periodType === 'quarterly' ? 'quarter-over-quarter' : 'year-over-year'} changes. For investing outflows, negative growth (reduction in spending) is shown in green.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
