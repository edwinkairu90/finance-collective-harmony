
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export type PeriodType = 'monthly' | 'quarterly' | 'annual';

interface PeriodSelectorProps {
  periodType: PeriodType;
  onPeriodTypeChange: (value: PeriodType) => void;
  selectedYear: number;
  onYearChange: (year: number) => void;
  availableYears: number[];
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ 
  periodType, 
  onPeriodTypeChange, 
  selectedYear,
  onYearChange,
  availableYears
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <Select value={selectedYear.toString()} onValueChange={(val) => onYearChange(Number(val))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {availableYears.map(year => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">View by:</span>
        <Select value={periodType} onValueChange={(val) => onPeriodTypeChange(val as PeriodType)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="annual">Annual</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
