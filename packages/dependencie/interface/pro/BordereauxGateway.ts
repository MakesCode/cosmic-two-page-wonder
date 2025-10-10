import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Bordereau } from "@features/pro/gli/Bordereaux/model/Bordereau";
import {
  GetBordereauxRequest,
  GetBordereauRequest,
  CreateBordereauRequest,
} from "@features/pro/gli/Bordereaux/model/request";

export interface BordereauxGateway {
  getBordereaux(request: GetBordereauxRequest): Promise<SmartGarantResponse<SmartGarantGrid<Bordereau>>>;
  getBordereau(request: GetBordereauRequest): Promise<SmartGarantResponse<Bordereau>>;
  createBordereau(request: CreateBordereauRequest): Promise<SmartGarantResponse<Bordereau>>;
}

export type { GetBordereauxRequest, GetBordereauRequest, CreateBordereauRequest };
