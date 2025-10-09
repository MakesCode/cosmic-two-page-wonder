import { ApiRequest } from "@features/model/apiRequest";

export type GetClaimsRequest = ApiRequest<
  {
    subscriptionId: string;
  },
  {}
>;

export type GetClaimByIdRequest = ApiRequest<
  {
    claimId: string;
  },
  {}
>;
