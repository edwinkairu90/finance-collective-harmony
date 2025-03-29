
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface ComparisonEmptyStateProps {
  onClose: () => void;
}

export const ComparisonEmptyState: React.FC<ComparisonEmptyStateProps> = ({ onClose }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Scenario Comparison</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Please select at least two scenarios to compare</CardDescription>
      </CardHeader>
    </Card>
  );
};
