
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { getLastFourQuarters } from "./data/plStatementData";
import { calculateQuarterlyTotals } from "./utils/plCalculations";
import { PLTable } from "./components/PLTable";

export const PLStatement = () => {
  // Get quarters data
  const quarters = getLastFourQuarters();
  
  // Calculate quarterly totals
  const quarterlyTotals = calculateQuarterlyTotals(quarters);
  
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
            <PLTable quarters={quarters} quarterlyTotals={quarterlyTotals} />
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Growth percentages show quarter-over-quarter changes. For expenses, negative growth (reduction) is shown in green.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
