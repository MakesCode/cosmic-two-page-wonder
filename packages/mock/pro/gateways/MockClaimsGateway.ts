import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Claim } from "@features/pro/gli/Claims/model/Claim";
import { GetClaimsRequest, GetClaimByIdRequest } from "@features/pro/gli/Claims/model/request";
import { ClaimsGateway } from "@dependencies/interface/pro/ClaimsGateway";
import { mockClaimsData } from "@mock/pro/data/claims";

export class MockClaimsGateway implements ClaimsGateway {
  async getClaims({ params }: GetClaimsRequest): Promise<SmartGarantResponse<SmartGarantGrid<Claim>>> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return {
      error: {
        errorCode: "",
        message: "",
      },
      requestId: "mock-request-id",
      resultStats: mockClaimsData.length,
      payload: {
        data: mockClaimsData,
        rowCount: mockClaimsData.length,
      },
    };
  }

  async getClaimById({ params }: GetClaimByIdRequest): Promise<SmartGarantResponse<Claim>> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const claim = mockClaimsData.find((c) => c.id === params.claimId);

    if (!claim) {
      throw new Error("Claim not found");
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
