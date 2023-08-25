import { BaseResponseType } from './type';

export class BaseResponse {
  private error?: Error;
  private status: number;
  private total?: number | null;
  private data: Record<string, any> | null;
  constructor(
    status: number,
    data: Record<string, any> | null,
    total?: number | null,
    error?: Error
  ) {
    this.data = data;
    this.error = error;
    this.total = total;
    this.status = status;
  }
  get(): BaseResponseType {
    return {
      error: !!this.error,
      data: this.data || this.error,
      total: this.total ?? undefined,

      status: this.status,
    };
  }
}
