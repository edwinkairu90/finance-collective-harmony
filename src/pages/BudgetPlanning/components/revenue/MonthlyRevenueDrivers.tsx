
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MonthlyRevenueTable } from "./MonthlyRevenueTable";
import { initialMonthlyRevenueDrivers } from "./data/monthlyRevenueData";

export const MonthlyRevenueDrivers: React.FC = () => {
  const [monthlyRevenueDrivers] = useState(initialMonthlyRevenueDrivers);

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">
          Monthly Revenue Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MonthlyRevenueTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
      </CardContent>
    </Card>
  );
};
