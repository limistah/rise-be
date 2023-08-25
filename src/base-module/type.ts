export interface BaseResponseType {
  status: number;
  data?: Record<string, any>;
  error: boolean;
}
