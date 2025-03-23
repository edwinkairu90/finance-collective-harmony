
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { departmentsWithCostCenters } from "./data/departmentData";
import { CostCenter, Department } from "@/types/budget";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { DepartmentSelector } from "./components/DepartmentSelector";
import { CostCenterList } from "./components/CostCenterList";
import { CostCenterHeader } from "./components/CostCenterHeader";
import { CostCenterTable } from "./components/CostCenterTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  // Get all cost centers across all departments
  const allCostCenters = departments.flatMap(dept => dept.costCenters);

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
      <Tabs defaultValue="departments">
        <TabsList className="mb-4">
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="all">All Cost Centers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Centers</CardTitle>
              <CardDescription>Manage departmental cost centers for detailed budgeting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4 items-end">
                  <DepartmentSelector 
                    departments={departments}
                    selectedDepartmentId={selectedDepartmentId}
                    onSelectDepartment={handleSelectDepartment}
                  />
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
                <CostCenterHeader 
                  selectedDepartment={selectedDepartment}
                  onAddCostCenter={startAddingCostCenter}
                />
              </CardHeader>
              <CardContent>
                <CostCenterList
                  selectedDepartment={selectedDepartment}
                  editingCostCenterId={editingCostCenterId}
                  isAddingCostCenter={isAddingCostCenter}
                  newCostCenter={newCostCenter}
                  onStartEditingCostCenter={startEditingCostCenter}
                  onCancelEditing={cancelEditing}
                  onSaveCostCenterChanges={saveCostCenterChanges}
                  onDeleteCostCenter={deleteCostCenter}
                  onUpdateCostCenterField={updateCostCenterField}
                  onUpdateNewCostCenterField={updateNewCostCenterField}
                  onAddNewCostCenter={addNewCostCenter}
                  onCancelAddingCostCenter={cancelAddingCostCenter}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Cost Centers</CardTitle>
              <CardDescription>View all cost centers across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <CostCenterTable 
                costCenters={allCostCenters}
                departments={departments}
                showAllDepartments={true}
                onStartEditing={() => {}}
                onDelete={() => {}}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
