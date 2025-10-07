import { ApiService } from '@lib/axios/ApiService';
import { Claim } from './model/Claim';
import { RetrieveClaimsRequest } from './model/request';

export interface ClaimsGateway {
  getClaims(request: RetrieveClaimsRequest): Promise<Claim[]>;
}

export class ApiClaimsGateway implements ClaimsGateway {
  constructor(private apiService: ApiService) {}

  async getClaims(request: RetrieveClaimsRequest): Promise<Claim[]> {
    const response = await this.apiService.get<Claim[]>(
      `/subscriptions/${request.params.subscriptionId}/claims`
    );
    return response;
  }
}
