import { mockClaims } from "@mock/pro/data/claims";
import {
  ClaimsGateway,
  GetClaimsRequest,
  GetClaimByIdRequest,
  CreateClaimRequest,
} from "@features/pro/gli/Claims/api-claims";
import { SmartGarantResponse } from "@features/model/SmartGarantResponse";
import { Claim } from "@features/pro/gli/Claims/model/Claim";

export class MockClaimsGateway implements ClaimsGateway {
  async getClaims({ params }: GetClaimsRequest): Promise<SmartGarantResponse<Claim[]>> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    
    let filteredClaims = [...mockClaims];
    
    if (params.status) {
      filteredClaims = filteredClaims.filter(c => c.status === params.status);
    }
    
    if (params.type) {
      filteredClaims = filteredClaims.filter(c => c.type === params.type);
    }
    
    return {
      error: null,
      requestId: "mock-request-id",
      resultStats: filteredClaims.length,
      payload: filteredClaims,
    };
  }

  async getClaimById({ params }: GetClaimByIdRequest): Promise<SmartGarantResponse<Claim>> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    const claim = mockClaims.find(c => c.id === params.id);
    
    if (!claim) {
      return {
        error: {
          errorCode: "NOT_FOUND",
          message: "Claim not found",
        },
        requestId: "mock-request-id",
        resultStats: 0,
        payload: null as any,
      };
    }
    
    return {
      error: null,
      requestId: "mock-request-id",
      resultStats: 1,
      payload: claim,
    };
  }

  async createClaim({ data }: CreateClaimRequest): Promise<SmartGarantResponse<Claim>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const newClaim: Claim = {
      id: `claim-${Date.now()}`,
      subscriptionId: data.subscriptionId,
      tenantName: "Nouveau Locataire",
      propertyAddress: "Adresse en cours",
      type: data.type as any,
      status: "OPEN" as any,
      amount: data.amount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: data.description,
      documents: [],
    };
    
    return {
      error: null,
      requestId: "mock-request-id",
      resultStats: 1,
      payload: newClaim,
    };
  }
}
