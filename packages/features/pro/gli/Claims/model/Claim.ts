export enum ClaimStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED",
  REJECTED = "REJECTED",
}

export enum ClaimType {
  UNPAID_RENT = "UNPAID_RENT",
  PROPERTY_DAMAGE = "PROPERTY_DAMAGE",
  LEGAL_FEES = "LEGAL_FEES",
  OTHER = "OTHER",
}

export interface Claim {
  id: string;
  subscriptionId: string;
  tenantName: string;
  propertyAddress: string;
  type: ClaimType;
  status: ClaimStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  documents: string[];
}
