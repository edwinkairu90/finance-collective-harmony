
export interface ApprovalItem {
  id: string;
  title: string;
  department: string;
  submitter: {
    name: string;
    avatar: string;
  };
  dateSubmitted: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  description: string;
  approver?: {
    name: string;
    avatar: string;
  };
  approvalDate?: string;
  reason?: string;
}

export interface HistoricalApproval {
  id: string;
  title: string;
  department: string;
  amount: number;
  requestedBy: string;
  requestDate: string;
  approvedBy: string;
  approvedDate: string;
  status: "approved" | "rejected";
  reason?: string;
}
