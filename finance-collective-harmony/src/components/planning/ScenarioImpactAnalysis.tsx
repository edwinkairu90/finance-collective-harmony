
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScenarioItem } from "@/types/planning";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X, Plus } from "lucide-react";

interface ScenarioImpactAnalysisProps {
  scenario: ScenarioItem;
  editingAssumptions: boolean;
  editedAssumptions: string[];
  newAssumption: string;
  onAssumptionChange: (index: number, value: string) => void;
  onRemoveAssumption: (index: number) => void;
  onNewAssumptionChange: (value: string) => void;
  onAddAssumption: () => void;
  onSaveAssumptions: () => void;
  onCancelEditAssumptions: () => void;
}

export const ScenarioImpactAnalysis: React.FC<ScenarioImpactAnalysisProps> = ({
  scenario,
  editingAssumptions,
  editedAssumptions,
  newAssumption,
  onAssumptionChange,
  onRemoveAssumption,
  onNewAssumptionChange,
  onAddAssumption,
  onSaveAssumptions,
  onCancelEditAssumptions
}) => {
  // Transform department data for the chart
  const getDepartmentImpactData = () => {
    if (!scenario.departments) return [];
    
    return scenario.departments.map(dept => ({
      name: dept.name,
      impact: dept.budgetChange
    }));
  };

  // Get financial impact data for the chart
  const getFinancialImpactData = () => {
    return [
      { name: 'Revenue', value: scenario.budgetImpact.revenue },
      { name: 'Expenses', value: scenario.budgetImpact.expenses },
      { name: 'Profit', value: scenario.budgetImpact.profit }
    ];
  };

  return (
    <div className="mb-6 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Impact Analysis: {scenario.name}</CardTitle>
          <CardDescription>{scenario.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium mb-2">Departmental Budget Impact</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getDepartmentImpactData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Budget Impact']} />
                    <Legend />
                    <Bar dataKey="impact" name="Budget Impact" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium mb-2">Financial Impact</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getFinancialImpactData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="value" name="Amount" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-medium">Key Assumptions</h3>
              {editingAssumptions && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={onSaveAssumptions}>
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={onCancelEditAssumptions}>
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                </div>
              )}
            </div>
            
            {editingAssumptions ? (
              <div className="space-y-2">
                {editedAssumptions.map((assumption, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={assumption}
                      onChange={(e) => onAssumptionChange(index, e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveAssumption(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    value={newAssumption}
                    onChange={(e) => onNewAssumptionChange(e.target.value)}
                    placeholder="Add a new assumption"
                    className="flex-grow"
                  />
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={onAddAssumption}
                    disabled={newAssumption.trim() === ""}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            ) : (
              <ul className="list-disc pl-5 space-y-1">
                {scenario.assumptions && scenario.assumptions.map((assumption, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{assumption}</li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
