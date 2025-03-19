
export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'tele_sales'
  | 'quotation'
  | 'design'
  | 'digital_production'
  | 'offset_production'
  | 'accounts';

export type UserTeam =
  | 'Management'
  | 'Sales'
  | 'Quotation'
  | 'Design'
  | 'Digital Production'
  | 'Offset Production'
  | 'Accounts';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  team: UserTeam;
  createdAt: Date;
}

export type LeadStatus =
  | 'Initiated'
  | 'Confirmed'
  | 'On Hold'
  | 'Closed'
  | 'Rejected'
  | 'Waiting for Advance Payment'
  | 'Waiting for Customer Input'
  | 'In Progress'
  | 'Out for Production'
  | 'Production Completed'
  | 'Waiting for Full Payment'
  | 'Dispatched'
  | 'Delivered';

export interface Payment {
  id: string;
  amount: number;
  type: 'Advance' | 'Full';
  date: Date;
  method: 'Cash' | 'Bank Transfer' | 'Credit Card' | 'UPI';
  notes?: string;
}

export interface CustomerInput {
  id: string;
  name: string;
  mobile: string;
  alternativeMobile?: string;
  files: string[]; // URLs to the uploaded files
  notes?: string;
  submittedAt: Date;
}

export interface AssignmentHistory {
  id: string;
  assignedTo: User;
  assignedBy: User;
  assignedAt: Date;
  notes?: string;
}

export interface StatusHistory {
  id: string;
  status: LeadStatus;
  changedBy: User;
  changedAt: Date;
  notes?: string;
}

export interface Lead {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  requirements: string;
  quantity: number;
  expectedDeliveryDate?: Date;
  status: LeadStatus;
  statusHistory: StatusHistory[];
  assignedTo: User;
  assignmentHistory: AssignmentHistory[];
  customerInputUrl?: string;
  customerInput?: CustomerInput;
  totalAmount: number;
  advanceAmount: number;
  pendingAmount: number;
  payments: Payment[];
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  files?: string[]; // URLs to any uploaded files
  notes?: string;
}
