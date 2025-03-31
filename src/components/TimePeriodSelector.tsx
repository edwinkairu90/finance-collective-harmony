
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CalendarRange } from "lucide-react";

interface TimePeriodSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  availableYears: number[];
}

export const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({ 
  selectedYear,
  onYearChange,
  availableYears
}) => {
  return (
    <div className="flex items-center gap-2">
      <CalendarRange className="h-4 w-4 text-muted-foreground" />
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
  );
};
