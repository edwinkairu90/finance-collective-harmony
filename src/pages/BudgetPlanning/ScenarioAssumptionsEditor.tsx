
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BudgetScenarioType } from "@/types/budgetScenarios";
import { Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ScenarioAssumptionsEditorProps {
  scenarioId: BudgetScenarioType;
  assumptions: string[];
  onSave: (updatedAssumptions: string[]) => void;
}

export const ScenarioAssumptionsEditor: React.FC<ScenarioAssumptionsEditorProps> = ({
  scenarioId,
  assumptions,
  onSave
}) => {
  const { toast } = useToast();
  const [editedAssumptions, setEditedAssumptions] = useState<string[]>(assumptions);
  const [newAssumption, setNewAssumption] = useState<string>('');

  const handleAssumptionChange = (index: number, value: string) => {
    const updated = [...editedAssumptions];
    updated[index] = value;
    setEditedAssumptions(updated);
  };

  const handleAddAssumption = () => {
    if (!newAssumption.trim()) {
      toast({
        title: "Error",
        description: "Assumption cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setEditedAssumptions([...editedAssumptions, newAssumption]);
    setNewAssumption('');
  };

  const handleRemoveAssumption = (index: number) => {
    const updated = [...editedAssumptions];
    updated.splice(index, 1);
    setEditedAssumptions(updated);
  };

  const handleSaveAssumptions = () => {
    onSave(editedAssumptions);
    toast({
      title: "Assumptions Updated",
      description: "Scenario assumptions have been successfully updated"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Assumptions</CardTitle>
        <CardDescription>
          Define the key assumptions that underlie this budget scenario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {editedAssumptions.map((assumption, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={assumption}
                onChange={(e) => handleAssumptionChange(index, e.target.value)}
                placeholder="Assumption"
                className="flex-grow"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveAssumption(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <div className="flex items-center gap-2">
            <Input 
              value={newAssumption}
              onChange={(e) => setNewAssumption(e.target.value)}
              placeholder="Add a new assumption"
              className="flex-grow"
            />
            <Button 
              variant="outline" 
              onClick={handleAddAssumption}
              disabled={!newAssumption.trim()}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          
          <Button 
            className="w-full mt-4"
            onClick={handleSaveAssumptions}
          >
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
