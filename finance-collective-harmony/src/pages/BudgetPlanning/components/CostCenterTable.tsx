
import React, { useState } from "react";
import { CostCenter, Department } from "@/types/budget";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Plus, Save, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  onUpdateCostCenterField?: (costCenterId: string, field: keyof CostCenter, value: string | number) => void;
}

export const CostCenterTable = ({
  costCenters,
  onStartEditing,
  onDelete,
  departments = [],
  showAllDepartments = false,
  onChangeDepartment,
  onChangeCategory,
  onUpdateCostCenterField,
}: CostCenterTableProps) => {
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>({});
  const [explanationColumns, setExplanationColumns] = useState<string[]>([]);
  const [explanations, setExplanations] = useState<Record<string, Record<string, string>>>({});
  const [newColumnName, setNewColumnName] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const toggleEditable = (fieldId: string) => {
    setEditableFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

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

  const handleExplanationChange = (costCenterId: string, columnName: string, value: string) => {
    setExplanations(prev => ({
      ...prev,
      [costCenterId]: {
        ...(prev[costCenterId] || {}),
        [columnName]: value
      }
    }));
  };

  const handleAddColumn = () => {
    if (newColumnName && !explanationColumns.includes(newColumnName)) {
      setExplanationColumns(prev => [...prev, newColumnName]);
      setNewColumnName("");
      setIsAddingColumn(false);
    }
  };

  const handleFieldUpdate = (costCenterId: string, field: keyof CostCenter, value: string | number) => {
    if (onUpdateCostCenterField) {
      onUpdateCostCenterField(costCenterId, field, value);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Cost Center P&L View</h3>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsAddingColumn(true)} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Explanation Column
          </Button>
        </div>
      </div>

      {isAddingColumn && (
        <div className="bg-muted p-4 rounded-md mb-4">
          <div className="flex items-center gap-2">
            <Input
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="New column name (e.g., 'Explanation' or 'Comments')"
              className="flex-1"
            />
            <Button size="sm" onClick={handleAddColumn}>Add</Button>
            <Button size="sm" variant="outline" onClick={() => setIsAddingColumn(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table className="border border-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              {showAllDepartments && <TableHead className="border">Department</TableHead>}
              <TableHead className="border">Category</TableHead>
              <TableHead className="border">Description</TableHead>
              <TableHead className="border text-right">Previous Actual</TableHead>
              <TableHead className="border text-right">Current Budget</TableHead>
              <TableHead className="border text-right">Difference</TableHead>
              <TableHead className="border text-right">% Change</TableHead>
              {explanationColumns.map((column) => (
                <TableHead key={column} className="border">
                  {column}
                </TableHead>
              ))}
              <TableHead className="border text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costCenters.map((costCenter) => {
              const difference = calculateDifference(costCenter.budget, costCenter.previousActual);
              const differencePercent = calculateDifferencePercent(costCenter.budget, costCenter.previousActual);
              
              return (
                <TableRow key={costCenter.id} className="border-b">
                  {showAllDepartments && (
                    <TableCell className="border">
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
                    </TableCell>
                  )}
                  <TableCell className="border">
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
                  <TableCell className="border">
                    {editableFields[`${costCenter.id}-description`] ? (
                      <Input 
                        value={costCenter.description} 
                        onChange={(e) => handleFieldUpdate(costCenter.id, 'description', e.target.value)}
                        onBlur={() => toggleEditable(`${costCenter.id}-description`)}
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onClick={() => toggleEditable(`${costCenter.id}-description`)}
                      >
                        {costCenter.description}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="border text-right">
                    {editableFields[`${costCenter.id}-previousActual`] ? (
                      <Input 
                        type="number"
                        value={costCenter.previousActual || 0} 
                        onChange={(e) => handleFieldUpdate(costCenter.id, 'previousActual', Number(e.target.value))}
                        onBlur={() => toggleEditable(`${costCenter.id}-previousActual`)}
                        className="text-right"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onClick={() => toggleEditable(`${costCenter.id}-previousActual`)}
                      >
                        ${costCenter.previousActual?.toLocaleString() || 'N/A'}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="border text-right">
                    {editableFields[`${costCenter.id}-budget`] ? (
                      <Input 
                        type="number"
                        value={costCenter.budget} 
                        onChange={(e) => handleFieldUpdate(costCenter.id, 'budget', Number(e.target.value))}
                        onBlur={() => toggleEditable(`${costCenter.id}-budget`)}
                        className="text-right"
                        autoFocus
                      />
                    ) : (
                      <div 
                        className="cursor-pointer p-2 hover:bg-gray-100 rounded"
                        onClick={() => toggleEditable(`${costCenter.id}-budget`)}
                      >
                        ${costCenter.budget.toLocaleString()}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="border text-right">
                    {difference !== null ? (
                      <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                        {difference >= 0 ? 
                          `+$${difference.toLocaleString()}` : 
                          `-$${Math.abs(difference).toLocaleString()}`}
                      </span>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell className="border text-right">
                    {differencePercent !== null ? (
                      <span className={differencePercent >= 0 ? "text-green-600" : "text-red-600"}>
                        {differencePercent >= 0 ? "+" : ""}{differencePercent.toFixed(1)}%
                      </span>
                    ) : 'N/A'}
                  </TableCell>
                  {explanationColumns.map((column) => (
                    <TableCell key={column} className="border">
                      <Textarea
                        value={explanations[costCenter.id]?.[column] || ''}
                        onChange={(e) => handleExplanationChange(costCenter.id, column, e.target.value)}
                        placeholder={`Add ${column.toLowerCase()}`}
                        className="min-h-[40px] resize-none text-sm"
                      />
                    </TableCell>
                  ))}
                  <TableCell className="border text-right">
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
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={showAllDepartments ? 3 : 2} className="font-bold border">
                TOTAL
              </TableCell>
              <TableCell className="text-right font-bold border">
                ${totalPreviousActual.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-bold border">
                ${totalBudget.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-bold border">
                {totalPreviousActual > 0 ? (
                  <span className={(totalBudget - totalPreviousActual) >= 0 ? "text-green-600" : "text-red-600"}>
                    {(totalBudget - totalPreviousActual) >= 0 
                      ? `+$${(totalBudget - totalPreviousActual).toLocaleString()}`
                      : `-$${Math.abs(totalBudget - totalPreviousActual).toLocaleString()}`}
                  </span>
                ) : 'N/A'}
              </TableCell>
              <TableCell className="text-right font-bold border">
                {totalPreviousActual > 0 ? (
                  <span className={(totalBudget - totalPreviousActual) >= 0 ? "text-green-600" : "text-red-600"}>
                    {((totalBudget - totalPreviousActual) / totalPreviousActual * 100).toFixed(1)}%
                  </span>
                ) : 'N/A'}
              </TableCell>
              <TableCell colSpan={explanationColumns.length + 1} />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
