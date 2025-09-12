export interface Subscription {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export interface KpiData {
  averageGuaranteedRentAmount: number;
  activeRentalApprovalCount: number;
  claimCount: number;
  rentalApprovalCount: number;
  approvedRentalApprovalCount: number;
}

export interface RentalApproval {
  id: string;
  references: {
    rentalApprovalRef: string;
  };
  owners: Owner[];
  tenants: Tenant[];
  realEstateLot: {
    address: {
      fullAddress: string;
    };
  };
  createDate: string;
  businessData: {
    rentAmount: number;
  };
  status: number;
  isArchived: boolean;
}

export interface Owner {
  id: string;
  naturalEntity?: {
    firstName: string;
    lastName: string;
  };
  legalEntity?: {
    name: string;
  };
}

export interface Tenant {
  id: string;
  tenant: {
    naturalEntity?: {
      firstName: string;
      lastName: string;
    };
    legalEntity?: {
      name: string;
    };
  };
}

// Filter Types
export interface RentalApprovalFilters {
  search: string;
  status: number | undefined;
  groupe: number | undefined;
  pageIndex: number;
  pageSize: number;
}

// Status Option Type
export interface StatusOption {
  label: string;
  value: number | undefined;
}

// Status Info Type
export interface StatusInfo {
  text: string;
  variant: string;
}
