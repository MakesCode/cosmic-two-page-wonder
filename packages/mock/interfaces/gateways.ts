export interface ApiResponse<T> {
  payload: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

