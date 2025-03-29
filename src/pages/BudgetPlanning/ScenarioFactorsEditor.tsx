
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { BudgetScenarioType, ScenarioFactor } from "@/types/budgetScenarios";
import { Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ScenarioFactorsEditorProps {
  scenarioId: BudgetScenarioType;
  factors: ScenarioFactor[];
  onSave: (updatedFactors: ScenarioFactor[]) => void;
}

export const ScenarioFactorsEditor: React.FC<ScenarioFactorsEditorProps> = ({
  scenarioId,
  factors,
  onSave
}) => {
  const { toast } = useToast();
  const [editedFactors, setEditedFactors] = useState<ScenarioFactor[]>(factors);
  const [newFactor, setNewFactor] = useState<Omit<ScenarioFactor, 'id'>>({
    name: '',
    impact: 0,
    description: ''
  });

  const handleFactorChange = (index: number, field: keyof ScenarioFactor, value: string | number) => {
    const updated = [...editedFactors];
    updated[index] = { ...updated[index], [field]: value };
    setEditedFactors(updated);
  };

  const handleAddFactor = () => {
    if (!newFactor.name) {
      toast({
        title: "Error",
        description: "Factor name is required",
        variant: "destructive"
      });
      return;
    }

    const id = `factor-${Date.now()}`;
    setEditedFactors([...editedFactors, { ...newFactor, id }]);
    setNewFactor({ name: '', impact: 0, description: '' });
  };

  const handleRemoveFactor = (index: number) => {
    const updated = [...editedFactors];
    updated.splice(index, 1);
    setEditedFactors(updated);
  };

  const handleSaveFactors = () => {
    onSave(editedFactors);
    toast({
      title: "Factors Updated",
      description: "Scenario factors have been successfully updated"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scenario Factors</CardTitle>
        <CardDescription>
          Define the key factors that impact this budget scenario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {editedFactors.map((factor, index) => (
            <div key={factor.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <Input 
                  value={factor.name}
                  onChange={(e) => handleFactorChange(index, 'name', e.target.value)}
                  placeholder="Factor name"
                  className="font-medium"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveFactor(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Impact: {factor.impact > 0 ? '+' : ''}{factor.impact}%</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    factor.impact > 0 ? 'bg-green-100 text-green-800' : 
                    factor.impact < 0 ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {factor.impact > 0 ? 'Positive' : factor.impact < 0 ? 'Negative' : 'Neutral'}
                  </span>
                </div>
                
                <Slider 
                  value={[factor.impact]}
                  min={-15}
                  max={15}
                  step={0.5}
                  onValueChange={(values) => handleFactorChange(index, 'impact', values[0])}
                />
              </div>
              
              <Textarea 
                value={factor.description}
                onChange={(e) => handleFactorChange(index, 'description', e.target.value)}
                placeholder="Description of how this factor impacts the budget"
                className="text-sm"
              />
            </div>
          ))}
          
          <div className="p-4 border border-dashed rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Input 
                value={newFactor.name}
                onChange={(e) => setNewFactor({...newFactor, name: e.target.value})}
                placeholder="New factor name"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Impact: {newFactor.impact > 0 ? '+' : ''}{newFactor.impact}%</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  newFactor.impact > 0 ? 'bg-green-100 text-green-800' : 
                  newFactor.impact < 0 ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {newFactor.impact > 0 ? 'Positive' : newFactor.impact < 0 ? 'Negative' : 'Neutral'}
                </span>
              </div>
              
              <Slider 
                value={[newFactor.impact]}
                min={-15}
                max={15}
                step={0.5}
                onValueChange={(values) => setNewFactor({...newFactor, impact: values[0]})}
              />
            </div>
            
            <Textarea 
              value={newFactor.description}
              onChange={(e) => setNewFactor({...newFactor, description: e.target.value})}
              placeholder="Description of how this factor impacts the budget"
              className="text-sm"
            />
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAddFactor}
              disabled={!newFactor.name}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Factor
            </Button>
          </div>
          
          <Button 
            className="w-full"
            onClick={handleSaveFactors}
          >
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
