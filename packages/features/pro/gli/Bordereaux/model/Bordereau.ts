export enum BordereauStatus {
  DRAFT = 0,
  SUBMITTED = 1,
  VALIDATED = 2,
  REJECTED = 3,
}

export enum BordereauPeriodType {
  MONTHLY = 0,
  QUARTERLY = 1,
  ANNUAL = 2,
}

export interface Bordereau {
  id: string;
  subscriptionId: string;
  reference: string;
  period: string;
  periodType: BordereauPeriodType;
  status: BordereauStatus;
  totalAmount: number;
  commissionsAmount: number;
  claimsAmount: number;
  rentalCount: number;
  createdAt: string;
  submittedAt?: string;
  validatedAt?: string;
  rejectedAt?: string;
  comment?: string;
}

export const BordereauStatusLabels: Record<BordereauStatus, string> = {
  [BordereauStatus.DRAFT]: "Brouillon",
  [BordereauStatus.SUBMITTED]: "Soumis",
  [BordereauStatus.VALIDATED]: "Validé",
  [BordereauStatus.REJECTED]: "Rejeté",
};

export const BordereauPeriodTypeLabels: Record<BordereauPeriodType, string> = {
  [BordereauPeriodType.MONTHLY]: "Mensuel",
  [BordereauPeriodType.QUARTERLY]: "Trimestriel",
  [BordereauPeriodType.ANNUAL]: "Annuel",
};
