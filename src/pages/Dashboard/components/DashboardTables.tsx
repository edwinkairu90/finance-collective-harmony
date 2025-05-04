
import { BVASummaryTable } from "@/components/dashboard/BVASummaryTable";
import { BVAVarianceChart } from "@/components/dashboard/BVAVarianceChart";
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";

export const DashboardTables = () => {
  // Get data from the actuals hook to ensure consistency
  const { departmentData } = useActualsData();

  return (
    <div className="grid grid-cols-2 gap-5">
      <BVASummaryTable />
      <BVAVarianceChart />
    </div>
  );
};
