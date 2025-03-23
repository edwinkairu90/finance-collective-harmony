
import { useState, useEffect } from 'react';
import { CostCenter, Department } from '@/types/budget';
import { departments } from '../BudgetData';

// Mock data for cost centers
const initialCostCenters: CostCenter[] = [
  {
    id: '1',
    departmentId: 'sales',
    name: 'Sales Team',
    description: 'Cost center for the sales team operations',
    budget: 150000,
    previousActual: 140000,
  },
  {
    id: '2',
    departmentId: 'sales',
    name: 'Sales Office',
    description: 'Office space and utilities for sales department',
    budget: 50000,
    previousActual: 48000,
  },
  {
    id: '3',
    departmentId: 'marketing',
    name: 'Marketing Operations',
    description: 'General marketing operations',
    budget: 200000,
    previousActual: 190000,
  },
  {
    id: '4',
    departmentId: 'engineering',
    name: 'Engineering Team',
    description: 'Cost center for the engineering department',
    budget: 300000,
    previousActual: 280000,
  },
  {
    id: '5',
    departmentId: 'customer-support',
    name: 'Support Operations',
    description: 'Customer support operations',
    budget: 120000,
    previousActual: 110000,
  },
];

export const useCostCenters = () => {
  const [costCenters, setCostCenters] = useState<CostCenter[]>(initialCostCenters);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(departments[0].id);
  const [editingCostCenterId, setEditingCostCenterId] = useState<string | null>(null);
  const [isAddingCostCenter, setIsAddingCostCenter] = useState(false);
  const [newCostCenter, setNewCostCenter] = useState<Omit<CostCenter, 'id'>>({
    departmentId: selectedDepartmentId,
    name: '',
    description: '',
    budget: 0,
    previousActual: 0,
  });

  // Get the selected department
  const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId);

  // Filter cost centers by selected department
  const filteredCostCenters = costCenters.filter(
    cc => cc.departmentId === selectedDepartmentId
  );

  // Get all cost centers
  const allCostCenters = costCenters;

  // Update newCostCenter when selected department changes
  useEffect(() => {
    setNewCostCenter(prev => ({
      ...prev,
      departmentId: selectedDepartmentId,
    }));
  }, [selectedDepartmentId]);

  const handleSelectDepartment = (departmentId: string) => {
    setSelectedDepartmentId(departmentId);
    setEditingCostCenterId(null);
    setIsAddingCostCenter(false);
  };

  const startEditingCostCenter = (costCenterId: string) => {
    setEditingCostCenterId(costCenterId);
    setIsAddingCostCenter(false);
  };

  const cancelEditing = () => {
    setEditingCostCenterId(null);
  };

  const startAddingCostCenter = () => {
    setIsAddingCostCenter(true);
    setEditingCostCenterId(null);
    setNewCostCenter({
      departmentId: selectedDepartmentId,
      name: '',
      description: '',
      budget: 0,
      previousActual: 0,
    });
  };

  const cancelAddingCostCenter = () => {
    setIsAddingCostCenter(false);
  };

  const updateCostCenterField = (
    costCenterId: string,
    field: keyof CostCenter,
    value: string | number
  ) => {
    setCostCenters(prevCostCenters =>
      prevCostCenters.map(cc =>
        cc.id === costCenterId ? { ...cc, [field]: value } : cc
      )
    );
  };

  const updateNewCostCenterField = (
    field: keyof Omit<CostCenter, 'id'>,
    value: string | number
  ) => {
    setNewCostCenter(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveCostCenterChanges = () => {
    setEditingCostCenterId(null);
  };

  const addNewCostCenter = () => {
    const newId = `cc-${Date.now()}`;
    setCostCenters(prev => [
      ...prev,
      { ...newCostCenter, id: newId },
    ]);
    setIsAddingCostCenter(false);
  };

  const deleteCostCenter = (costCenterId: string) => {
    setCostCenters(prev => prev.filter(cc => cc.id !== costCenterId));
    if (editingCostCenterId === costCenterId) {
      setEditingCostCenterId(null);
    }
  };

  const changeCostCenterDepartment = (costCenterId: string, newDepartmentId: string) => {
    setCostCenters(prev => 
      prev.map(cc => 
        cc.id === costCenterId ? { ...cc, departmentId: newDepartmentId } : cc
      )
    );
  };

  const changeCostCenterCategory = (costCenterId: string, newCategory: string) => {
    setCostCenters(prev => 
      prev.map(cc => 
        cc.id === costCenterId ? { ...cc, name: newCategory } : cc
      )
    );
  };

  return {
    selectedDepartmentId,
    departments,
    selectedDepartment,
    filteredCostCenters,
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
    changeCostCenterDepartment,
    changeCostCenterCategory
  };
};
