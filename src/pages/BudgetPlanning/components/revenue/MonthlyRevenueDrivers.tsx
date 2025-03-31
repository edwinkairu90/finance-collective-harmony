
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MonthlyRevenueTable } from "./MonthlyRevenueTable";
import { initialMonthlyRevenueDrivers } from "./data/monthlyRevenueData";
import { MonthlyRevenueData, SegmentData } from "./types/revenueTypes";
import { useToast } from "@/components/ui/use-toast";

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
    setMonthlyRevenueDrivers((prev) =>
      prev.map((item) => {
        if (item.month === month) {
          return {
            ...item,
            [segment]: {
              ...item[segment],
              [field]: value
            }
          };
        }
        return item;
      })
    );

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
