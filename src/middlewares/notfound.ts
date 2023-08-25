import HTTP_STATUS from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../base-module/response';

export const notFoundMW = (req: Request, res: Response, next: NextFunction) => {
  const response = new BaseResponse(HTTP_STATUS.NOT_FOUND, {
    message: `${req.originalUrl} not found`,
  }).get();
  return res.status(response.status).json(response);
};
