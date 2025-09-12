import { RentalApproval } from '../types';

export const mockRentalApprovals: RentalApproval[] = [
  {
    id: 'ra-001',
    references: { rentalApprovalRef: 'REF-2024-001' },
    owners: [
      {
        id: 'owner-001',
        naturalEntity: {
          firstName: 'Jean',
          lastName: 'Dupont',
        },
      },
    ],
    tenants: [
      {
        id: 'tenant-001',
        tenant: {
          naturalEntity: {
            firstName: 'Marie',
            lastName: 'Martin',
          },
        },
      },
    ],
    realEstateLot: {
      address: {
        fullAddress: '123 Rue de la Paix, 75001 Paris, France',
      },
    },
    createDate: '2024-01-15T10:00:00Z',
    businessData: {
      rentAmount: 1200.00,
    },
    status: 2,
    isArchived: false,
  },
  {
    id: 'ra-002',
    references: { rentalApprovalRef: 'REF-2024-002' },
    owners: [
      {
        id: 'owner-002',
        legalEntity: {
          name: 'Immobilier SAS',
        },
      },
    ],
    tenants: [
      {
        id: 'tenant-002',
        tenant: {
          naturalEntity: {
            firstName: 'Pierre',
            lastName: 'Bernard',
          },
        },
      },
    ],
    realEstateLot: {
      address: {
        fullAddress: '456 Avenue des Champs-Élysées, 75008 Paris, France',
      },
    },
    createDate: '2024-02-01T14:30:00Z',
    businessData: {
      rentAmount: 1800.00,
    },
    status: 1,
    isArchived: false,
  },
  {
    id: 'ra-003',
    references: { rentalApprovalRef: 'REF-2024-003' },
    owners: [
      {
        id: 'owner-003',
        naturalEntity: {
          firstName: 'Sophie',
          lastName: 'Leblanc',
        },
      },
    ],
    tenants: [
      {
        id: 'tenant-003',
        tenant: {
          legalEntity: {
            name: 'Startup Innovante SARL',
          },
        },
      },
    ],
    realEstateLot: {
      address: {
        fullAddress: '789 Boulevard Saint-Germain, 75006 Paris, France',
      },
    },
    createDate: '2024-02-15T09:15:00Z',
    businessData: {
      rentAmount: 2200.00,
    },
    status: 4,
    isArchived: false,
  },
];

export const getRentalApprovalsPage = (
  page: number = 0,
  pageSize: number = 10,
  filters?: {
    search?: string;
    status?: number;
    groupe?: number;
  }
) => {
  let filteredData = [...mockRentalApprovals];

  // Apply filters
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.references.rentalApprovalRef.toLowerCase().includes(searchLower) ||
        item.realEstateLot.address.fullAddress.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.status !== undefined) {
    filteredData = filteredData.filter((item) => item.status === filters.status);
  }

  if (filters?.groupe !== undefined) {
    // Mock group filtering logic
    if (filters.groupe === 1) {
      filteredData = filteredData.filter((item) => !item.isArchived);
    } else if (filters.groupe === 3) {
      filteredData = filteredData.filter((item) => item.isArchived);
    }
  }

  const totalCount = filteredData.length;
  const pageCount = Math.ceil(totalCount / pageSize);
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const data = filteredData.slice(startIndex, endIndex);

  return {
    data,
    totalCount,
    pageCount,
    hasNextPage: page < pageCount - 1,
    hasPreviousPage: page > 0,
  };
};
