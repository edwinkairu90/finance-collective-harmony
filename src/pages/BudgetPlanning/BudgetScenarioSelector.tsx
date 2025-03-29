
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Package, Pencil, Plus, Trash2, Edit, Save } from "lucide-react";
import { BudgetScenarioType, ScenarioFactor } from "@/types/budgetScenarios";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScenarioFactorsEditor } from "./ScenarioFactorsEditor";
import { ScenarioAssumptionsEditor } from "./ScenarioAssumptionsEditor";
import { 
  getScenarioById, 
  updateScenarioFactors, 
  updateScenarioAssumptions, 
  updateScenarioDescription,
  addScenario,
  deleteScenario,
  getBudgetScenarios
} from "./BudgetScenarioData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface BudgetScenarioSelectorProps {
  activeScenario: BudgetScenarioType;
  onScenarioChange: (scenario: BudgetScenarioType) => void;
}

export const BudgetScenarioSelector: React.FC<BudgetScenarioSelectorProps> = ({ 
  activeScenario, 
  onScenarioChange 
}) => {
  const { toast } = useToast();
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("factors");
  const [editingDescription, setEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState("");
  const [scenarios, setScenarios] = useState(getBudgetScenarios());
  
  const [newScenario, setNewScenario] = useState({
    name: "",
    description: "",
    budgetPercentage: 0
  });
  
  const scenario = getScenarioById(activeScenario);
  
  const refreshScenarios = () => {
    setScenarios(getBudgetScenarios());
  };

  const handleSaveFactors = (updatedFactors: ScenarioFactor[]) => {
    updateScenarioFactors(activeScenario, updatedFactors);
    toast({
      title: "Factors Updated",
      description: "Scenario factors have been successfully updated."
    });
  };

  const handleSaveAssumptions = (updatedAssumptions: string[]) => {
    updateScenarioAssumptions(activeScenario, updatedAssumptions);
    toast({
      title: "Assumptions Updated",
      description: "Scenario assumptions have been successfully updated."
    });
  };
  
  const handleStartEditDescription = () => {
    if (scenario) {
      setTempDescription(scenario.description);
      setEditingDescription(true);
    }
  };
  
  const handleSaveDescription = () => {
    if (scenario) {
      updateScenarioDescription(activeScenario, tempDescription);
      setEditingDescription(false);
      toast({
        title: "Description Updated",
        description: "Scenario description has been successfully updated."
      });
    }
  };
  
  const handleCancelEditDescription = () => {
    setEditingDescription(false);
  };
  
  const handleAddScenario = () => {
    if (!newScenario.name) {
      toast({
        title: "Name Required",
        description: "Please provide a name for the new scenario.",
        variant: "destructive"
      });
      return;
    }
    
    const createdScenario = addScenario(
      newScenario.name,
      newScenario.description,
      newScenario.budgetPercentage
    );
    
    // Reset form
    setNewScenario({
      name: "",
      description: "",
      budgetPercentage: 0
    });
    
    // Switch to the new scenario
    onScenarioChange(createdScenario.id);
    
    // Refresh scenarios list
    refreshScenarios();
    
    toast({
      title: "Scenario Created",
      description: `"${createdScenario.name}" has been created successfully.`
    });
  };
  
  const handleDeleteScenario = (id: string) => {
    const isDeleted = deleteScenario(id);
    
    if (isDeleted) {
      // If current active scenario is deleted, switch to base case
      if (id === activeScenario) {
        onScenarioChange("base-case");
      }
      
      // Refresh scenarios list
      refreshScenarios();
      
      toast({
        title: "Scenario Deleted",
        description: "The scenario has been deleted successfully."
      });
    } else {
      toast({
        title: "Cannot Delete",
        description: "Default scenarios cannot be deleted.",
        variant: "destructive"
      });
    }
  };

  const getScenarioIcon = (id: string) => {
    switch(id) {
      case "base-case":
        return <Package className="h-5 w-5 mr-2 text-slate-500" />;
      case "worst-case":
        return <TrendingDown className="h-5 w-5 mr-2 text-red-500" />;
      case "best-case":
        return <TrendingUp className="h-5 w-5 mr-2 text-green-500" />;
      default:
        return <Pencil className="h-5 w-5 mr-2 text-purple-500" />;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Budget Scenarios</CardTitle>
            <CardDescription>View different budget projections</CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> New Scenario
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Scenario</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Scenario Name</Label>
                    <Input 
                      id="name" 
                      value={newScenario.name} 
                      onChange={(e) => setNewScenario({...newScenario, name: e.target.value})}
                      placeholder="e.g. New Product Launch"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={newScenario.description} 
                      onChange={(e) => setNewScenario({...newScenario, description: e.target.value})}
                      placeholder="Describe the scenario and its key assumptions"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Budget Impact (%)</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="percentage" 
                        type="number" 
                        value={newScenario.budgetPercentage} 
                        onChange={(e) => setNewScenario({...newScenario, budgetPercentage: Number(e.target.value)})}
                        placeholder="0"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Positive values increase the budget, negative values decrease it.</p>
                  </div>
                  <Button onClick={handleAddScenario} className="w-full">
                    Create Scenario
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
            >
              <Pencil className="h-4 w-4 mr-1" /> 
              {showDetails ? "Hide Details" : "Edit Factors"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={activeScenario} 
          onValueChange={(value) => onScenarioChange(value as BudgetScenarioType)}
          className="flex flex-col space-y-1"
        >
          {scenarios.map((s) => (
            <div key={s.id} className="flex items-center space-x-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
              <RadioGroupItem value={s.id} id={s.id} />
              <Label htmlFor={s.id} className="flex flex-grow items-center cursor-pointer">
                {getScenarioIcon(s.id)}
                <div className="flex-grow">
                  <span className="font-medium">{s.name}</span>
                  {editingDescription && activeScenario === s.id ? (
                    <div className="flex items-center gap-2 mt-1">
                      <Textarea
                        value={tempDescription}
                        onChange={(e) => setTempDescription(e.target.value)}
                        className="text-sm min-h-[60px]"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  )}
                </div>
              </Label>
              
              <div className="flex items-center gap-1">
                {activeScenario === s.id && (
                  <>
                    {editingDescription ? (
                      <>
                        <Button variant="ghost" size="sm" onClick={handleSaveDescription}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleCancelEditDescription}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={handleStartEditDescription}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </>
                )}
                
                {!s.isDefault && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteScenario(s.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>

        {showDetails && scenario && (
          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="factors">Key Factors</TabsTrigger>
                <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="factors" className="mt-4">
                <ScenarioFactorsEditor 
                  scenarioId={activeScenario}
                  factors={scenario.factors}
                  onSave={handleSaveFactors}
                />
              </TabsContent>
              
              <TabsContent value="assumptions" className="mt-4">
                <ScenarioAssumptionsEditor
                  scenarioId={activeScenario}
                  assumptions={scenario.assumptions}
                  onSave={handleSaveAssumptions}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
