export enum ClaimStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CLOSED = "CLOSED",
}

export enum ClaimType {
  UNPAID_RENT = "UNPAID_RENT",
  PROPERTY_DAMAGE = "PROPERTY_DAMAGE",
  LEGAL_FEES = "LEGAL_FEES",
  EVICTION = "EVICTION",
  OTHER = "OTHER",
}

export const ClaimStatusLabels: Record<ClaimStatus, string> = {
  [ClaimStatus.PENDING]: "En attente",
  [ClaimStatus.IN_PROGRESS]: "En cours",
  [ClaimStatus.APPROVED]: "Approuvé",
  [ClaimStatus.REJECTED]: "Rejeté",
  [ClaimStatus.CLOSED]: "Clôturé",
};

export const ClaimTypeLabels: Record<ClaimType, string> = {
  [ClaimType.UNPAID_RENT]: "Loyer impayé",
  [ClaimType.PROPERTY_DAMAGE]: "Dégradation",
  [ClaimType.LEGAL_FEES]: "Frais juridiques",
  [ClaimType.EVICTION]: "Expulsion",
  [ClaimType.OTHER]: "Autre",
};

export interface Claim {
  id: string;
  claimNumber: string;
  subscriptionId: string;
  rentalApprovalId: string;
  tenantName: string;
  propertyAddress: string;
  type: ClaimType;
  status: ClaimStatus;
  amount: number;
  description: string;
  documents: string[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  rejectionReason?: string;
}

export interface CreateClaimInput {
  subscriptionId: string;
  rentalApprovalId: string;
  type: ClaimType;
  amount: number;
  description: string;
  documents?: string[];
}
