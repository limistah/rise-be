import HTTP_STATUS from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { BaseResponse } from '../base-module/response';
import { config } from '../config';

export const authMW = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['x-api-key'] !== config.API_KEY) {
    const response = new BaseResponse(HTTP_STATUS.UNAUTHORIZED, {
      message: `Unauthorized request`,
    }).get();
    return res.status(response.status).json(response);
  }
  next();
};
