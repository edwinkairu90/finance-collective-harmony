
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VarianceAnalysisTable } from "@/components/actuals-vs-budget/VarianceAnalysisTable";

interface VarianceItem {
  item: string;
  department: string;
  budget: number;
  actual: number;
  variance: number;
  explanation: string;
}

interface VarianceAnalysisTabProps {
  overBudgetItems: VarianceItem[];
  underBudgetItems: VarianceItem[];
}

export const VarianceAnalysisTab = ({ 
  overBudgetItems, 
  underBudgetItems 
}: VarianceAnalysisTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Variance Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <VarianceAnalysisTable
          data={overBudgetItems}
          title="Top 3 Over Budget"
          variant="over"
        />
        <VarianceAnalysisTable
          data={underBudgetItems}
          title="Top 3 Under Budget"
          variant="under"
        />
      </CardContent>
    </Card>
  );
};
