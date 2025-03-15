
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const budgetData = [
  { name: 'Salaries & Benefits', value: 650000 },
  { name: 'Marketing', value: 250000 },
  { name: 'Operations', value: 180000 },
  { name: 'Technology', value: 120000 },
  { name: 'Other', value: 48000 },
];

export const departments = [
  { name: "Sales", id: "sales" },
  { name: "Marketing", id: "marketing" },
  { name: "Engineering", id: "engineering" },
  { name: "Customer Support", id: "customer-support" },
  { name: "Finance", id: "finance" },
  { name: "Human Resources", id: "hr" },
];

export const getTotalBudget = () => {
  return budgetData.reduce((acc, item) => acc + item.value, 0);
};
