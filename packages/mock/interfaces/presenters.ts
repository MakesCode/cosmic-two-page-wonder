import { Subscription, KpiData, RentalApproval, RentalApprovalFilters, StatusOption, StatusInfo } from '../types';

export interface UseSubscriptionPresenter {
  (): {
    subscription: Subscription | null;
    isLoadingSubscription: boolean;
  };
}

export interface UseKpiPresenter {
  (params: { subscriptionId?: string }): {
    kpi: KpiData | null;
    isLoadingKpi: boolean;
  };
}

export interface UseRentalApprovalsPresenter {
  (params: { subscriptionId?: string }): RentalApprovalsPresenterReturn;
}

export interface RentalApprovalsPresenterReturn extends RentalApprovalFilters {
  setSearch: (value: string) => void;
  setStatus: (value: number | undefined) => void;
  setGroupe: (value: number | undefined) => void;
  setPageIndex: (value: number) => void;
  setPageSize: (value: number) => void;
  resetFilters: () => void;

  rows: RentalApproval[];
  hasData: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  totalCount: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startItem: number;
  endItem: number;

  goToDetails: (id: string) => void;
  archive: (id: string) => Promise<void>;

  statusOptions: StatusOption[];
  getStatusInfo: (status: number) => StatusInfo;
}
