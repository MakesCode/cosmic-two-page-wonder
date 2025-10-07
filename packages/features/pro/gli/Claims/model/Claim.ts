export enum ClaimStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
}

export type Claim = {
  id: string;
  rentalApprovalId: string;
  tenantName: string;
  propertyAddress: string;
  claimType: string;
  claimDate: Date;
  status: ClaimStatus;
  amount: number;
  description: string;
};
