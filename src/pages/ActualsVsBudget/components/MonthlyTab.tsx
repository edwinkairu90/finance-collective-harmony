
import { MonthlyTrendChart } from "@/components/actuals-vs-budget/MonthlyTrendChart";
import { VarianceTrendChart } from "@/components/actuals-vs-budget/VarianceTrendChart";

interface MonthlyData {
  name: string;
  budget: number;
  actual: number;
  variance: number;
}

interface MonthlyTabProps {
  data: MonthlyData[];
}

export const MonthlyTab = ({ data }: MonthlyTabProps) => {
  return (
    <>
      <MonthlyTrendChart data={data} />
      <VarianceTrendChart data={data} />
    </>
  );
};
