
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CostCenter } from "@/types/budget";
import { Save, X } from "lucide-react";

interface CostCenterFormProps {
  newCostCenter: Omit<CostCenter, "id">;
  onUpdateField: (field: keyof Omit<CostCenter, "id">, value: string | number) => void;
  onAddCostCenter: () => void;
  onCancel: () => void;
}

export const CostCenterForm = ({
  newCostCenter,
  onUpdateField,
  onAddCostCenter,
  onCancel,
}: CostCenterFormProps) => {
  return (
    <div className="border rounded-lg p-4 border-dashed space-y-4">
      <h3 className="font-medium">New Cost Center</h3>
      
      <div className="space-y-2">
        <Label htmlFor="new-name">Name</Label>
        <Input 
          id="new-name"
          value={newCostCenter.name}
          onChange={(e) => onUpdateField('name', e.target.value)}
          placeholder="Enter cost center name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-description">Description</Label>
        <Textarea
          id="new-description"
          value={newCostCenter.description}
          onChange={(e) => onUpdateField('description', e.target.value)}
          placeholder="Enter a brief description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="new-previous">Previous Actual</Label>
          <Input
            id="new-previous"
            type="number"
            value={newCostCenter.previousActual || 0}
            onChange={(e) => onUpdateField('previousActual', e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-budget">Current Budget</Label>
          <Input
            id="new-budget"
            type="number"
            value={newCostCenter.budget}
            onChange={(e) => onUpdateField('budget', e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex space-x-2 justify-end">
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" /> Cancel
        </Button>
        <Button size="sm" onClick={onAddCostCenter}>
          <Save className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
    </div>
  );
};
