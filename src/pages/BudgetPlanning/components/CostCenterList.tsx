
import React from "react";
import { CostCenter, Department } from "@/types/budget";
import { CostCenterItem } from "./CostCenterItem";
import { CostCenterForm } from "./CostCenterForm";

interface CostCenterListProps {
  selectedDepartment: Department | undefined;
  editingCostCenterId: string | null;
  isAddingCostCenter: boolean;
  newCostCenter: Omit<CostCenter, "id">;
  onStartEditingCostCenter: (costCenterId: string) => void;
  onCancelEditing: () => void;
  onSaveCostCenterChanges: () => void;
  onDeleteCostCenter: (costCenterId: string) => void;
  onUpdateCostCenterField: (id: string, field: keyof CostCenter, value: string | number) => void;
  onUpdateNewCostCenterField: (field: keyof Omit<CostCenter, "id">, value: string | number) => void;
  onAddNewCostCenter: () => void;
  onCancelAddingCostCenter: () => void;
}

export const CostCenterList = ({
  selectedDepartment,
  editingCostCenterId,
  isAddingCostCenter,
  newCostCenter,
  onStartEditingCostCenter,
  onCancelEditing,
  onSaveCostCenterChanges,
  onDeleteCostCenter,
  onUpdateCostCenterField,
  onUpdateNewCostCenterField,
  onAddNewCostCenter,
  onCancelAddingCostCenter,
}: CostCenterListProps) => {
  if (!selectedDepartment) return null;

  return (
    <div className="space-y-4">
      {selectedDepartment.costCenters.map(costCenter => (
        <div 
          key={costCenter.id} 
          className="border rounded-lg p-4 transition-colors hover:bg-muted/30"
        >
          <CostCenterItem
            costCenter={costCenter}
            isEditing={editingCostCenterId === costCenter.id}
            onStartEditing={() => onStartEditingCostCenter(costCenter.id)}
            onCancelEditing={onCancelEditing}
            onSaveChanges={onSaveCostCenterChanges}
            onDelete={() => onDeleteCostCenter(costCenter.id)}
            onUpdateField={(field, value) => onUpdateCostCenterField(costCenter.id, field, value)}
          />
        </div>
      ))}

      {isAddingCostCenter && (
        <CostCenterForm
          newCostCenter={newCostCenter}
          onUpdateField={onUpdateNewCostCenterField}
          onAddCostCenter={onAddNewCostCenter}
          onCancel={onCancelAddingCostCenter}
        />
      )}

      {selectedDepartment.costCenters.length === 0 && !isAddingCostCenter && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No cost centers found. Click "Add Cost Center" to create one.</p>
        </div>
      )}
    </div>
  );
};
