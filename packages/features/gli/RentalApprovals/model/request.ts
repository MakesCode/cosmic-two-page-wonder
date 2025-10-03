import { ApiParams } from '@hooks/useFiltres';
import { LegalEntity, NaturalEntity } from '@features/gli/RentalApprovals/model/RentalApproval';
import { ApiRequest } from '@model/common/apiRequest';


export type postCreateApprovalRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {}
>;
export type putOwnersRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {
    owners: Owner[];
  }
>;
export type putTenantRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {
    naturalEntity?: NaturalEntity;
    professionalStatus?: number;
    incomes?: number;
    hasAdditionalIncomes?: boolean;
    incomesChangeAtLease?: boolean;
    guarantors?: {
      naturalEntity: NaturalEntity;
      professionalStatus: number;
      hasAdditionalIncomes: boolean;
      incomesChangeAtLease: boolean;
      link: number;
    }[];
  }
>;
export type putUpdateTenantRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
    tenantId: string;
  },
  {
    naturalEntity?: NaturalEntity;
    professionalStatus?: number;
    incomes?: number;
    hasAdditionalIncomes?: boolean;
    incomesChangeAtLease?: boolean;
    guarantors?: {
      naturalEntity: NaturalEntity;
      professionalStatus: number;
      hasAdditionalIncomes: boolean;
      incomesChangeAtLease: boolean;
      link: number;
    }[];
  }
>;
export type putUpdateGuarantorRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
    guarantorId: string;
  },
  {
    incomes?: number;
    naturalEntity?: NaturalEntity;
  }
>;
export type postAddGuarantorRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
    tenantId: string;
  },
  {
    naturalEntity: {
      title?: string;
      firstName: string;
      lastName: string;
      birthDate?: string;
      email?: string;
      phone?: import('@features/gli/RentalApprovals/model/RentalApproval').Phone;
    };
    professionalStatus: number;
    incomes?: number;
    hasAdditionalIncomes: boolean;
    incomesChangeAtLease: boolean;
    link: number;
  }
>;
export type postConfirmRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {}
>;
export type postArchiveProjectRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {}
>;
export type postCancelGliRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {}
>;
export type postActivateGliRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {
    LeaseEffectiveDate: string;
    entryDate: string;
  }
>;
export type deleteTenantRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
    tenantId: string;
  },
  {}
>;
export type deleteGuarantorRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
    tenantId: string;
    guarantorId: string;
  },
  {}
>;
export type putRentalApprovalsRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {
    hasFurnished: boolean;
    sittingTenant: boolean;
    startLeaseDate: string;
    rentAmount: number;
    chargesAmount: number;
    isBalanceUpToDate: boolean;
    hadConflict: boolean;
    hasDepartureNotice: boolean;
    hasVisaleCoverage: boolean;
  }
>;

export interface Owner {
  ownerId?: string;
  type?: OwnerType;
  legalEntity?: LegalEntity;
  naturalEntity?: NaturalEntity;
}

export enum OwnerType {
  Natural = 1,
  Legal = 2,
}

export type putRealEstateLotsRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {
    realEstateLot: {
      address: {
        address: string;
        city: string;
        country: string;
        zipCode: string;
        fullAddress: string;
        isManual: boolean;
      };
      type: number;
      surface: number;
      roomsNumber: number;
      floor: number;
    };
  }
>;
export type getSubscriptionRentalApprovalsRequest = ApiRequest<
  {
    subscriptionId: string;
    rentalApprovalId: string;
  },
  {}
>;
export type getRentalApprovalsRequest = ApiRequest<ApiParams & { subscriptionId: string }, {}>;
export type getEntitiesRequest = ApiRequest<{ subscriptionId: string; search: string }, {}>;
export type getLastOwnersRequest = ApiRequest<{ subscriptionId: string; count?: number }, {}>;
