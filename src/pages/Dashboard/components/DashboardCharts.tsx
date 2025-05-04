
import { useActualsData } from "@/pages/ActualsVsBudget/hooks/useActualsData";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OpexBarChart } from "@/components/dashboard/OpexBarChart";

export const DashboardCharts = () => {
  // Get data from the actuals hook to ensure consistency
  const { monthlyData } = useActualsData();
  
  // Transform the monthly data into the format expected by RevenueChart
  const revenueData = monthlyData.map(item => ({
    month: item.name,
    projected: item.budget,
    actual: item.actual
  }));

  return (
    <div className="grid grid-cols-2 gap-5">
      <RevenueChart data={revenueData} />
      <OpexBarChart />
    </div>
  );
};
