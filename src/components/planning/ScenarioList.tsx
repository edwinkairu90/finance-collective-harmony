
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScenarioItem } from "@/types/planning";
import { Checkbox } from "@/components/ui/checkbox";

interface ScenarioListProps {
  scenarios: ScenarioItem[];
  onSelect: (scenario: ScenarioItem) => void;
  selectedScenario: ScenarioItem | null;
  selectableForComparison?: boolean;
  onToggleComparisonSelection?: (scenario: ScenarioItem) => void;
  selectedForComparison?: (scenario: ScenarioItem) => boolean;
}

export const ScenarioList: React.FC<ScenarioListProps> = ({ 
  scenarios, 
  onSelect, 
  selectedScenario,
  selectableForComparison = false,
  onToggleComparisonSelection,
  selectedForComparison
}) => {
  const handleRowClick = (scenario: ScenarioItem) => {
    onSelect(scenario);
  };

  const handleComparisonCheckboxChange = (e: React.MouseEvent, scenario: ScenarioItem) => {
    e.stopPropagation();
    if (onToggleComparisonSelection) {
      onToggleComparisonSelection(scenario);
    }
  };

  const getScenarioStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>;
      case "in-review":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In Review</span>;
      case "approved":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      case "rejected":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {selectableForComparison && <TableHead className="w-12">Compare</TableHead>}
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scenarios.map((scenario) => (
            <TableRow 
              key={scenario.id} 
              className={`cursor-pointer ${selectedScenario?.id === scenario.id ? 'bg-muted' : ''}`}
              onClick={() => handleRowClick(scenario)}
            >
              {selectableForComparison && (
                <TableCell onClick={(e) => handleComparisonCheckboxChange(e, scenario)}>
                  <Checkbox checked={selectedForComparison?.(scenario) || false} className="pointer-events-none" />
                </TableCell>
              )}
              <TableCell className="font-medium">{scenario.name}</TableCell>
              <TableCell>{scenario.type.replace('-', ' ')}</TableCell>
              <TableCell>{scenario.timeline}</TableCell>
              <TableCell>{getScenarioStatusBadge(scenario.status)}</TableCell>
              <TableCell>{scenario.createdBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {scenarios.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No scenarios found. Create a new scenario to get started.
        </div>
      )}
    </div>
  );
};
