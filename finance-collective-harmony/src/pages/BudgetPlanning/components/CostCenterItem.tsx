
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CostCenter } from "@/types/budget";
import { Pencil, Save, Trash, X } from "lucide-react";

interface CostCenterItemProps {
  costCenter: CostCenter;
  isEditing: boolean;
  onStartEditing: () => void;
  onCancelEditing: () => void;
  onSaveChanges: () => void;
  onDelete: () => void;
  onUpdateField: (field: keyof CostCenter, value: string | number) => void;
}

export const CostCenterItem = ({
  costCenter,
  isEditing,
  onStartEditing,
  onCancelEditing,
  onSaveChanges,
  onDelete,
  onUpdateField,
}: CostCenterItemProps) => {
  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`name-${costCenter.id}`}>Name</Label>
          <Input 
            id={`name-${costCenter.id}`}
            value={costCenter.name}
            onChange={(e) => onUpdateField('name', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`description-${costCenter.id}`}>Description</Label>
          <Textarea
            id={`description-${costCenter.id}`}
            value={costCenter.description}
            onChange={(e) => onUpdateField('description', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`budget-${costCenter.id}`}>Budget</Label>
          <Input
            id={`budget-${costCenter.id}`}
            type="number"
            value={costCenter.budget}
            onChange={(e) => onUpdateField('budget', e.target.value)}
          />
        </div>

        <div className="flex space-x-2 justify-end">
          <Button variant="outline" size="sm" onClick={onCancelEditing}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button size="sm" onClick={onSaveChanges}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </div>
    );
  }

  return (
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
            onClick={onStartEditing}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
