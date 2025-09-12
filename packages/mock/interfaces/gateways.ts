import { Subscription, KpiData, RentalApproval } from '../types';

export interface ApiResponse<T> {
  payload: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface SubscriptionGateway {
  getSubscription(params: any): Promise<ApiResponse<Subscription>>;
}

export interface KpiGateway {
  getKpi(subscriptionId: string): Promise<ApiResponse<KpiData>>;
}

export interface RentalApprovalsGateway {
  getRentalApprovals(params: {
    subscriptionId?: string;
    search?: string;
    status?: number;
    groupe?: number;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PaginatedResponse<RentalApproval>>>;
  
  archiveRentalApproval(id: string): Promise<ApiResponse<void>>;
}
