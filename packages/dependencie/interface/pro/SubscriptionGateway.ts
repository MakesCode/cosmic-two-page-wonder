import { ApiRequest } from "@features/model/apiRequest";
import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";
import { Kpi } from "@features/pro/gli/Subscriptions/model/kpi";
import { SmartGarantResponse } from "@features/model/SmartGarantResponse";

export type getSubscriptionRequest = ApiRequest<{}, {}>;
export type getKpiRequest = ApiRequest<
  {
    subscriptionId: string;
  },
  {}
>;

export interface SubscriptionGateway {
  getSubscription({
    params,
    data,
  }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>>;
  getKpi({ params, data }: getKpiRequest): Promise<SmartGarantResponse<Kpi>>;
}
