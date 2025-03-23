
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCostCenters } from "./hooks/useCostCenters";
import { DepartmentView } from "./components/DepartmentView";
import { AllCostCentersView } from "./components/AllCostCentersView";

export const CostCenters = () => {
  const {
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
    deleteCostCenter
  } = useCostCenters();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="departments">
        <TabsList className="mb-4">
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="all">All Cost Centers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="departments" className="space-y-6">
          <DepartmentView 
            departments={departments}
            selectedDepartmentId={selectedDepartmentId}
            selectedDepartment={selectedDepartment}
            editingCostCenterId={editingCostCenterId}
            isAddingCostCenter={isAddingCostCenter}
            newCostCenter={newCostCenter}
            onSelectDepartment={handleSelectDepartment}
            onStartAddingCostCenter={startAddingCostCenter}
            onStartEditingCostCenter={startEditingCostCenter}
            onCancelEditing={cancelEditing}
            onSaveCostCenterChanges={saveCostCenterChanges}
            onDeleteCostCenter={deleteCostCenter}
            onUpdateCostCenterField={updateCostCenterField}
            onUpdateNewCostCenterField={updateNewCostCenterField}
            onAddNewCostCenter={addNewCostCenter}
            onCancelAddingCostCenter={cancelAddingCostCenter}
          />
        </TabsContent>
        
        <TabsContent value="all">
          <AllCostCentersView 
            costCenters={allCostCenters}
            departments={departments}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
