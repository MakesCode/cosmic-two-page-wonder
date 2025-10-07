import { ClaimsGateway } from '../api-claims';
import { RetrieveClaimsRequest } from '../model/request';
import { Claim } from '../model/Claim';

export class RetrieveClaimsUseCase {
  constructor(private claimsGateway: ClaimsGateway) {}

  async execute(request: RetrieveClaimsRequest): Promise<Claim[]> {
    return this.claimsGateway.getClaims(request);
  }
}
