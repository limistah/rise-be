import { BaseResponseType } from './type';

export class BaseResponse {
  private error: boolean;
  private status: number;
  private data: Record<string, any> | undefined;
  constructor(status: number, data?: Record<string, any>) {
    this.data = data;
    this.error = status < 200 || status >= 400;
    this.status = status;
  }
  get(): BaseResponseType {
    return {
      error: this.error,
      data: this.data,
      status: this.status,
    };
  }
}
