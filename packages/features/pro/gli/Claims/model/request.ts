import { ApiRequest } from "@features/model/apiRequest";
import { CreateClaimInput } from "./Claim";

export type GetClaimsRequest = ApiRequest<
  { subscriptionId: string },
  Record<string, never>
>;

export type GetClaimRequest = ApiRequest<
  { claimId: string },
  Record<string, never>
>;

export type CreateClaimRequest = ApiRequest<
  Record<string, never>,
  CreateClaimInput
>;
