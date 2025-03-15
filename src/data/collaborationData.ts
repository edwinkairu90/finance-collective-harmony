
import { BudgetRequestData, HistoricalDataItem } from "../types/collaboration";

export const budgetRequests: BudgetRequestData[] = [
  {
    id: "sales-q3",
    department: "Sales",
    totalAmount: 245000,
    period: "Q3 2025",
    assignedTo: {
      name: "John Doe",
      avatar: "JD",
    },
    status: "completed",
    dueDate: "Aug 15, 2025",
    lineItems: [
      { id: "s1", description: "Sales Training Program", amount: 75000, category: "Training" },
      { id: "s2", description: "Conference Attendance", amount: 45000, category: "Events" },
      { id: "s3", description: "CRM Software Licenses", amount: 35000, category: "Software" },
      { id: "s4", description: "Lead Generation Campaign", amount: 60000, category: "Marketing" },
      { id: "s5", description: "Sales Team Incentives", amount: 30000, category: "Compensation" },
    ]
  },
  {
    id: "marketing-q3",
    department: "Marketing",
    totalAmount: 250000,
    period: "Q3 2025",
    assignedTo: {
      name: "Jane Lee",
      avatar: "JL",
    },
    status: "in-progress",
    dueDate: "Aug 18, 2025",
    lineItems: [
      { id: "m1", description: "Digital Advertising", amount: 120000, category: "Advertising" },
      { id: "m2", description: "Content Creation", amount: 45000, category: "Creative" },
      { id: "m3", description: "Events & Sponsorships", amount: 60000, category: "Events" },
      { id: "m4", description: "Brand Development", amount: 25000, category: "Branding" },
    ]
  },
  {
    id: "engineering-q3",
    department: "Engineering",
    totalAmount: 410000,
    period: "Q3 2025",
    assignedTo: {
      name: "Robert Kim",
      avatar: "RK",
    },
    status: "completed",
    dueDate: "Aug 12, 2025",
    lineItems: [
      { id: "e1", description: "Cloud Infrastructure", amount: 150000, category: "Infrastructure" },
      { id: "e2", description: "Development Tools", amount: 75000, category: "Software" },
      { id: "e3", description: "QA Automation", amount: 95000, category: "Testing" },
      { id: "e4", description: "Security Audit", amount: 45000, category: "Security" },
      { id: "e5", description: "Technical Documentation", amount: 45000, category: "Documentation" },
    ]
  },
  {
    id: "support-q3",
    department: "Customer Support",
    totalAmount: 180000,
    period: "Q3 2025",
    assignedTo: {
      name: "Sarah Chen",
      avatar: "SC",
    },
    status: "completed",
    dueDate: "Aug 10, 2025",
    lineItems: [
      { id: "cs1", description: "Support Platform", amount: 85000, category: "Software" },
      { id: "cs2", description: "Knowledge Base Updates", amount: 35000, category: "Documentation" },
      { id: "cs3", description: "Customer Success Training", amount: 60000, category: "Training" },
    ]
  },
  {
    id: "finance-q3",
    department: "Finance",
    totalAmount: 120000,
    period: "Q3 2025",
    assignedTo: {
      name: "Mike Peters",
      avatar: "MP",
    },
    status: "not-started",
    dueDate: "Aug 20, 2025",
    lineItems: [
      { id: "f1", description: "Financial Software Upgrade", amount: 75000, category: "Software" },
      { id: "f2", description: "Compliance Training", amount: 25000, category: "Training" },
      { id: "f3", description: "Audit Services", amount: 20000, category: "Professional Services" },
    ]
  },
  {
    id: "hr-q3",
    department: "Human Resources",
    totalAmount: 155000,
    period: "Q3 2025",
    assignedTo: {
      name: "Lisa Geller",
      avatar: "LG",
    },
    status: "in-progress",
    dueDate: "Aug 18, 2025",
    lineItems: [
      { id: "h1", description: "Recruitment Software", amount: 45000, category: "Software" },
      { id: "h2", description: "Employee Training Program", amount: 60000, category: "Training" },
      { id: "h3", description: "Team Building Activities", amount: 30000, category: "Events" },
      { id: "h4", description: "Benefits Administration", amount: 20000, category: "Administration" },
    ]
  },
];

export const historicalData: HistoricalDataItem[] = [
  { period: "Q2 2025", department: "Marketing", revenue: 245000, expenses: 198000, submittedBy: "Jane Lee" },
  { period: "Q2 2025", department: "Sales", revenue: 380000, expenses: 320000, submittedBy: "John Doe" },
  { period: "Q1 2025", department: "Marketing", revenue: 230000, expenses: 185000, submittedBy: "Jane Lee" },
  { period: "Q1 2025", department: "Sales", revenue: 365000, expenses: 310000, submittedBy: "John Doe" },
  { period: "Q4 2024", department: "Engineering", revenue: 0, expenses: 420000, submittedBy: "Robert Kim" },
];
