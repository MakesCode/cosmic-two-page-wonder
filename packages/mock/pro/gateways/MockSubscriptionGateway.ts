import { mockSubscriptions } from "@mock/pro/data/subscriptions";
import {
  getKpiRequest,
  getSubscriptionRequest,
  SubscriptionGateway,
} from "@dependencies/interface/pro/SubscriptionGateway";
import { mockKpiData } from "@mock/pro/data";
import { SmartGarantResponse } from "@features/model/SmartGarantResponse";
import { GLICreationResponse } from "@features/pro/gli/Subscriptions/model/GLICreationResponse";
import { Kpi } from "@features/pro/gli/Subscriptions/model/kpi";

export class MockSubscriptionGateway implements SubscriptionGateway {
  async getSubscription({
    params,
    data,
  }: getSubscriptionRequest): Promise<SmartGarantResponse<GLICreationResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      error: {
        errorCode: "NOT_FOUND",
        message: "Subscription not found",
      },
      requestId: "mock-request-id",
      resultStats: 1,
      payload: mockSubscriptions,
    };
  }
  async getKpi({ params }: getKpiRequest): Promise<SmartGarantResponse<Kpi>> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return {
      error: {
        errorCode: "NOT_FOUND",
        message: "Subscription not found",
      },
      requestId: "mock-request-id",
      resultStats: 1,
      payload: mockKpiData,
    };
  }
}
