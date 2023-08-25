export interface BaseResponseType {
  status: number;
  total?: number | null;
  data: null | Record<string, any> | Error | undefined;
  error?: boolean;
}
