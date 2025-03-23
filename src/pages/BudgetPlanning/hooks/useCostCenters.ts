
import { useState } from "react";
import { CostCenter, Department } from "@/types/budget";
import { useToast } from "@/components/ui/use-toast";
import { departmentsWithCostCenters } from "../data/departmentData";

export const useCostCenters = () => {
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

  const changeCostCenterDepartment = (costCenterId: string, newDepartmentId: string) => {
    // Find the cost center in all departments
    let costCenterToMove: CostCenter | undefined;
    let oldDepartmentId: string = "";
    
    for (const dept of departments) {
      const costCenter = dept.costCenters.find(cc => cc.id === costCenterId);
      if (costCenter) {
        costCenterToMove = { ...costCenter, departmentId: newDepartmentId };
        oldDepartmentId = dept.id;
        break;
      }
    }
    
    if (!costCenterToMove || oldDepartmentId === newDepartmentId) return;
    
    // Update departments by removing the cost center from old department and adding to new
    setDepartments(prev => 
      prev.map(dept => {
        if (dept.id === oldDepartmentId) {
          // Remove cost center from old department and update budget
          return {
            ...dept,
            costCenters: dept.costCenters.filter(cc => cc.id !== costCenterId),
            budget: dept.budget - costCenterToMove!.budget
          };
        } else if (dept.id === newDepartmentId) {
          // Add cost center to new department and update budget
          return {
            ...dept,
            costCenters: [...dept.costCenters, costCenterToMove!],
            budget: dept.budget + costCenterToMove!.budget
          };
        }
        return dept;
      })
    );
    
    toast({
      title: "Department Changed",
      description: `Cost center moved to ${departments.find(d => d.id === newDepartmentId)?.name || newDepartmentId}.`
    });
  };

  return {
    selectedDepartmentId,
    departments,
    selectedDepartment,
    allCostCenters,
    editingCostCenterId,
    isAddingCostCenter,
    newCostCenter,
    handleSelectDepartment,
    startEditingCostCenter,
    cancelEditing,
    startAddingCostCenter,
    cancelAddingCostCenter,
    updateCostCenterField,
    updateNewCostCenterField,
    saveCostCenterChanges,
    addNewCostCenter,
    deleteCostCenter,
    changeCostCenterDepartment
  };
};
