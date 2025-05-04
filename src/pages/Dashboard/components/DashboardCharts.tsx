
import { revenueData } from "@/components/dashboard/dashboardData";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OpexBarChart } from "@/components/dashboard/OpexBarChart";

export const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <RevenueChart data={revenueData} />
      <OpexBarChart />
    </div>
  );
};
