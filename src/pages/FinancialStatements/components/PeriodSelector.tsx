
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export type PeriodType = 'monthly' | 'quarterly' | 'annual';

interface PeriodSelectorProps {
  value: PeriodType;
  onChange: (value: PeriodType) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">View by:</span>
      <Select value={value} onValueChange={(val) => onChange(val as PeriodType)}>
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
  );
};
