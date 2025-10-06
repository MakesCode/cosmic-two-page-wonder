import { queryOptions } from "@tanstack/react-query";
import { ClaimsGateway } from "../api-claims";
import { retrieveClaimsUseCase } from "./retrieveClaims.usecase";
import { GetClaimsRequest } from "../model/request";

export const retrieveClaimsQueryOption = (
  claimsApi: ClaimsGateway,
  request: GetClaimsRequest
) => {
  return queryOptions({
    queryKey: ["claims", request.params],
    queryFn: () => retrieveClaimsUseCase(claimsApi)(request),
  });
};
