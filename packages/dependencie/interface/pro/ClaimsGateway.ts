import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Claim } from "@features/pro/gli/Claims/model/Claim";
import { GetClaimsRequest, GetClaimByIdRequest } from "@features/pro/gli/Claims/model/request";

export interface ClaimsGateway {
  getClaims({ params, data }: GetClaimsRequest): Promise<SmartGarantResponse<SmartGarantGrid<Claim>>>;
  getClaimById({ params, data }: GetClaimByIdRequest): Promise<SmartGarantResponse<Claim>>;
}
