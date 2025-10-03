import { ApiRequest } from "@model/common/apiRequest";
import { GLICreationResponse } from "@model/pro/GLICreationResponse";
import { Kpi } from "@model/pro/kpi";
import { SmartGarantResponse } from "@model/common/SmartGarantResponse";

export type getSubscriptionRequest = ApiRequest<{}, {}>;
export type getKpiRequest = ApiRequest<
  {
    subscriptionId: string;
  },
  {}
>;

export interface SubscriptionGateway {
  getSubscription({ params, data }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>>;
  getKpi({ params, data }: getKpiRequest): Promise<SmartGarantResponse<Kpi>>;
}
