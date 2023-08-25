import { BaseResponseType } from './type';

export class BaseResponse {
  private error: boolean;
  private status: number;
  private total?: number | null;
  private data: Record<string, any> | null;
  constructor(
    status: number,
    data: Record<string, any> | null,
    total?: number | null,
    error?: any
  ) {
    this.data = data;
    this.error = error;
    this.total = total;
    this.status = status;
  }
  get(): BaseResponseType {
    return {
      error: this.error,
      data: this.data,
      total: this.total,
      status: this.status,
    };
  }
}
