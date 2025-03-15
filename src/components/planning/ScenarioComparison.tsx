
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScenarioItem } from "@/types/planning";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { ComparisonEmptyState } from "./comparison/ComparisonEmptyState";
import { PLComparisonTable } from "./comparison/PLComparisonTable";
import { ScenarioOverviewTable } from "./comparison/ScenarioOverviewTable";

interface ScenarioComparisonProps {
  scenarios: ScenarioItem[];
  onClose: () => void;
  onExport?: () => void;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ 
  scenarios, 
  onClose,
  onExport
}) => {
  if (scenarios.length < 2) {
    return <ComparisonEmptyState onClose={onClose} />;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Scenario Comparison</CardTitle>
          <div className="flex gap-2">
            {onExport && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onExport}
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Comparing {scenarios.length} scenarios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* P&L Comparison Table */}
          <PLComparisonTable scenarios={scenarios} />

          {/* Scenario Summary Table */}
          <ScenarioOverviewTable scenarios={scenarios} />
        </div>
      </CardContent>
    </Card>
  );
};
