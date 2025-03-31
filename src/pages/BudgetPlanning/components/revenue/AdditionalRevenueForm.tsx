
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MonthlyRevenueData, RevenueType } from "./types/revenueTypes";

interface AdditionalRevenueFormProps {
  monthlyRevenueDrivers: MonthlyRevenueData[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  additionalRevenueType: RevenueType | "";
  setAdditionalRevenueType: (type: RevenueType | "") => void;
  additionalRevenueAmount: number;
  setAdditionalRevenueAmount: (amount: number) => void;
  handleAddAdditionalRevenue: () => void;
}

export const AdditionalRevenueForm: React.FC<AdditionalRevenueFormProps> = ({
  monthlyRevenueDrivers,
  selectedMonth,
  setSelectedMonth,
  additionalRevenueType,
  setAdditionalRevenueType,
  additionalRevenueAmount,
  setAdditionalRevenueAmount,
  handleAddAdditionalRevenue
}) => {
  return (
    <div className="mb-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
      <h4 className="text-sm font-medium mb-2 text-slate-800 dark:text-slate-200">Add Additional Revenue</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Month</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthlyRevenueDrivers.map(item => (
                <SelectItem key={item.month} value={item.month}>{item.month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Revenue Type</label>
          <Select 
            value={additionalRevenueType} 
            onValueChange={(value) => setAdditionalRevenueType(value as RevenueType | "")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="implementation">Implementation</SelectItem>
              <SelectItem value="other">Other Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Amount</label>
          <Input
            type="number"
            value={additionalRevenueAmount || ''}
            onChange={(e) => setAdditionalRevenueAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </div>
        <div className="flex items-end">
          <Button 
            onClick={handleAddAdditionalRevenue}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Update Revenue
          </Button>
        </div>
      </div>
    </div>
  );
};
