
import { DepartmentBarChart } from "@/components/actuals-vs-budget/DepartmentBarChart";
import { ComparisonTable } from "@/components/actuals-vs-budget/ComparisonTable";

interface DepartmentData {
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

interface DepartmentTabProps {
  data: DepartmentData[];
}

export const DepartmentTab = ({ data }: DepartmentTabProps) => {
  return (
    <>
      <DepartmentBarChart data={data} />
      <ComparisonTable data={data} title="Department Budget vs Actual" />
    </>
  );
};
