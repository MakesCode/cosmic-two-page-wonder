import { ApiService } from '@/lib/axios/ApiService';
import { ApiRequest } from '../../../../../packages/model/common/apiRequest';
import { SmartGarantResponse } from '../../../../../packages/model/common/SmartGarantResponse';
import { OrganizationBase, ProfileApi } from './model/organization';

export type getOrganizationRequest = ApiRequest<{}, {}>;
export type getSaleProfileRequest = ApiRequest<{ organizationId: string }, {}>;

export interface OrganizationGateway {
  getOrganization(req: getOrganizationRequest): Promise<SmartGarantResponse<OrganizationBase>>;
  getSaleProfile(req: getSaleProfileRequest): Promise<SmartGarantResponse<ProfileApi>>;
}

export class ApiOrganizationGateway implements OrganizationGateway {
  constructor(private apiService: ApiService) {}

  async getOrganization(_req: getOrganizationRequest): Promise<SmartGarantResponse<OrganizationBase>> {
    return this.apiService.get(`/v1/identity/organization`);
  }
  async getSaleProfile({ params }: getSaleProfileRequest): Promise<SmartGarantResponse<ProfileApi>> {
    return this.apiService.get(`/v1/identity/organizations/${params.organizationId}/saleprofile`);
  }
}
