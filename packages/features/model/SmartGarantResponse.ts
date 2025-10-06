export interface SmartGarantResponse<T> {
  requestId: string;
  payload: T;
  error: SmartGarantErrorResponse;
  resultStats: number;
}
export interface SmartGarantGrid<T> {
  data: Array<T>;
  rowCount: number;
}
export interface SmartGarantErrorResponse {
  errorCode: string;
  message: string;
}
