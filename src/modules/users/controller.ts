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
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const response = new BaseResponse(
          HTTP_STATUS.BAD_REQUEST,
          null,
          null,
          result.array()
        ).get();
        return res.status(response.status).json(response);
      }

      const user = await this.service.createUser({
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        gender: req.body.gender,
      });

      const response = new BaseResponse(201, user).get();
      return res.status(response.status).json(response);
    } catch (error) {
      const response = new BaseResponse(400, null, null, error).get();
      return res.status(response.status).json(response);
    }
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const response = new BaseResponse(HTTP_STATUS.BAD_REQUEST, {
          errors: result.array(),
        }).get();
        return res.status(response.status).json(response);
      }
      const qs = querystring.parse(req.url.split('?')[1]);
      const users = await this.service.getUsers(
        Number(qs.take || 10),
        Number(qs.skip || 0)
      );
      const totalUsers = await this.service.getTotalUsers();
      const response = new BaseResponse(200, users, totalUsers).get();
      return res.status(response.status).json(response);
    } catch (error) {
      const response = new BaseResponse(400, null, null, error).get();
      return res.status(response.status).json(response);
    }
  }
}
