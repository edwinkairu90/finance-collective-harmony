
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BarChart, 
  Globe, 
  Building, 
  Users
} from "lucide-react";

export interface FilterOptions {
  scenarios: string[];
  regions: string[];
  years: number[];
  departments: string[];
}

interface DashboardFiltersProps {
  selectedScenario: string;
  selectedRegion: string;
  selectedYear: number;
  selectedDepartment: string;
  onScenarioChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onYearChange: (value: number) => void;
  onDepartmentChange: (value: string) => void;
  filterOptions: FilterOptions;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({ 
  selectedScenario,
  selectedRegion,
  selectedYear,
  selectedDepartment,
  onScenarioChange,
  onRegionChange,
  onYearChange,
  onDepartmentChange,
  filterOptions
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="flex items-center gap-2 bg-white rounded-md border px-3 py-1.5">
        <BarChart className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-1">Scenario:</span>
        <Select value={selectedScenario} onValueChange={onScenarioChange}>
          <SelectTrigger className="w-[140px] h-8 border-0 p-0 bg-transparent">
            <SelectValue placeholder="Select scenario" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.scenarios.map(scenario => (
              <SelectItem key={scenario} value={scenario}>{scenario}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-md border px-3 py-1.5">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-1">Region:</span>
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="w-[140px] h-8 border-0 p-0 bg-transparent">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.regions.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-md border px-3 py-1.5">
        <BarChart className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-1">Year:</span>
        <Select value={selectedYear.toString()} onValueChange={(val) => onYearChange(Number(val))}>
          <SelectTrigger className="w-[140px] h-8 border-0 p-0 bg-transparent">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                FY {year.toString().substring(2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 bg-white rounded-md border px-3 py-1.5">
        <Building className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground mr-1">Department:</span>
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-[140px] h-8 border-0 p-0 bg-transparent">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.departments.map(department => (
              <SelectItem key={department} value={department}>{department}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
