
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MonthlyRevenueTable } from "./MonthlyRevenueTable";
import { initialMonthlyRevenueDrivers } from "./data/monthlyRevenueData";
import { MonthlyRevenueData, SegmentData } from "./types/revenueTypes";
import { useToast } from "@/hooks/use-toast";

export const MonthlyRevenueDrivers: React.FC = () => {
  const [monthlyRevenueDrivers, setMonthlyRevenueDrivers] = useState<MonthlyRevenueData[]>(
    initialMonthlyRevenueDrivers
  );
  const { toast } = useToast();

  const handleUpdateData = (
    month: string,
    segment: "enterprise" | "midMarket" | "smb",
    field: keyof SegmentData,
    value: number
  ) => {
    // Update the current month's data
    setMonthlyRevenueDrivers((prev) => {
      const updatedData = [...prev];
      
      // Find the current month's index
      const currentMonthIndex = updatedData.findIndex(item => item.month === month);
      if (currentMonthIndex === -1) return prev;
      
      // Create a copy of the current month data
      const currentMonthData = { ...updatedData[currentMonthIndex] };
      
      // Update the specific field for the segment
      currentMonthData[segment] = {
        ...currentMonthData[segment],
        [field]: value
      };
      
      // If the field is newClients, we need to update the following month's existing clients
      if (field === "newClients" && currentMonthIndex < updatedData.length - 1) {
        // Calculate the total clients for current month
        const totalClientsCurrentMonth = 
          currentMonthData[segment].clients + currentMonthData[segment].newClients;
        
        // Update the next month's existing clients
        const nextMonthData = { ...updatedData[currentMonthIndex + 1] };
        nextMonthData[segment] = {
          ...nextMonthData[segment],
          clients: totalClientsCurrentMonth
        };
        
        // Update the next month in the data array
        updatedData[currentMonthIndex + 1] = nextMonthData;
      }
      
      // Update the current month in the data array
      updatedData[currentMonthIndex] = currentMonthData;
      
      return updatedData;
    });

    toast({
      title: "Data updated",
      description: `Updated ${field} for ${segment} in ${month}`,
    });
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">
          Monthly Revenue Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MonthlyRevenueTable 
          monthlyRevenueDrivers={monthlyRevenueDrivers} 
          onUpdateData={handleUpdateData}
        />
      </CardContent>
    </Card>
  );
};
