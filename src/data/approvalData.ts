
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
    status: "approved",
    conversation: [
      {
        id: "msg-001",
        sender: "Jane Lee",
        timestamp: "May 10, 2023 10:15 AM",
        message: "This campaign is crucial for our Q2 goals as we're targeting new market segments.",
        isApprover: false
      },
      {
        id: "msg-002",
        sender: "David Wilson",
        timestamp: "May 11, 2023 09:30 AM",
        message: "Can you provide more details on the expected ROI for this campaign?",
        isApprover: true
      },
      {
        id: "msg-003",
        sender: "Jane Lee",
        timestamp: "May 11, 2023 11:45 AM",
        message: "Based on previous campaigns, we're projecting a 3.5x ROI within the first 60 days.",
        isApprover: false
      },
      {
        id: "msg-004",
        sender: "David Wilson",
        timestamp: "May 12, 2023 08:15 AM",
        message: "Those projections look solid. I'm approving this request.",
        isApprover: true
      }
    ]
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
    status: "approved",
    conversation: [
      {
        id: "msg-005",
        sender: "John Doe",
        timestamp: "Apr 22, 2023 14:20 PM",
        message: "This conference will allow our team to network with industry leaders and potential clients.",
        isApprover: false
      },
      {
        id: "msg-006",
        sender: "David Wilson",
        timestamp: "Apr 23, 2023 10:05 AM",
        message: "How many team members will be attending?",
        isApprover: true
      },
      {
        id: "msg-007",
        sender: "John Doe",
        timestamp: "Apr 23, 2023 11:30 AM",
        message: "We plan to send 5 key sales representatives who will lead new territory expansions.",
        isApprover: false
      },
      {
        id: "msg-008",
        sender: "David Wilson",
        timestamp: "Apr 25, 2023 09:10 AM",
        message: "Approved. Please ensure the team shares learnings with the broader sales department.",
        isApprover: true
      }
    ]
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
    status: "approved",
    conversation: [
      {
        id: "msg-009",
        sender: "Robert Kim",
        timestamp: "Apr 15, 2023 08:45 AM",
        message: "We need to renew our development tool licenses for the engineering team.",
        isApprover: false
      },
      {
        id: "msg-010",
        sender: "David Wilson",
        timestamp: "Apr 15, 2023 13:20 PM",
        message: "Are there any alternative tools we could use that would be more cost-effective?",
        isApprover: true
      },
      {
        id: "msg-011",
        sender: "Robert Kim",
        timestamp: "Apr 16, 2023 09:05 AM",
        message: "We evaluated three alternatives, but our current solution offers the best integration with our existing workflow.",
        isApprover: false
      },
      {
        id: "msg-012",
        sender: "David Wilson",
        timestamp: "Apr 16, 2023 10:30 AM",
        message: "Makes sense. I'm approving the renewal.",
        isApprover: true
      }
    ]
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
    status: "rejected",
    conversation: [
      {
        id: "msg-013",
        sender: "Lisa Geller",
        timestamp: "Mar 28, 2023 11:05 AM",
        message: "Our office needs significant upgrades to address space issues and improve employee satisfaction.",
        isApprover: false
      },
      {
        id: "msg-014",
        sender: "David Wilson",
        timestamp: "Mar 29, 2023 09:15 AM",
        message: "This is a large budget request. Can you break down the specific costs involved?",
        isApprover: true
      },
      {
        id: "msg-015",
        sender: "Lisa Geller",
        timestamp: "Mar 30, 2023 13:40 PM",
        message: "The budget includes $25,000 for new workstations, $12,000 for meeting space renovations, and $8,000 for electrical work.",
        isApprover: false
      },
      {
        id: "msg-016",
        sender: "David Wilson",
        timestamp: "Apr 2, 2023 08:50 AM",
        message: "Given our current budget constraints, we need to postpone major renovations until next quarter. Request rejected.",
        isApprover: true
      }
    ]
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
    status: "approved",
    conversation: [
      {
        id: "msg-017",
        sender: "Sarah Chen",
        timestamp: "Mar 15, 2023 10:30 AM",
        message: "We need to implement advanced training for our support team to handle the increasing complexity of customer issues.",
        isApprover: false
      },
      {
        id: "msg-018",
        sender: "David Wilson",
        timestamp: "Mar 16, 2023 14:15 PM",
        message: "How will this training impact our customer satisfaction metrics?",
        isApprover: true
      },
      {
        id: "msg-019",
        sender: "Sarah Chen",
        timestamp: "Mar 16, 2023 16:45 PM",
        message: "Based on pilot training sessions, we expect to reduce resolution times by 20% and improve satisfaction scores by 15%.",
        isApprover: false
      },
      {
        id: "msg-020",
        sender: "David Wilson",
        timestamp: "Mar 17, 2023 09:25 AM",
        message: "Approved. Those improvements will have a significant positive impact on our customer experience.",
        isApprover: true
      }
    ]
  }
];
