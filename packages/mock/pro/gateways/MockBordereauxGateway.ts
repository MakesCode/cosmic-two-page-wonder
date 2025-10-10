import { mockBordereaux } from "@mock/pro/data/bordereaux";
import {
  BordereauxGateway,
  GetBordereauxRequest,
  GetBordereauRequest,
  CreateBordereauRequest,
} from "@dependencies/interface/pro/BordereauxGateway";
import { SmartGarantResponse, SmartGarantGrid } from "@features/model/SmartGarantResponse";
import { Bordereau, BordereauStatus } from "@features/pro/gli/Bordereaux/model/Bordereau";

export class MockBordereauxGateway implements BordereauxGateway {
  async getBordereaux({
    params,
  }: GetBordereauxRequest): Promise<SmartGarantResponse<SmartGarantGrid<Bordereau>>> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const filteredBordereaux = mockBordereaux.filter(
      (b) => b.subscriptionId === params.subscriptionId
    );

    return {
      requestId: "mock-request-id",
      payload: {
        data: filteredBordereaux,
        rowCount: filteredBordereaux.length,
      },
      error: {
        errorCode: "",
        message: "",
      },
      resultStats: filteredBordereaux.length,
    };
  }

  async getBordereau({
    params,
  }: GetBordereauRequest): Promise<SmartGarantResponse<Bordereau>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const bordereau = mockBordereaux.find((b) => b.id === params.bordereauId);

    if (!bordereau) {
      throw new Error(`Bordereau ${params.bordereauId} not found`);
    }

    return {
      requestId: "mock-request-id",
      payload: bordereau,
      error: {
        errorCode: "",
        message: "",
      },
      resultStats: 1,
    };
  }

  async createBordereau({
    data,
  }: CreateBordereauRequest): Promise<SmartGarantResponse<Bordereau>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newBordereau: Bordereau = {
      id: `BOR-${Date.now()}`,
      subscriptionId: data.subscriptionId,
      reference: `BOR-${Date.now()}`,
      period: data.period,
      periodType: data.periodType,
      status: BordereauStatus.DRAFT,
      totalAmount: data.totalAmount,
      commissionsAmount: data.commissionsAmount,
      claimsAmount: data.claimsAmount,
      rentalCount: data.rentalCount,
      createdAt: new Date().toISOString(),
      comment: data.comment,
    };

    mockBordereaux.unshift(newBordereau);

    return {
      requestId: "mock-request-id",
      payload: newBordereau,
      error: {
        errorCode: "",
        message: "",
      },
      resultStats: 1,
    };
  }
}
