import { ApiRequest } from "@features/model/apiRequest";

export interface GetBordereauxParams {
  subscriptionId: string;
}

export interface GetBordereauParams {
  bordereauId: string;
}

export interface CreateBordereauData {
  subscriptionId: string;
  period: string;
  periodType: number;
  totalAmount: number;
  commissionsAmount: number;
  claimsAmount: number;
  rentalCount: number;
  comment?: string;
}

export type GetBordereauxRequest = ApiRequest<GetBordereauxParams, Record<string, never>>;
export type GetBordereauRequest = ApiRequest<GetBordereauParams, Record<string, never>>;
export type CreateBordereauRequest = ApiRequest<Record<string, never>, CreateBordereauData>;
