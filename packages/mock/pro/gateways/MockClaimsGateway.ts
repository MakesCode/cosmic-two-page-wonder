import { ClaimsGateway } from '@features/pro/gli/Claims/api-claims';
import { Claim } from '@features/pro/gli/Claims/model/Claim';
import { RetrieveClaimsRequest } from '@features/pro/gli/Claims/model/request';
import { mockClaims } from '../data/claims';

export class MockClaimsGateway implements ClaimsGateway {
  async getClaims(request: RetrieveClaimsRequest): Promise<Claim[]> {
    return Promise.resolve(mockClaims);
  }
}
