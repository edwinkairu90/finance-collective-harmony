
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/actuals-vs-budget/DateRangePicker";
import { 
  Building, 
  Calendar, 
  Download, 
  Filter, 
  ChevronDown
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface ActualsFiltersProps {
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  onExport: () => void;
  departments: string[];
  periods: { id: string; name: string; }[];
  activeFilters: number;
}

export const ActualsFilters = ({
  selectedDepartment,
  onDepartmentChange,
  selectedPeriod,
  onPeriodChange,
  onExport,
  departments,
  periods,
  activeFilters
}: ActualsFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Actuals vs Budget</h1>
        {activeFilters > 0 && (
          <Badge variant="secondary" className="h-6 px-2">
            {activeFilters} filters
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-10 gap-1 px-3">
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Department</label>
                </div>
                <Select
                  value={selectedDepartment}
                  onValueChange={onDepartmentChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Period</label>
                </div>
                <Select
                  value={selectedPeriod}
                  onValueChange={onPeriodChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map(period => (
                      <SelectItem key={period.id} value={period.id}>{period.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <label className="text-sm font-medium">Custom Date Range</label>
                </div>
                <DateRangePicker />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" onClick={onExport} className="h-10">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
    </div>
  );
};
