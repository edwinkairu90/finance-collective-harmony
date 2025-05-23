
import React from "react";
import { CostCenter, Department } from "@/types/budget";
import { CostCenterItem } from "./CostCenterItem";
import { CostCenterForm } from "./CostCenterForm";
import { CostCenterTable } from "./CostCenterTable";

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
      {editingCostCenterId ? (
        // If we're editing a cost center, show the editing form
        <div className="border rounded-lg p-4 transition-colors bg-muted/30">
          {selectedDepartment.costCenters
            .filter(cc => cc.id === editingCostCenterId)
            .map(costCenter => (
              <CostCenterItem
                key={costCenter.id}
                costCenter={costCenter}
                isEditing={true}
                onStartEditing={() => {}}
                onCancelEditing={onCancelEditing}
                onSaveChanges={onSaveCostCenterChanges}
                onDelete={() => onDeleteCostCenter(costCenter.id)}
                onUpdateField={(field, value) => onUpdateCostCenterField(costCenter.id, field, value)}
              />
            ))}
        </div>
      ) : (
        // If we're not editing, show the table
        <CostCenterTable 
          costCenters={selectedDepartment.costCenters}
          onStartEditing={onStartEditingCostCenter}
          onDelete={onDeleteCostCenter}
        />
      )}

      {isAddingCostCenter && (
        <CostCenterForm
          newCostCenter={newCostCenter}
          onUpdateField={onUpdateNewCostCenterField}
          onAddCostCenter={onAddNewCostCenter}
          onCancel={onCancelAddingCostCenter}
        />
      )}
    </div>
  );
};
