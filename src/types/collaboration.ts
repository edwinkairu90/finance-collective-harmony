
export interface LineItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  notes?: string;
}

export interface BudgetRequestData {
  id: string;
  department: string;
  totalAmount: number;
  period: string;
  assignedTo: {
    name: string;
    avatar: string;
  };
  status: 'completed' | 'in-progress' | 'not-started';
  dueDate: string;
  lineItems: LineItem[];
}

export interface HistoricalDataItem {
  period: string;
  department: string;
  revenue: number;
  expenses: number;
  submittedBy: string;
}
