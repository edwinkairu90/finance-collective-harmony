
import { ApprovalItem, HistoricalApproval } from "../types/approval";

export const approvalItems: ApprovalItem[] = [
  {
    id: "ap-001",
    title: "Q3 Marketing Budget Increase",
    department: "Marketing",
    submitter: {
      name: "Jane Lee",
      avatar: "JL",
    },
    dateSubmitted: "Aug 15, 2023",
    amount: 32000,
    status: "pending",
    description: "Request to increase digital marketing budget for Q3 campaign targeting new market segments.",
  },
  {
    id: "ap-002",
    title: "Sales Team Training Program",
    department: "Sales",
    submitter: {
      name: "John Doe",
      avatar: "JD",
    },
    dateSubmitted: "Aug 14, 2023",
    amount: 15000,
    status: "pending",
    description: "Advanced sales techniques training program for the entire team to improve conversion rates.",
  },
  {
    id: "ap-003",
    title: "Office Equipment Upgrade",
    department: "Operations",
    submitter: {
      name: "Lisa Geller",
      avatar: "LG",
    },
    dateSubmitted: "Aug 12, 2023",
    amount: 8500,
    status: "pending",
    description: "Replace outdated workstations and purchase ergonomic chairs for the customer support team.",
  },
  {
    id: "ap-004",
    title: "Cloud Infrastructure Expansion",
    department: "Engineering",
    submitter: {
      name: "Robert Kim",
      avatar: "RK",
    },
    dateSubmitted: "Aug 10, 2023",
    amount: 45000,
    status: "pending",
    description: "Increase cloud server capacity to support new product features and growing user base.",
  },
  {
    id: "ap-005",
    title: "Customer Success Portal",
    department: "Customer Support",
    submitter: {
      name: "Sarah Chen",
      avatar: "SC",
    },
    dateSubmitted: "Aug 9, 2023",
    amount: 28000,
    status: "pending",
    description: "Development of a customer success portal to improve customer onboarding and reduce support tickets.",
  },
  {
    id: "ap-006",
    title: "HR Recruitment Software",
    department: "Human Resources",
    submitter: {
      name: "Mike Peters",
      avatar: "MP",
    },
    dateSubmitted: "Aug 8, 2023",
    amount: 12000,
    status: "pending",
    description: "Annual subscription for advanced recruitment and applicant tracking software.",
  },
  {
    id: "ap-007",
    title: "Team Building Event",
    department: "Human Resources",
    submitter: {
      name: "Mike Peters",
      avatar: "MP",
    },
    dateSubmitted: "Aug 7, 2023",
    amount: 5000,
    status: "pending",
    description: "Company-wide team building event to improve collaboration across departments.",
  },
];

// Historical approval data
export const historicalApprovals: HistoricalApproval[] = [
  {
    id: "ha-001",
    title: "Q2 Marketing Campaign",
    department: "Marketing",
    amount: 28500,
    requestedBy: "Jane Lee",
    requestDate: "May 10, 2023",
    approvedBy: "David Wilson",
    approvedDate: "May 12, 2023",
    status: "approved"
  },
  {
    id: "ha-002",
    title: "Sales Conference",
    department: "Sales",
    amount: 18000,
    requestedBy: "John Doe",
    requestDate: "Apr 22, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Apr 25, 2023",
    status: "approved"
  },
  {
    id: "ha-003",
    title: "Developer Licenses",
    department: "Engineering",
    amount: 9500,
    requestedBy: "Robert Kim",
    requestDate: "Apr 15, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Apr 16, 2023",
    status: "approved"
  },
  {
    id: "ha-004",
    title: "Office Renovation",
    department: "Operations",
    amount: 45000,
    requestedBy: "Lisa Geller",
    requestDate: "Mar 28, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Apr 2, 2023",
    status: "rejected"
  },
  {
    id: "ha-005",
    title: "Customer Support Training",
    department: "Customer Support",
    amount: 12500,
    requestedBy: "Sarah Chen",
    requestDate: "Mar 15, 2023",
    approvedBy: "David Wilson",
    approvedDate: "Mar 17, 2023",
    status: "approved"
  }
];
