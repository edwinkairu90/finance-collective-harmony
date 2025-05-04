
import { BVASummaryTable } from "@/components/dashboard/BVASummaryTable";
import { BVAVarianceChart } from "@/components/dashboard/BVAVarianceChart";

export const DashboardTables = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <BVASummaryTable />
      <BVAVarianceChart />
    </div>
  );
};
