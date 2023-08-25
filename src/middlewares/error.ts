import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http';

export const errorMW = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(err.status).send({
    error: true,
    data: {
      message: err.message,
    },
  });
};
