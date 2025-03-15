
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScenarioItem, ScenarioType, ScenarioTemplate } from "@/types/planning";
import { scenarioTemplates } from "@/data/planningData";
import { TrendingUp, Rocket, Target } from "lucide-react";

interface ScenarioCreatorProps {
  onCreateScenario: (scenario: ScenarioItem) => void;
}

export const ScenarioCreator: React.FC<ScenarioCreatorProps> = ({ onCreateScenario }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ScenarioTemplate | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    timeline: "",
    assumptions: [""],
    revenue: 0,
    expenses: 0,
    departments: [
      { name: "Sales", budgetChange: 0 },
      { name: "Marketing", budgetChange: 0 },
      { name: "Engineering", budgetChange: 0 }
    ]
  });

  const handleSelectTemplate = (template: ScenarioTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      ...formData,
      description: template.description,
      assumptions: template.defaultAssumptions
    });
    setStep(2);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleAssumptionChange = (index: number, value: string) => {
    const newAssumptions = [...formData.assumptions];
    newAssumptions[index] = value;
    setFormData({
      ...formData,
      assumptions: newAssumptions
    });
  };

  const addAssumption = () => {
    setFormData({
      ...formData,
      assumptions: [...formData.assumptions, ""]
    });
  };

  const removeAssumption = (index: number) => {
    const newAssumptions = formData.assumptions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      assumptions: newAssumptions
    });
  };

  const handleDepartmentChange = (index: number, value: number) => {
    const newDepartments = [...formData.departments];
    newDepartments[index] = {
      ...newDepartments[index],
      budgetChange: value
    };
    setFormData({
      ...formData,
      departments: newDepartments
    });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = () => {
    if (!selectedTemplate) return;
    
    const profit = formData.revenue - formData.expenses;
    
    const newScenario: ScenarioItem = {
      id: `scenario-${Date.now()}`,
      name: formData.name,
      type: selectedTemplate.type,
      description: formData.description,
      timeline: formData.timeline,
      assumptions: formData.assumptions.filter(a => a.trim() !== ""),
      budgetImpact: {
        revenue: formData.revenue,
        expenses: formData.expenses,
        profit: profit
      },
      departments: formData.departments,
      status: "draft",
      createdBy: "Current User",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    onCreateScenario(newScenario);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Select Scenario Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scenarioTemplates.map((template) => (
              <Card 
                key={template.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleSelectTemplate(template)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {template.type === 'expansion' && <TrendingUp className="h-5 w-5" />}
                    {template.type === 'product-launch' && <Rocket className="h-5 w-5" />}
                    {template.type === 'cost-reduction' && <Target className="h-5 w-5" />}
                    <h4 className="font-medium">{template.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 2 && selectedTemplate && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Scenario Details</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Scenario Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter a descriptive name"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the purpose of this scenario"
              />
            </div>
            
            <div>
              <Label htmlFor="timeline">Timeline</Label>
              <Input
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleInputChange("timeline", e.target.value)}
                placeholder="e.g. Q3 2025 - Q1 2026"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Key Assumptions</Label>
                <Button variant="outline" size="sm" onClick={addAssumption} type="button">
                  Add Assumption
                </Button>
              </div>
              
              <div className="space-y-2">
                {formData.assumptions.map((assumption, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={assumption}
                      onChange={(e) => handleAssumptionChange(index, e.target.value)}
                      placeholder="Enter an assumption"
                    />
                    {formData.assumptions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAssumption(index)}
                        type="button"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={nextStep}>Next: Budget Impact</Button>
          </div>
        </div>
      )}

      {step === 3 && selectedTemplate && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Budget Impact</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="revenue">Expected Revenue Impact ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange("revenue", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="expenses">Expected Expense Impact ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={formData.expenses}
                  onChange={(e) => handleInputChange("expenses", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Departmental Budget Changes</Label>
              <div className="space-y-2">
                {formData.departments.map((dept, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-24">{dept.name}</span>
                    <Input
                      type="number"
                      value={dept.budgetChange}
                      onChange={(e) => handleDepartmentChange(index, Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>Back</Button>
            <Button onClick={handleSubmit}>Create Scenario</Button>
          </div>
        </div>
      )}
    </div>
  );
};
