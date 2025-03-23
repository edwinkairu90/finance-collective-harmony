
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Department } from "@/types/budget";

interface DepartmentSelectorProps {
  departments: Department[];
  selectedDepartmentId: string;
  onSelectDepartment: (departmentId: string) => void;
}

export const DepartmentSelector = ({
  departments,
  selectedDepartmentId,
  onSelectDepartment,
}: DepartmentSelectorProps) => {
  return (
    <div className="flex-1 space-y-2">
      <Label htmlFor="department-select">Department</Label>
      <Select
        value={selectedDepartmentId}
        onValueChange={onSelectDepartment}
      >
        <SelectTrigger id="department-select">
          <SelectValue placeholder="Select department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map(dept => (
            <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
