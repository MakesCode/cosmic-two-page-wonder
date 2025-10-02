import { SmartGarantResponse } from '../../../../../../packages/model/common/SmartGarantResponse';
import { GLICreationResponse } from '../../../../../../packages/model/pro/GLICreationResponse';
import { Kpi } from '../../../../../../packages/model/pro/kpi';
import { ApiService } from '@/lib/axios/ApiService';
import { getKpiRequest, SubscriptionGateway , getSubscriptionRequest} from '@dependencies/interface/pro/SubscriptionGateway';

export class ApiSubscriptionGateway implements SubscriptionGateway {
  constructor(private apiService: ApiService) {}

  async getSubscription({ params, data }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>> {
    return this.apiService.get(`/v1/gli/subscription`);
  }
  async getKpi({ params }: getKpiRequest): Promise<SmartGarantResponse<Kpi>> {
    return this.apiService.get(`/v1/gli/subscriptions/${params.subscriptionId}/kpi`);
  }
}
