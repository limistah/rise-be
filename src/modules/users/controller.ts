import { BaseController } from '../../base-module/controller';
import { BaseResponse } from '../../base-module/response';
import { Request, Response } from 'express';
import { UsersService } from './service';
import HTTP_STATUS from 'http-status';
import { validationResult } from 'express-validator';
import querystring from 'querystring';

export class UsersController extends BaseController {
  service: UsersService;
  constructor() {
    super();
    this.service = new UsersService();
  }

  public async createUser(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty) {
      const response = new BaseResponse(HTTP_STATUS.BAD_REQUEST, {
        errors: result.array(),
      }).get();
      return res.status(response.status).json(response);
    }
    const user = await this.service.createUser({
      firstName: req.body.firstName,
      lastName: req.body.firstName,
      gender: req.body.gender,
    });
    const response = new BaseResponse(200, user).get();
    return res.status(response.status).json(response);
  }

  public async getUsers(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty) {
      const response = new BaseResponse(HTTP_STATUS.BAD_REQUEST, {
        errors: result.array(),
      }).get();
      return res.status(response.status).json(response);
    }
    const qs = querystring.parse(req.originalUrl);
    const users = await this.service.getUsers(String(qs.take), String(qs.skip));
    const response = new BaseResponse(200, users).get();
    return res.status(response.status).json(response);
  }
}
