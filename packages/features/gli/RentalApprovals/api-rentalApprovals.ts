import { SmartGarantGrid, SmartGarantResponse } from '@model/common/SmartGarantResponse';
import { ApiService } from '@lib/axios/ApiService';
import { RentalApproval } from '@features/gli/RentalApprovals/model/RentalApproval';
import {
  getRentalApprovalsRequest,
  getSubscriptionRentalApprovalsRequest,
  postArchiveProjectRequest,
} from '@features/gli/RentalApprovals/model/request';

export interface RentalApprovalsGateway {
  getRentalApprovals({ params, data }: getRentalApprovalsRequest): Promise<SmartGarantResponse<SmartGarantGrid<RentalApproval>>>;
  postArchiveProject({ params, data }: postArchiveProjectRequest): Promise<SmartGarantResponse<any>>;
    getSubscriptionRentalApprovals({ params, data }: getSubscriptionRentalApprovalsRequest): Promise<SmartGarantResponse<RentalApproval>>;
}

export class ApiRentalApprovalsGateway implements RentalApprovalsGateway {
  constructor(private apiService: ApiService) {}

 
  async getRentalApprovals({ params }: getRentalApprovalsRequest): Promise<SmartGarantResponse<SmartGarantGrid<RentalApproval>>> {
    const { subscriptionId, search, pageIndex, limite, status, groupe } = params;

    const query = new URLSearchParams({
      q: search ?? '',
      p: pageIndex.toString() ?? '',
      l: limite.toString() ?? '',
      st: groupe?.toString() ?? '',
      sst: status?.toString() ?? '',
    });
    return this.apiService.get(`/V1/gli/subscriptions/${subscriptionId}/rental-approvals?${query.toString()}`);
  }
  async postArchiveProject({ params }: postArchiveProjectRequest): Promise<SmartGarantResponse<any>> {
    return this.apiService.post(`/v1/gli/subscriptions/${params.subscriptionId}/rental-approvals/${params.rentalApprovalId}/archive`, {});
  }
  async getSubscriptionRentalApprovals({ params }: getSubscriptionRentalApprovalsRequest): Promise<SmartGarantResponse<RentalApproval>> {
    return this.apiService.get(`v1/gli/subscriptions/${params.subscriptionId}/rental-approvals/${params.rentalApprovalId}`);
  }
}
