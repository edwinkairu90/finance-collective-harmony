
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface SegmentFilterProps {
  selectedSegment: string;
  setSelectedSegment: (value: string) => void;
}

export const SegmentFilter: React.FC<SegmentFilterProps> = ({
  selectedSegment,
  setSelectedSegment
}) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2">
        <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        <span className="text-sm text-slate-500 dark:text-slate-400">Segment:</span>
        <Select
          value={selectedSegment}
          onValueChange={setSelectedSegment}
        >
          <SelectTrigger className="w-[140px] h-8 text-sm border-slate-200 dark:border-slate-700">
            <SelectValue placeholder="Select segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
            <SelectItem value="midMarket">Mid-Market</SelectItem>
            <SelectItem value="smb">SMB</SelectItem>
            <SelectItem value="other">Other Revenue</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
