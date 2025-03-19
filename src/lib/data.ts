import { Lead, LeadStatus, User, UserRole, UserTeam } from "./types";

// Mock Users
export const users: User[] = [
  {
    id: "u1",
    name: "John Admin",
    email: "admin@attracta.com",
    avatar: "https://ui-avatars.com/api/?name=John+Admin&background=0D8ABC&color=fff",
    role: "super_admin",
    team: "Management",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "u2",
    name: "Sarah Sales",
    email: "sarah@attracta.com",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Sales&background=0D8ABC&color=fff",
    role: "tele_sales",
    team: "Sales",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "u3",
    name: "Mike Quote",
    email: "mike@attracta.com",
    avatar: "https://ui-avatars.com/api/?name=Mike+Quote&background=0D8ABC&color=fff",
    role: "quotation",
    team: "Quotation",
    createdAt: new Date("2023-02-01"),
  },
  {
    id: "u4",
    name: "Emily Design",
    email: "emily@attracta.com",
    avatar: "https://ui-avatars.com/api/?name=Emily+Design&background=0D8ABC&color=fff",
    role: "design",
    team: "Design",
    createdAt: new Date("2023-02-15"),
  },
  {
    id: "u5",
    name: "David Digital",
    email: "david@attracta.com",
    avatar: "https://ui-avatars.com/api/?name=David+Digital&background=0D8ABC&color=fff",
    role: "digital_production",
    team: "Digital Production",
    createdAt: new Date("2023-03-01"),
  },
  {
    id: "u6",
    name: "Lisa Offset",
    email: "lisa@attracta.com",
    avatar: "https://ui-avatars.com/api/?name=Lisa+Offset&background=0D8ABC&color=fff",
    role: "offset_production",
    team: "Offset Production",
    createdAt: new Date("2023-03-15"),
  },
  {
    id: "u7",
    name: "Tom Accounting",
    email: "tom@attracta.com",
    avatar: "https://ui-avatars.com/api/?name=Tom+Accounting&background=0D8ABC&color=fff",
    role: "accounts",
    team: "Accounts",
    createdAt: new Date("2023-04-01"),
  },
];

// Current logged in user for development
export const currentUser = users[0];

// Helper function to generate status history for a lead
const generateStatusHistory = (leadId: string, status: LeadStatus) => {
  return {
    id: `sh-${leadId}-${Date.now()}`,
    status,
    changedBy: users[Math.floor(Math.random() * users.length)],
    changedAt: new Date(),
    notes: "Status updated",
  };
};

