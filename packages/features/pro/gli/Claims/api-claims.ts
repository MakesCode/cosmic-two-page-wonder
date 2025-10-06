import { ApiService } from "@lib/axios/ApiService";
import { SmartGarantResponse } from "@features/model/SmartGarantResponse";
import { Claim } from "./model/Claim";
import { GetClaimsRequest, GetClaimByIdRequest, CreateClaimRequest } from "./model/request";

export interface ClaimsGateway {
  getClaims(request: GetClaimsRequest): Promise<SmartGarantResponse<Claim[]>>;
  getClaimById(request: GetClaimByIdRequest): Promise<SmartGarantResponse<Claim>>;
  createClaim(request: CreateClaimRequest): Promise<SmartGarantResponse<Claim>>;
}

export class ApiClaimsGateway implements ClaimsGateway {
  constructor(private apiService: ApiService) {}

  async getClaims({ params }: GetClaimsRequest): Promise<SmartGarantResponse<Claim[]>> {
    return this.apiService.get("/api/claims", { params });
  }

  async getClaimById({ params }: GetClaimByIdRequest): Promise<SmartGarantResponse<Claim>> {
    return this.apiService.get(`/api/claims/${params.id}`);
  }

  async createClaim({ data }: CreateClaimRequest): Promise<SmartGarantResponse<Claim>> {
    return this.apiService.post("/api/claims", data);
  }
}
