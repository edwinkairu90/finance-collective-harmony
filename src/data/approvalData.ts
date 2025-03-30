
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
    status: "approved",
    description: "Replace outdated workstations and purchase ergonomic chairs for the customer support team.",
    approver: {
      name: "Michael Scott",
      avatar: "MS"
    },
    approvalDate: "Aug 13, 2023",
    reason: "Approved as the equipment upgrade will improve employee productivity and reduce ergonomic-related health complaints."
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
    status: "rejected",
    description: "Increase cloud server capacity to support new product features and growing user base.",
    approver: {
      name: "David Wallace",
      avatar: "DW"
    },
    approvalDate: "Aug 11, 2023",
    reason: "Rejected due to current budget constraints. Please resubmit with a phased approach or reduced scope."
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
    status: "approved",
    description: "Annual subscription for advanced recruitment and applicant tracking software.",
    approver: {
      name: "Jennifer Taylor",
      avatar: "JT"
    },
    approvalDate: "Aug 9, 2023",
    reason: "Approved as this will streamline our hiring process and improve candidate experience."
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
    status: "rejected",
    description: "Company-wide team building event to improve collaboration across departments.",
    approver: {
      name: "Jennifer Taylor",
      avatar: "JT"
    },
    approvalDate: "Aug 8, 2023",
    reason: "Rejected in favor of department-specific events with lower total cost. Please resubmit with a more targeted approach."
  },
];

export const historicalApprovals: HistoricalApproval[] = [
  {
    id: "hist-001",
    title: "Q2 Marketing Campaign",
    department: "Marketing",
    amount: 28000,
    requestedBy: "Jane Lee",
    requestDate: "May 5, 2023",
    approvedBy: "Michael Scott",
    approvedDate: "May 7, 2023",
    status: "approved",
    reason: "Approved based on strong Q1 performance and alignment with annual goals."
  },
  {
    id: "hist-002",
    title: "Development Team Hardware",
    department: "Engineering",
    amount: 32000,
    requestedBy: "Robert Kim",
    requestDate: "May 10, 2023",
    approvedBy: "David Wallace",
    approvedDate: "May 12, 2023",
    status: "approved",
    reason: "Approved as the hardware upgrade is necessary for the development of new features."
  },
  {
    id: "hist-003",
    title: "Sales Conference Attendance",
    department: "Sales",
    amount: 18000,
    requestedBy: "John Doe",
    requestDate: "April 20, 2023",
    approvedBy: "Michael Scott",
    approvedDate: "April 22, 2023",
    status: "rejected",
    reason: "Rejected due to travel budget limitations. Consider virtual conference options."
  },
  {
    id: "hist-004",
    title: "Office Renovation",
    department: "Operations",
    amount: 65000,
    requestedBy: "Lisa Geller",
    requestDate: "March 15, 2023",
    approvedBy: "David Wallace",
    approvedDate: "March 18, 2023",
    status: "rejected",
    reason: "Rejected due to cost. Please resubmit with phased approach focusing on critical areas first."
  },
  {
    id: "hist-005",
    title: "Customer Feedback Software",
    department: "Customer Support",
    amount: 8500,
    requestedBy: "Sarah Chen",
    requestDate: "February 5, 2023",
    approvedBy: "Jennifer Taylor",
    approvedDate: "February 7, 2023",
    status: "approved",
    reason: "Approved as it directly supports our customer satisfaction KPIs."
  },
];
