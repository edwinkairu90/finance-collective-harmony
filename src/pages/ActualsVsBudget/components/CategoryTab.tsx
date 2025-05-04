
import { DepartmentBarChart } from "@/components/actuals-vs-budget/DepartmentBarChart";
import { ComparisonTable } from "@/components/actuals-vs-budget/ComparisonTable";

interface CategoryData {
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

interface CategoryTabProps {
  data: CategoryData[];
}

export const CategoryTab = ({ data }: CategoryTabProps) => {
  return (
    <>
      <DepartmentBarChart data={data} />
      <ComparisonTable data={data} title="Category Budget vs Actual" />
    </>
  );
};
