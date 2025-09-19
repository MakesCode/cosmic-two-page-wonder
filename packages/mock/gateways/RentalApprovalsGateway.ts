import { ApiResponse, PaginatedResponse } from '../interfaces/gateways';
import { RentalApproval } from '../types';
import { getRentalApprovalsPage, mockRentalApprovals } from '../data/rentalApprovals';

export interface RentalApprovalsGateway {
  getRentalApprovals(params: {
    subscriptionId?: string;
    search?: string;
    status?: number;
    groupe?: number;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PaginatedResponse<RentalApproval>>>;
  archiveRentalApproval(id: string): Promise<ApiResponse<void>>;
}

export class MockRentalApprovalsGateway implements RentalApprovalsGateway {
  async getRentalApprovals(params: {
    subscriptionId?: string;
    search?: string;
    status?: number;
    groupe?: number;
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<PaginatedResponse<RentalApproval>>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const { page = 0, pageSize = 10, search, status, groupe } = params;
    
    const result = getRentalApprovalsPage(page, pageSize, { search, status, groupe });
    
    return {
      payload: result,
      success: true,
      message: 'Rental approvals retrieved successfully',
    };
  }

  async archiveRentalApproval(id: string): Promise<ApiResponse<void>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const rentalApproval = mockRentalApprovals.find(ra => ra.id === id);
    if (rentalApproval) {
      rentalApproval.isArchived = !rentalApproval.isArchived;
    }
    
    return {
      payload: undefined,
      success: true,
      message: `Rental approval ${rentalApproval?.isArchived ? 'archived' : 'unarchived'} successfully`,
    };
  }
}
