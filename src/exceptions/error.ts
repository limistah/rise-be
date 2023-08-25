interface IErrorMsg {
  msg: string;
}
type Errors = [IErrorMsg];

export class ErrorException {
  errors: Errors;
  constructor(message: string) {
    this.errors = [{ msg: message }];
  }
}
