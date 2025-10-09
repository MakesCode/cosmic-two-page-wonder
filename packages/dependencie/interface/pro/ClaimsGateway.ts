import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Claim } from "@features/pro/gli/Claims/model/Claim";
import {
  GetClaimsRequest,
  GetClaimRequest,
  CreateClaimRequest,
} from "@features/pro/gli/Claims/model/request";

export interface ClaimsGateway {
  getClaims(request: GetClaimsRequest): Promise<SmartGarantResponse<SmartGarantGrid<Claim>>>;
  getClaim(request: GetClaimRequest): Promise<SmartGarantResponse<Claim>>;
  createClaim(request: CreateClaimRequest): Promise<SmartGarantResponse<Claim>>;
}

export type { GetClaimsRequest, GetClaimRequest, CreateClaimRequest };
