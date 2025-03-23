
import { Department } from "@/types/budget";
import { departments } from "../BudgetData";

export const departmentsWithCostCenters: Department[] = departments.map(dept => ({
  id: dept.id,
  name: dept.name,
  budget: dept.id === "marketing" ? 250000 : dept.id === "sales" ? 350000 : 150000,
  costCenters: generateInitialCostCenters(dept.id, dept.name)
}));

function generateInitialCostCenters(departmentId: string, departmentName: string): { id: string; name: string; description: string; budget: number; previousActual: number; departmentId: string }[] {
  switch (departmentId) {
    case "marketing":
      return [
        { id: "digital-advertising", name: "Digital Advertising", description: "Online campaigns across platforms", budget: 120000, previousActual: 105000, departmentId },
        { id: "content-creation", name: "Content Creation", description: "Blog, video, and social media content", budget: 45000, previousActual: 40000, departmentId },
        { id: "events", name: "Events", description: "Trade shows and conferences", budget: 60000, previousActual: 62000, departmentId },
        { id: "brand-development", name: "Brand Development", description: "Brand strategies and assets", budget: 25000, previousActual: 22000, departmentId }
      ];
    case "sales":
      return [
        { id: "sales-team", name: "Sales Team", description: "Sales representatives salaries and commissions", budget: 200000, previousActual: 185000, departmentId },
        { id: "crm", name: "CRM Software", description: "Customer relationship management tools", budget: 35000, previousActual: 32000, departmentId },
        { id: "travel", name: "Travel", description: "Client visits and meetings", budget: 75000, previousActual: 70000, departmentId },
        { id: "training", name: "Training", description: "Sales team training and development", budget: 40000, previousActual: 35000, departmentId }
      ];
    case "engineering":
      return [
        { id: "dev-tools", name: "Development Tools", description: "Software licenses and services", budget: 50000, previousActual: 48000, departmentId },
        { id: "infrastructure", name: "Infrastructure", description: "Cloud services and hosting", budget: 75000, previousActual: 70000, departmentId },
        { id: "research", name: "Research", description: "R&D initiatives", budget: 25000, previousActual: 20000, departmentId }
      ];
    default:
      return [
        { id: `${departmentId}-operations`, name: "Operations", description: "Day-to-day operations", budget: 80000, previousActual: 75000, departmentId },
        { id: `${departmentId}-resources`, name: "Resources", description: "Team resources and tools", budget: 70000, previousActual: 65000, departmentId }
      ];
  }
}
