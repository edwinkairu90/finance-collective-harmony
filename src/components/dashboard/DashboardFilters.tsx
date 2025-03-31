
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
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="flex items-center gap-1.5 bg-white rounded-md border px-2 py-1">
        <BarChart className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Scenario:</span>
        <Select value={selectedScenario} onValueChange={onScenarioChange}>
          <SelectTrigger className="w-[110px] h-6 border-0 p-0 bg-transparent text-xs">
            <SelectValue placeholder="Select scenario" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.scenarios.map(scenario => (
              <SelectItem key={scenario} value={scenario} className="text-xs">{scenario}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1.5 bg-white rounded-md border px-2 py-1">
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Region:</span>
        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="w-[110px] h-6 border-0 p-0 bg-transparent text-xs">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.regions.map(region => (
              <SelectItem key={region} value={region} className="text-xs">{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1.5 bg-white rounded-md border px-2 py-1">
        <BarChart className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Year:</span>
        <Select value={selectedYear.toString()} onValueChange={(val) => onYearChange(Number(val))}>
          <SelectTrigger className="w-[70px] h-6 border-0 p-0 bg-transparent text-xs">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.years.map(year => (
              <SelectItem key={year} value={year.toString()} className="text-xs">
                FY {year.toString().substring(2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1.5 bg-white rounded-md border px-2 py-1">
        <Building className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Dept:</span>
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-[110px] h-6 border-0 p-0 bg-transparent text-xs">
            <SelectValue placeholder="Select dept" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.departments.map(department => (
              <SelectItem key={department} value={department} className="text-xs">{department}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