// Mock Leads
export const leads: Lead[] = [
  {
    id: "lead1",
    customerName: "Acme Corporation",
    customerPhone: "+1234567890",
    customerEmail: "contact@acme.com",
    requirements: "Promotional flex banner for upcoming event, 10ft x 5ft, full color, with grommets",
    quantity: 5,
    expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: "Confirmed",
    statusHistory: [
      {
        id: "sh1",
        status: "Initiated",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        notes: "Initial contact with customer",
      },
      {
        id: "sh2",
        status: "Confirmed",
        changedBy: users[2], // Mike Quote
        changedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        notes: "Quotation confirmed",
      },
    ],
    assignedTo: users[2], // Mike Quote
    assignmentHistory: [
      {
        id: "ah1",
        assignedTo: users[2], // Mike Quote
        assignedBy: users[1], // Sarah Sales
        assignedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        notes: "Assigned for quotation",
      },
    ],
    customerInputUrl: "attracta.com/customer-input/acme-corporation/12345",
    totalAmount: 2500,
    advanceAmount: 0,
    pendingAmount: 2500,
    payments: [],
    createdBy: users[1], // Sarah Sales
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    notes: "Important client, handle with priority",
  },
  {
    id: "lead2",
    customerName: "TechStart Inc",
    customerPhone: "+9876543210",
    customerEmail: "info@techstart.com",
    requirements: "Business cards, 3.5x2 inches, double-sided, glossy finish",
    quantity: 500,
    expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: "Waiting for Advance Payment",
    statusHistory: [
      {
        id: "sh3",
        status: "Initiated",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        notes: "Initial contact with customer",
      },
      {
        id: "sh4",
        status: "Confirmed",
        changedBy: users[2], // Mike Quote
        changedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        notes: "Quotation confirmed",
      },
      {
        id: "sh5",
        status: "Waiting for Advance Payment",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        notes: "Customer confirmed order, waiting for payment",
      },
    ],
    assignedTo: users[1], // Sarah Sales
    assignmentHistory: [
      {
        id: "ah2",
        assignedTo: users[2], // Mike Quote
        assignedBy: users[1], // Sarah Sales
        assignedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        notes: "Assigned for quotation",
      },
      {
        id: "ah3",
        assignedTo: users[1], // Sarah Sales
        assignedBy: users[2], // Mike Quote
        assignedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        notes: "Quotation complete, assigned back to sales",
      },
    ],
    customerInputUrl: "attracta.com/customer-input/techstart-inc/67890",
    totalAmount: 750,
    advanceAmount: 0,
    pendingAmount: 750,
    payments: [],
    createdBy: users[1], // Sarah Sales
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "lead3",
    customerName: "Green Gardens",
    customerPhone: "+1122334455",
    customerEmail: "contact@greengardens.com",
    requirements: "Brochures, A4 size, tri-fold, 100gsm art paper, full color",
    quantity: 1000,
    expectedDeliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    status: "In Progress",
    statusHistory: [
      {
        id: "sh6",
        status: "Initiated",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        notes: "Initial contact with customer",
      },
      {
        id: "sh7",
        status: "Confirmed",
        changedBy: users[2], // Mike Quote
        changedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
        notes: "Quotation confirmed",
      },
      {
        id: "sh8",
        status: "Waiting for Advance Payment",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
        notes: "Customer confirmed order",
      },
      {
        id: "sh9",
        status: "Waiting for Customer Input",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        notes: "Advance payment received",
      },
      {
        id: "sh10",
        status: "In Progress",
        changedBy: users[3], // Emily Design
        changedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        notes: "Customer input received, design started",
      },
    ],
    assignedTo: users[3], // Emily Design
    assignmentHistory: [
      {
        id: "ah4",
        assignedTo: users[2], // Mike Quote
        assignedBy: users[1], // Sarah Sales
        assignedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        notes: "Assigned for quotation",
      },
      {
        id: "ah5",
        assignedTo: users[1], // Sarah Sales
        assignedBy: users[2], // Mike Quote
        assignedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
        notes: "Quotation complete, assigned back to sales",
      },
      {
        id: "ah6",
        assignedTo: users[3], // Emily Design
        assignedBy: users[1], // Sarah Sales
        assignedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        notes: "Customer input received, assigned to design team",
      },
    ],
    customerInputUrl: "attracta.com/customer-input/green-gardens/13579",
    customerInput: {
      id: "ci1",
      name: "Green Gardens",
      mobile: "+1122334455",
      alternativeMobile: "+5566778899",
      files: [
        "https://example.com/uploads/greengardens-logo.jpg",
        "https://example.com/uploads/greengardens-content.pdf",
      ],
      notes: "Please use eco-friendly design theme",
      submittedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    },
    totalAmount: 3500,
    advanceAmount: 1750,
    pendingAmount: 1750,
    payments: [
      {
        id: "p1",
        amount: 1750,
        type: "Advance",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        method: "Bank Transfer",
        notes: "50% advance payment",
      },
    ],
    createdBy: users[1], // Sarah Sales
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    files: [
      "https://example.com/uploads/greengardens-draft1.jpg",
      "https://example.com/uploads/greengardens-draft2.jpg",
    ],
    notes: "Customer prefers green color scheme, eco-friendly messaging",
  },
  {
    id: "lead4",
    customerName: "Luxe Hotels",
    customerPhone: "+5544332211",
    customerEmail: "marketing@luxehotels.com",
    requirements: "Hotel directory, A5 size, hardcover, 50 pages, premium finish",
    quantity: 100,
    expectedDeliveryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    status: "Production Completed",
    statusHistory: [
      {
        id: "sh11",
        status: "Initiated",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        notes: "Initial contact with customer",
      },
      {
        id: "sh12",
        status: "Confirmed",
        changedBy: users[2], // Mike Quote
        changedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), // 19 days ago
        notes: "Quotation confirmed",
      },
      {
        id: "sh13",
        status: "Waiting for Advance Payment",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
        notes: "Customer confirmed order",
      },
      {
        id: "sh14",
        status: "Waiting for Customer Input",
        changedBy: users[1], // Sarah Sales
        changedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), // 17 days ago
        notes: "Advance payment received",
      },
      {
        id: "sh15",
        status: "In Progress",
        changedBy: users[3], // Emily Design
        changedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        notes: "Customer input received, design started",
      },
      {
        id: "sh16",
        status: "Out for Production",
        changedBy: users[3], // Emily Design
        changedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        notes: "Design completed, sent for production",
      },
      {
        id: "sh17",
        status: "Production Completed",
        changedBy: users[6], // Lisa Offset
        changedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        notes: "Production completed",
      },
    ],
    assignedTo: users[1], // Sarah Sales
    assignmentHistory: [
      {
        id: "ah7",
        assignedTo: users[2], // Mike Quote
        assignedBy: users[1], // Sarah Sales
        assignedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        notes: "Assigned for quotation",
      },
      {
        id: "ah8",
        assignedTo: users[1], // Sarah Sales
        assignedBy: users[2], // Mike Quote
        assignedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), // 19 days ago
        notes: "Quotation complete, assigned back to sales",
      },
      {
        id: "ah9",
        assignedTo: users[3], // Emily Design
        assignedBy: users[1], // Sarah Sales
        assignedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
        notes: "Customer input received, assigned to design team",
      },
      {
        id: "ah10",
        assignedTo: users[6], // Lisa Offset
        assignedBy: users[3], // Emily Design
        assignedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        notes: "Design completed, assigned to offset production due to premium quality requirements",
      },
      {
        id: "ah11",
        assignedTo: users[1], // Sarah Sales
        assignedBy: users[6], // Lisa Offset
        assignedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        notes: "Production completed, assigned back to sales for final payment",
      },
    ],
    customerInputUrl: "attracta.com/customer-input/luxe-hotels/24680",
    customerInput: {
      id: "ci2",
      name: "Luxe Hotels",
      mobile: "+5544332211",
      alternativeMobile: "+9988776655",
      files: [
        "https://example.com/uploads/luxehotels-logo.jpg",
        "https://example.com/uploads/luxehotels-photos.zip",
        "https://example.com/uploads/luxehotels-content.docx",
      ],
      notes: "Gold embossing on the cover, high-quality images inside",
      submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
    },
    totalAmount: 15000,
    advanceAmount: 7500,
    pendingAmount: 7500,
    payments: [
      {
        id: "p2",
        amount: 7500,
        type: "Advance",
        date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), // 17 days ago
        method: "Credit Card",
        notes: "50% advance payment",
      },
    ],
    createdBy: users[1], // Sarah Sales
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    files: [
      "https://example.com/uploads/luxehotels-cover-draft.jpg",
      "https://example.com/uploads/luxehotels-pages-draft.pdf",
      "https://example.com/uploads/luxehotels-final-proof.pdf",
    ],
    notes: "Premium client, ensure highest quality, gold embossing on cover",
  },
];

