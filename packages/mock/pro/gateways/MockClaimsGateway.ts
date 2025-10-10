import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Claim } from "@features/pro/gli/Claims/model/Claim";
import {
  ClaimsGateway,
  GetClaimsRequest,
  GetClaimRequest,
  CreateClaimRequest,
} from "@dependencies/interface/pro/ClaimsGateway";
import { mockClaims } from "@mock/pro/data/claims";

export class MockClaimsGateway implements ClaimsGateway {
  async getClaims({
    params,
  }: GetClaimsRequest): Promise<SmartGarantResponse<SmartGarantGrid<Claim>>> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const filteredClaims = mockClaims.filter(
      (claim) => claim.subscriptionId === params.subscriptionId,
    );

    return {
      error: {
        errorCode: "",
        message: "",
      },
      requestId: "mock-request-id",
      resultStats: filteredClaims.length,
      payload: {
        data: filteredClaims,
        rowCount: filteredClaims.length,
      },
    };
  }

  async getClaim({ params }: GetClaimRequest): Promise<SmartGarantResponse<Claim>> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const claim = mockClaims.find((c) => c.id === params.claimId);

    if (!claim) {
      return {
        error: {
          errorCode: "NOT_FOUND",
          message: "Sinistre non trouvé",
        },
        requestId: "mock-request-id",
        resultStats: 0,
        payload: {} as Claim,
      };
    }

    return {
      error: {
        errorCode: "",
        message: "",
      },
      requestId: "mock-request-id",
      resultStats: 1,
      payload: claim,
    };
  }
}
