
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScenarioPlanner } from "@/components/planning/ScenarioPlanner";

export const PlanningTools = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  const handleLaunchTool = (toolId: string) => {
    setActiveToolId(toolId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Planning Tools</CardTitle>
          <CardDescription>Utilize our planning tools to optimize your budget</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PlanningToolCard 
                id="scenario"
                title="Scenario Planning" 
                description="Create different budget scenarios to plan for various business conditions." 
                onLaunch={handleLaunchTool}
              />
              <PlanningToolCard 
                id="forecasting"
                title="Forecasting" 
                description="Predict future budget needs based on historical data and trends." 
                onLaunch={handleLaunchTool}
              />
              <PlanningToolCard 
                id="variance"
                title="Variance Analysis" 
                description="Compare actual spending to budgeted amounts and analyze the differences." 
                onLaunch={handleLaunchTool}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {activeToolId === "scenario" && (
        <ScenarioPlanner />
      )}
      {activeToolId === "forecasting" && (
        <Card>
          <CardHeader>
            <CardTitle>Forecasting Tool</CardTitle>
            <CardDescription>Coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This tool is under development.</p>
          </CardContent>
        </Card>
      )}
      {activeToolId === "variance" && (
        <Card>
          <CardHeader>
            <CardTitle>Variance Analysis Tool</CardTitle>
            <CardDescription>Coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This tool is under development.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

interface PlanningToolCardProps {
  id: string;
  title: string;
  description: string;
  onLaunch: (id: string) => void;
}

const PlanningToolCard = ({ id, title, description, onLaunch }: PlanningToolCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onLaunch(id)}>Launch Tool</Button>
      </CardFooter>
    </Card>
  );
};
