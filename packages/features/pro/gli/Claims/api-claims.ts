import { ApiService } from "@lib/axios/ApiService";
import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Claim } from "./model/Claim";
import {
  ClaimsGateway,
  GetClaimsRequest,
  GetClaimRequest,
  CreateClaimRequest,
} from "@dependencies/interface/pro/ClaimsGateway";

export class ApiClaimsGateway implements ClaimsGateway {
  constructor(private apiService: ApiService) {}

  async getClaims({
    params,
  }: GetClaimsRequest): Promise<SmartGarantResponse<SmartGarantGrid<Claim>>> {
    return this.apiService.get(
      `/v1/gli/subscriptions/${params.subscriptionId}/claims`
    );
  }

  async getClaim({
    params,
  }: GetClaimRequest): Promise<SmartGarantResponse<Claim>> {
    return this.apiService.get(`/v1/gli/claims/${params.claimId}`);
  }

  async createClaim({
    data,
  }: CreateClaimRequest): Promise<SmartGarantResponse<Claim>> {
    return this.apiService.post(`/v1/gli/claims`, data);
  }
}

export type { ClaimsGateway };