// Helper functions for working with the mock data

// Get leads for a specific user based on their role and assigned leads
export const getLeadsForUser = (user: User): Lead[] => {
  switch (user.role) {
    case "super_admin":
    case "admin":
      return leads; // Admins can see all leads
    case "tele_sales":
      // Sales team sees leads they created or that are assigned to them
      return leads.filter(
        (lead) =>
          lead.createdBy.id === user.id || 
          lead.assignedTo.id === user.id
      );
    case "accounts":
      // Accounts team sees leads with payment-related statuses or delivered leads
      return leads.filter(
        (lead) =>
          lead.status === "Waiting for Advance Payment" ||
          lead.status === "Waiting for Full Payment" ||
          lead.status === "Delivered"
      );
    default:
      // Other teams see leads assigned to them
      return leads.filter((lead) => lead.assignedTo.id === user.id);
  }
};

// Get the next possible statuses based on current status and user role
export const getNextPossibleStatuses = (
  currentStatus: LeadStatus,
  userRole: UserRole
): LeadStatus[] => {
  switch (currentStatus) {
    case "Initiated":
      if (userRole === "quotation") {
        return ["Confirmed"];
      }
      break;
    case "Confirmed":
      if (userRole === "tele_sales") {
        return [
          "On Hold",
          "Closed",
          "Rejected",
          "Waiting for Advance Payment",
        ];
      }
      break;
    case "On Hold":
      if (userRole === "tele_sales") {
        return [
          "Closed",
          "Rejected",
          "Waiting for Advance Payment",
        ];
      }
      break;
    case "Waiting for Advance Payment":
      if (userRole === "tele_sales") {
        return ["Waiting for Customer Input"];
      }
      break;
    case "Waiting for Customer Input":
      if (
        userRole === "tele_sales" ||
        userRole === "design"
      ) {
        return ["In Progress"];
      }
      break;
    case "In Progress":
      if (userRole === "design") {
        return ["Out for Production"];
      }
      break;
    case "Out for Production":
      if (
        userRole === "digital_production" ||
        userRole === "offset_production"
      ) {
        return ["Production Completed"];
      }
      break;
    case "Production Completed":
      if (userRole === "tele_sales") {
        return ["Waiting for Full Payment"];
      }
      break;
    case "Waiting for Full Payment":
      if (userRole === "tele_sales") {
        return ["Dispatched"];
      }
      break;
    case "Dispatched":
      if (userRole === "tele_sales") {
        return ["Delivered"];
      }
      break;
    default:
      return [];
  }
  return [];
};

// Get a random lead status for testing
export const getRandomStatus = (): LeadStatus => {
  const statuses: LeadStatus[] = [
    "Initiated",
    "Confirmed",
    "On Hold",
    "Closed",
    "Rejected",
    "Waiting for Advance Payment",
    "Waiting for Customer Input",
    "In Progress",
    "Out for Production",
    "Production Completed",
    "Waiting for Full Payment",
    "Dispatched",
    "Delivered",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Get color for status badge
export const getStatusColor = (status: LeadStatus): string => {
  switch (status) {
    case "Initiated":
      return "bg-blue-100 text-blue-800";
    case "Confirmed":
      return "bg-green-100 text-green-800";
    case "On Hold":
      return "bg-yellow-100 text-yellow-800";
    case "Closed":
      return "bg-gray-100 text-gray-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Waiting for Advance Payment":
      return "bg-purple-100 text-purple-800";
    case "Waiting for Customer Input":
      return "bg-orange-100 text-orange-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Out for Production":
      return "bg-cyan-100 text-cyan-800";
    case "Production Completed":
      return "bg-green-100 text-green-800";
    case "Waiting for Full Payment":
      return "bg-purple-100 text-purple-800";
    case "Dispatched":
      return "bg-indigo-100 text-indigo-800";
    case "Delivered":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Format currency amount
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
