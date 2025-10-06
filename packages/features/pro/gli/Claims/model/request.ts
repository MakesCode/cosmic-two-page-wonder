export interface GetClaimsRequest {
  params: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
  };
}

export interface GetClaimByIdRequest {
  params: {
    id: string;
  };
}

export interface CreateClaimRequest {
  data: {
    subscriptionId: string;
    type: string;
    amount: number;
    description: string;
  };
}
