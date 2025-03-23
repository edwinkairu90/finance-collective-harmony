
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { departmentsWithCostCenters } from "./data/departmentData";
import { CostCenter, Department } from "@/types/budget";
import { useToast } from "@/components/ui/use-toast";
import { Building, Pencil, Plus, Save, Trash, X } from "lucide-react";

export const CostCenters = () => {
  const { toast } = useToast();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>(departmentsWithCostCenters);
  const [editingCostCenterId, setEditingCostCenterId] = useState<string | null>(null);
  const [isAddingCostCenter, setIsAddingCostCenter] = useState(false);
  const [newCostCenter, setNewCostCenter] = useState<Omit<CostCenter, "id">>({
    name: "",
    description: "",
    budget: 0,
    departmentId: ""
  });

  const selectedDepartment = departments.find(d => d.id === selectedDepartmentId);

  const handleSelectDepartment = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setEditingCostCenterId(null);
    setIsAddingCostCenter(false);
  };

  const calculateTotalBudget = (costCenters: CostCenter[]) => {
    return costCenters.reduce((sum, cc) => sum + cc.budget, 0);
  };

  const startEditingCostCenter = (costCenterId: string) => {
    setEditingCostCenterId(costCenterId);
    setIsAddingCostCenter(false);
  };

  const cancelEditing = () => {
    setEditingCostCenterId(null);
  };

  const startAddingCostCenter = () => {
    if (!selectedDepartmentId) {
      toast({
        title: "No Department Selected",
        description: "Please select a department first.",
        variant: "destructive"
      });
      return;
    }

    setIsAddingCostCenter(true);
    setEditingCostCenterId(null);
    setNewCostCenter({
      name: "",
      description: "",
      budget: 0,
      departmentId: selectedDepartmentId
    });
  };

  const cancelAddingCostCenter = () => {
    setIsAddingCostCenter(false);
  };

  const updateCostCenterField = (id: string, field: keyof CostCenter, value: string | number) => {
    setDepartments(prev => 
      prev.map(dept => ({
        ...dept,
        costCenters: dept.costCenters.map(cc => 
          cc.id === id ? { ...cc, [field]: field === "budget" ? Number(value) : value } : cc
        )
      }))
    );
  };

  const updateNewCostCenterField = (field: keyof Omit<CostCenter, "id">, value: string | number) => {
    setNewCostCenter(prev => ({
      ...prev,
      [field]: field === "budget" ? Number(value) : value
    }));
  };

  const saveCostCenterChanges = () => {
    if (!selectedDepartment) return;

    // Update department total budget
    setDepartments(prev => 
      prev.map(dept => 
        dept.id === selectedDepartmentId 
          ? { 
              ...dept, 
              budget: calculateTotalBudget(dept.costCenters) 
            } 
          : dept
      )
    );
    
    setEditingCostCenterId(null);
    
    toast({
      title: "Changes Saved",
      description: "Cost center updated successfully."
    });
  };

  const addNewCostCenter = () => {
    if (!selectedDepartmentId || !newCostCenter.name) {
      toast({
        title: "Invalid Cost Center",
        description: "Please provide a name for the cost center.",
        variant: "destructive"
      });
      return;
    }

    const newId = `${selectedDepartmentId}-${newCostCenter.name.toLowerCase().replace(/\s+/g, '-')}`;
    
    const newCostCenterWithId: CostCenter = {
      id: newId,
      ...newCostCenter
    };
    
    setDepartments(prev => 
      prev.map(dept => 
        dept.id === selectedDepartmentId 
          ? { 
              ...dept, 
              costCenters: [...dept.costCenters, newCostCenterWithId],
              budget: dept.budget + newCostCenter.budget
            } 
          : dept
      )
    );
    
    setIsAddingCostCenter(false);
    
    toast({
      title: "Cost Center Added",
      description: `${newCostCenter.name} has been added successfully.`
    });
  };

  const deleteCostCenter = (costCenterId: string) => {
    if (!selectedDepartment) return;
    
    const costCenter = selectedDepartment.costCenters.find(cc => cc.id === costCenterId);
    if (!costCenter) return;
    
    setDepartments(prev => 
      prev.map(dept => 
        dept.id === selectedDepartmentId 
          ? { 
              ...dept, 
              costCenters: dept.costCenters.filter(cc => cc.id !== costCenterId),
              budget: dept.budget - costCenter.budget
            } 
          : dept
      )
    );
    
    toast({
      title: "Cost Center Deleted",
      description: `${costCenter.name} has been removed.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Centers</CardTitle>
          <CardDescription>Manage departmental cost centers for detailed budgeting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="department-select">Department</Label>
                <Select
                  value={selectedDepartmentId}
                  onValueChange={handleSelectDepartment}
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
              {selectedDepartment && (
                <Button 
                  onClick={startAddingCostCenter} 
                  className="mb-0.5 flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Cost Center
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDepartment && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" /> 
                  {selectedDepartment.name} Cost Centers
                </CardTitle>
                <CardDescription>
                  Total Budget: ${selectedDepartment.budget.toLocaleString()}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDepartment.costCenters.map(costCenter => (
                <div 
                  key={costCenter.id} 
                  className="border rounded-lg p-4 transition-colors hover:bg-muted/30"
                >
                  {editingCostCenterId === costCenter.id ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${costCenter.id}`}>Name</Label>
                        <Input 
                          id={`name-${costCenter.id}`}
                          value={costCenter.name}
                          onChange={(e) => updateCostCenterField(costCenter.id, 'name', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`description-${costCenter.id}`}>Description</Label>
                        <Textarea
                          id={`description-${costCenter.id}`}
                          value={costCenter.description}
                          onChange={(e) => updateCostCenterField(costCenter.id, 'description', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`budget-${costCenter.id}`}>Budget</Label>
                        <Input
                          id={`budget-${costCenter.id}`}
                          type="number"
                          value={costCenter.budget}
                          onChange={(e) => updateCostCenterField(costCenter.id, 'budget', e.target.value)}
                        />
                      </div>

                      <div className="flex space-x-2 justify-end">
                        <Button variant="outline" size="sm" onClick={cancelEditing}>
                          <X className="h-4 w-4 mr-1" /> Cancel
                        </Button>
                        <Button size="sm" onClick={saveCostCenterChanges}>
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{costCenter.name}</h3>
                          <p className="text-sm text-muted-foreground">{costCenter.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">${costCenter.budget.toLocaleString()}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => startEditingCostCenter(costCenter.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => deleteCostCenter(costCenter.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAddingCostCenter && (
                <div className="border rounded-lg p-4 border-dashed space-y-4">
                  <h3 className="font-medium">New Cost Center</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-name">Name</Label>
                    <Input 
                      id="new-name"
                      value={newCostCenter.name}
                      onChange={(e) => updateNewCostCenterField('name', e.target.value)}
                      placeholder="Enter cost center name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-description">Description</Label>
                    <Textarea
                      id="new-description"
                      value={newCostCenter.description}
                      onChange={(e) => updateNewCostCenterField('description', e.target.value)}
                      placeholder="Enter a brief description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-budget">Budget</Label>
                    <Input
                      id="new-budget"
                      type="number"
                      value={newCostCenter.budget}
                      onChange={(e) => updateNewCostCenterField('budget', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div className="flex space-x-2 justify-end">
                    <Button variant="outline" size="sm" onClick={cancelAddingCostCenter}>
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                    <Button size="sm" onClick={addNewCostCenter}>
                      <Save className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              )}

              {selectedDepartment.costCenters.length === 0 && !isAddingCostCenter && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No cost centers found. Click "Add Cost Center" to create one.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
