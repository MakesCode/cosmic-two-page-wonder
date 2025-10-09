export interface Claim {
  id: string;
  externalId: string;
  rentalApprovalId: string;
  subscriptionId: string;
  status: ClaimStatus;
  type: ClaimType;
  amount: number;
  description: string;
  createDate: string;
  updateDate: string;
  resolutionDate?: string;
  property: {
    address: string;
    city: string;
    zipCode: string;
  };
  tenant: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export enum ClaimStatus {
  Open = 10,
  InProgress = 20,
  PendingDocuments = 30,
  UnderReview = 40,
  Approved = 50,
  Rejected = 60,
  Closed = 70,
}

export enum ClaimType {
  UnpaidRent = 1,
  PropertyDamage = 2,
  LegalExpenses = 3,
  Other = 4,
}

export const labelClaimStatus = (status: ClaimStatus): string => {
  return {
    [ClaimStatus.Open]: "Ouvert",
    [ClaimStatus.InProgress]: "En cours",
    [ClaimStatus.PendingDocuments]: "En attente de documents",
    [ClaimStatus.UnderReview]: "En analyse",
    [ClaimStatus.Approved]: "Approuvé",
    [ClaimStatus.Rejected]: "Rejeté",
    [ClaimStatus.Closed]: "Clôturé",
  }[status];
};

export const labelClaimType = (type: ClaimType): string => {
  return {
    [ClaimType.UnpaidRent]: "Impayé de loyer",
    [ClaimType.PropertyDamage]: "Dégradation",
    [ClaimType.LegalExpenses]: "Frais juridiques",
    [ClaimType.Other]: "Autre",
  }[type];
};
