export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  country: string;
  investmentExperience: "beginner" | "intermediate" | "advanced";
  riskAppetite: "low" | "medium" | "high";
  kycStatus: "pending" | "verified" | "rejected";
  avatar?: string;
  createdAt: Date;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  fullAddress: string;
  propertyType: "residential" | "commercial" | "mixed-use" | "land";
  description: string;
  images: string[];
  videoUrl?: string;
  rooms: number;
  bathrooms: number;
  squareMeters: number;
  amenities: string[];
  furnishingStatus: "furnished" | "unfurnished" | "partially-furnished";
  constructionStatus: "completed" | "ongoing" | "planned";
  constructionTimeline?: string;
  
  // Financial
  propertyValue: number;
  investmentAvailable: number;
  costPerFraction: number;
  totalFractions: number;
  fractionsSold: number;
  investorsCount: number;
  
  // Returns
  rentalYield: number;
  rentPerQuarter: number;
  capitalAppreciation: number;
  firstDividendDate: string;
  projectedROI: number;
  
  // Status
  status: "open" | "funding" | "closed" | "completed";
  fundingProgress: number;
  featured: boolean;
  createdAt: Date;
}

export interface Investment {
  id: string;
  userId: string;
  propertyId: string;
  property: Property;
  fractionsOwned: number;
  amountInvested: number;
  currentValuation: number;
  roi: number;
  paymentSchedule: PaymentSchedule;
  status: "active" | "completed" | "pending";
  purchaseDate: Date;
  nextDividendDate: string;
}

export interface PaymentSchedule {
  type: "full" | "3-months" | "6-months" | "12-months" | "custom";
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  installments: Installment[];
}

export interface Installment {
  id: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: "paid" | "pending" | "overdue";
  paidDate?: string;
}

export interface Dividend {
  id: string;
  investmentId: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  period: string;
  status: "paid" | "pending" | "upcoming";
  paymentDate: string;
}

export interface Transaction {
  id: string;
  type: "investment" | "dividend" | "deposit" | "withdrawal" | "refund" | "payment";
  amount: number;
  status: "completed" | "pending" | "failed";
  description: string;
  date: string;
  reference?: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  pendingDeposits: number;
  pendingWithdrawals: number;
}

export interface Notification {
  id: string;
  type: "dividend" | "payment" | "asset" | "opportunity" | "alert" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface Referral {
  id: string;
  userId: string;
  referralCode: string;
  referralLink: string;
  totalReferrals: number;
  activeReferrals: number;
  totalRewards: number;
  referrals: ReferralUser[];
}

export interface ReferralUser {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: "pending" | "active" | "invested";
  reward: number;
}

export interface DashboardMetrics {
  totalInvested: number;
  portfolioValue: number;
  projectedAnnualReturns: number;
  totalDividendsEarned: number;
  activeInvestments: number;
  portfolioGrowth: { month: string; value: number }[];
  assetAllocation: { name: string; value: number }[];
}

export interface FilterOptions {
  location?: string;
  propertyType?: string;
  roiRange?: [number, number];
  fundingStatus?: string;
  rentalYield?: [number, number];
  minInvestment?: number;
  constructionStatus?: string;
}
