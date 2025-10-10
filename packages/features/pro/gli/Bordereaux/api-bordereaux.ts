import { ApiService } from "@lib/axios/ApiService";
import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Bordereau } from "./model/Bordereau";
import {
  BordereauxGateway,
  GetBordereauxRequest,
  GetBordereauRequest,
  CreateBordereauRequest,
} from "@dependencies/interface/pro/BordereauxGateway";

export class ApiBordereauxGateway implements BordereauxGateway {
  constructor(private apiService: ApiService) {}

  async getBordereaux({
    params,
  }: GetBordereauxRequest): Promise<SmartGarantResponse<SmartGarantGrid<Bordereau>>> {
    return this.apiService.get(
      `/v1/gli/subscriptions/${params.subscriptionId}/bordereaux`
    );
  }

  async getBordereau({
    params,
  }: GetBordereauRequest): Promise<SmartGarantResponse<Bordereau>> {
    return this.apiService.get(`/v1/gli/bordereaux/${params.bordereauId}`);
  }

  async createBordereau({
    data,
  }: CreateBordereauRequest): Promise<SmartGarantResponse<Bordereau>> {
    return this.apiService.post(`/v1/gli/bordereaux`, data);
  }
}

export type { BordereauxGateway };
