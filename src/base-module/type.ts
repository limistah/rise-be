export interface BaseResponseType {
  status: number;
  total?: number | null;
  data: null | Record<string, any>;
  error: boolean;
}
