
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BudgetTimeline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Planning Phase</div>
              <div className="text-sm text-muted-foreground">Data collection and initial budgets</div>
            </div>
            <div className="text-sm font-medium text-green-500">Completed</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Department Review</div>
              <div className="text-sm text-muted-foreground">Teams review and adjust budgets</div>
            </div>
            <div className="text-sm font-medium text-amber-500">In Progress</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Executive Approval</div>
              <div className="text-sm text-muted-foreground">Final review and sign-off</div>
            </div>
            <div className="text-sm font-medium text-gray-500">Pending</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Implementation</div>
              <div className="text-sm text-muted-foreground">Budget rollout and tracking setup</div>
            </div>
            <div className="text-sm font-medium text-gray-500">Pending</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
