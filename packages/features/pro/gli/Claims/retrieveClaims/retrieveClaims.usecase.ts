import { ClaimsGateway } from "../api-claims";
import { GetClaimsRequest } from "../model/request";

export const retrieveClaimsUseCase = (claimsApi: ClaimsGateway) => {
  return async (request: GetClaimsRequest) => {
    return claimsApi.getClaims(request);
  };
};
