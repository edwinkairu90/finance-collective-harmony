
import React, { useState } from "react";
import { CostCenter, Department } from "@/types/budget";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Default categories
const defaultCategories = [
  "Operations", 
  "Sales", 
  "Marketing", 
  "IT", 
  "Human Resources", 
  "Finance", 
  "Research & Development",
  "Customer Support"
];

interface CostCenterTableProps {
  costCenters: CostCenter[];
  onStartEditing: (costCenterId: string) => void;
  onDelete: (costCenterId: string) => void;
  departments?: Department[];
  showAllDepartments?: boolean;
  onChangeDepartment?: (costCenterId: string, newDepartmentId: string) => void;
  onChangeCategory?: (costCenterId: string, newCategory: string) => void;
}

export const CostCenterTable = ({
  costCenters,
  onStartEditing,
  onDelete,
  departments = [],
  showAllDepartments = false,
  onChangeDepartment,
  onChangeCategory,
}: CostCenterTableProps) => {
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  if (costCenters.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No cost centers found. Click "Add Cost Center" to create one.</p>
      </div>
    );
  }

  const calculateDifference = (budget: number, actual?: number) => {
    if (actual === undefined) return null;
    return budget - actual;
  };

  const calculateDifferencePercent = (budget: number, actual?: number) => {
    if (actual === undefined || actual === 0) return null;
    return ((budget - actual) / actual) * 100;
  };

  // Calculate total budget across all cost centers
  const totalBudget = costCenters.reduce((sum, cc) => sum + cc.budget, 0);
  const totalPreviousActual = costCenters
    .filter(cc => cc.previousActual !== undefined)
    .reduce((sum, cc) => sum + (cc.previousActual || 0), 0);

  const getDepartmentName = (departmentId: string) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.name : departmentId;
  };

  const handleDepartmentChange = (costCenterId: string, newDepartmentId: string) => {
    if (onChangeDepartment) {
      onChangeDepartment(costCenterId, newDepartmentId);
    }
  };

  const handleCategoryChange = (costCenterId: string, newCategory: string) => {
    if (onChangeCategory) {
      onChangeCategory(costCenterId, newCategory);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showAllDepartments && <TableHead>Department</TableHead>}
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Previous Actual</TableHead>
          <TableHead className="text-right">Current Budget</TableHead>
          <TableHead className="text-right">Difference</TableHead>
          <TableHead className="text-right">% Change</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {showAllDepartments ? (
          // Display all cost centers with department dropdown
          costCenters.map((costCenter) => {
            const difference = calculateDifference(costCenter.budget, costCenter.previousActual);
            const differencePercent = calculateDifferencePercent(costCenter.budget, costCenter.previousActual);
            
            return (
              <TableRow key={costCenter.id}>
                <TableCell>
                  {onChangeDepartment ? (
                    <Select
                      value={costCenter.departmentId}
                      onValueChange={(value) => handleDepartmentChange(costCenter.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    getDepartmentName(costCenter.departmentId)
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {costCenter.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                      {categories.map((category) => (
                        <DropdownMenuItem 
                          key={category}
                          onClick={() => handleCategoryChange(costCenter.id, category)}
                        >
                          {category}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem onClick={() => setIsAddingCategory(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add new category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {isAddingCategory && (
                    <div className="mt-2 flex items-center space-x-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name"
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleAddCategory}>Add</Button>
                      <Button size="sm" variant="outline" onClick={() => setIsAddingCategory(false)}>Cancel</Button>
                    </div>
                  )}
                </TableCell>
                <TableCell>{costCenter.description}</TableCell>
                <TableCell className="text-right">
                  ${costCenter.previousActual?.toLocaleString() || 'N/A'}
                </TableCell>
                <TableCell className="text-right">${costCenter.budget.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {difference !== null ? (
                    <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                      {difference >= 0 ? 
                        `+$${difference.toLocaleString()}` : 
                        `-$${Math.abs(difference).toLocaleString()}`}
                    </span>
                  ) : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  {differencePercent !== null ? (
                    <span className={differencePercent >= 0 ? "text-green-600" : "text-red-600"}>
                      {differencePercent >= 0 ? "+" : ""}{differencePercent.toFixed(1)}%
                    </span>
                  ) : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onStartEditing(costCenter.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDelete(costCenter.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          // Original single department view
          costCenters.map(costCenter => {
            const difference = calculateDifference(costCenter.budget, costCenter.previousActual);
            const differencePercent = calculateDifferencePercent(costCenter.budget, costCenter.previousActual);
            
            return (
              <TableRow key={costCenter.id}>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        {costCenter.name}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[200px]">
                      {categories.map((category) => (
                        <DropdownMenuItem 
                          key={category}
                          onClick={() => handleCategoryChange(costCenter.id, category)}
                        >
                          {category}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem onClick={() => setIsAddingCategory(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add new category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell>{costCenter.description}</TableCell>
                <TableCell className="text-right">
                  ${costCenter.previousActual?.toLocaleString() || 'N/A'}
                </TableCell>
                <TableCell className="text-right">${costCenter.budget.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  {difference !== null ? (
                    <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                      {difference >= 0 ? 
                        `+$${difference.toLocaleString()}` : 
                        `-$${Math.abs(difference).toLocaleString()}`}
                    </span>
                  ) : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  {differencePercent !== null ? (
                    <span className={differencePercent >= 0 ? "text-green-600" : "text-red-600"}>
                      {differencePercent >= 0 ? "+" : ""}{differencePercent.toFixed(1)}%
                    </span>
                  ) : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onStartEditing(costCenter.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDelete(costCenter.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={showAllDepartments ? 3 : 2} className="font-bold">
            TOTAL
          </TableCell>
          <TableCell className="text-right font-bold">
            ${totalPreviousActual.toLocaleString()}
          </TableCell>
          <TableCell className="text-right font-bold">
            ${totalBudget.toLocaleString()}
          </TableCell>
          <TableCell className="text-right font-bold">
            {totalPreviousActual > 0 ? (
              <span className={(totalBudget - totalPreviousActual) >= 0 ? "text-green-600" : "text-red-600"}>
                {(totalBudget - totalPreviousActual) >= 0 
                  ? `+$${(totalBudget - totalPreviousActual).toLocaleString()}`
                  : `-$${Math.abs(totalBudget - totalPreviousActual).toLocaleString()}`}
              </span>
            ) : 'N/A'}
          </TableCell>
          <TableCell className="text-right font-bold">
            {totalPreviousActual > 0 ? (
              <span className={(totalBudget - totalPreviousActual) >= 0 ? "text-green-600" : "text-red-600"}>
                {((totalBudget - totalPreviousActual) / totalPreviousActual * 100).toFixed(1)}%
              </span>
            ) : 'N/A'}
          </TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
};
