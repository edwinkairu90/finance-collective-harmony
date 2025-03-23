
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScenarioProvider } from "./context/ScenarioContext";
import { ScenarioContent } from "./ScenarioContent";

export const ScenarioPlanner: React.FC = () => {
  return (
    <ScenarioProvider>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Scenario Planning</CardTitle>
              <CardDescription>Create and manage budget scenarios for strategic planning</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScenarioContent />
        </CardContent>
      </Card>
    </ScenarioProvider>
  );
};
