
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AdditionalRevenueForm } from "./AdditionalRevenueForm";
import { MonthlyRevenueTable } from "./MonthlyRevenueTable";
import { initialMonthlyRevenueDrivers } from "./data/monthlyRevenueData";
import { MonthlyRevenueData, RevenueType } from "./types/revenueTypes";

export const MonthlyRevenueDrivers: React.FC = () => {
  const [monthlyRevenueDrivers, setMonthlyRevenueDrivers] = useState(initialMonthlyRevenueDrivers);
  const [additionalRevenueType, setAdditionalRevenueType] = useState<RevenueType | "">("");
  const [additionalRevenueAmount, setAdditionalRevenueAmount] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("Jan");

  // Handle adding additional revenue
  const handleAddAdditionalRevenue = () => {
    if (additionalRevenueAmount <= 0 || !selectedMonth || !additionalRevenueType) return;

    setMonthlyRevenueDrivers(prevData => {
      return prevData.map(item => {
        if (item.month === selectedMonth) {
          if (additionalRevenueType === "implementation") {
            return { ...item, implementationRevenue: additionalRevenueAmount };
          } else if (additionalRevenueType === "other") {
            return { ...item, otherRevenue: additionalRevenueAmount };
          }
        }
        return item;
      });
    });

    // Reset form values
    setAdditionalRevenueAmount(0);
  };

  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2 bg-slate-50 dark:bg-slate-900/50 rounded-t-lg">
        <CardTitle className="text-base text-slate-800 dark:text-slate-200">
          Monthly Revenue Drivers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AdditionalRevenueForm
          monthlyRevenueDrivers={monthlyRevenueDrivers}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          additionalRevenueType={additionalRevenueType}
          setAdditionalRevenueType={setAdditionalRevenueType}
          additionalRevenueAmount={additionalRevenueAmount}
          setAdditionalRevenueAmount={setAdditionalRevenueAmount}
          handleAddAdditionalRevenue={handleAddAdditionalRevenue}
        />
        <MonthlyRevenueTable monthlyRevenueDrivers={monthlyRevenueDrivers} />
      </CardContent>
    </Card>
  );
};
