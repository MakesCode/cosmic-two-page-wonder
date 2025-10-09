import { ApiService } from "@lib/axios/ApiService";
import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Claim } from "@features/pro/gli/Claims/model/Claim";
import { GetClaimsRequest, GetClaimByIdRequest } from "@features/pro/gli/Claims/model/request";
import { ClaimsGateway } from "@dependencies/interface/pro/ClaimsGateway";

export class ApiClaimsGateway implements ClaimsGateway {
  constructor(private apiService: ApiService) {}

  async getClaims({ params }: GetClaimsRequest): Promise<SmartGarantResponse<SmartGarantGrid<Claim>>> {
    return this.apiService.get(`/v1/gli/subscriptions/${params.subscriptionId}/claims`);
  }

  async getClaimById({ params }: GetClaimByIdRequest): Promise<SmartGarantResponse<Claim>> {
    return this.apiService.get(`/v1/gli/claims/${params.claimId}`);
  }
}
