import {  ApiResponse } from '../interfaces/gateways';
import { KpiData } from '../types';
import { getKpiForSubscription } from '../data/kpi';

export interface KpiGateway {
  getKpi(subscriptionId: string): Promise<ApiResponse<KpiData>>;
}

export class MockKpiGateway implements KpiGateway {
  async getKpi(subscriptionId: string): Promise<ApiResponse<KpiData>> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const kpi = getKpiForSubscription(subscriptionId);
    
    return {
      payload: kpi,
      success: true,
      message: 'KPI data retrieved successfully',
    };
  }
}
