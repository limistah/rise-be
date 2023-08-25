import { BaseController } from '../../base-module/controller';
import { BaseResponse } from '../../base-module/response';
import { Request, Response } from 'express';
import { UsersService } from './service';
import HTTP_STATUS from 'http-status';
import { validationResult } from 'express-validator';
import querystring from 'querystring';
import { PostsService } from '../posts/service';

export class UsersController extends BaseController {
  service: UsersService;
  postsService: PostsService;
  constructor() {
    super();
    this.service = new UsersService();
    this.postsService = new PostsService();
  }

  public async createUser(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        result.throw();
      }

      const userExists = await this.service.findOne({ email: req.body.email });
      if (userExists) {
        throw {
          errors: [
            {
              msg: 'user with email already exists',
            },
          ],
        };
      }
      const user = await this.service.createUser({
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.email,
        gender: req.body.gender,
      });

      const response = new BaseResponse(HTTP_STATUS.CREATED, user).get();
      return res.status(response.status).json(response);
    } catch (error) {
      const response = new BaseResponse(
        HTTP_STATUS.BAD_REQUEST,
        null,
        null,
        error as Error
      ).get();
      return res.status(response.status).json(response);
    }
  }

  public async getUserPosts(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        result.throw();
      }

      const user = await this.service.findOne({
        id: Number(req.params.userId),
      });

      if (!user) {
        throw {
          errors: [
            {
              msg: 'user with id not found',
            },
          ],
        };
      }
      const qs = querystring.parse(req.url.split('?')[1]);
      const posts = await this.postsService.getPosts(
        Number(qs.take || 10),
        Number(qs.skip || 0),
        { userId: Number(req.params.userId) }
      );
      const totalComments = await this.postsService.getTotalPosts({
        userId: Number(req.params.userId),
      });
      const response = new BaseResponse(
        HTTP_STATUS.OK,
        posts,
        totalComments
      ).get();
      return res.status(response.status).json(response);
    } catch (error) {
      const response = new BaseResponse(
        HTTP_STATUS.BAD_REQUEST,
        null,
        null,
        error as Error
      ).get();
      return res.status(response.status).json(response);
    }
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        result.throw();
      }
      const qs = querystring.parse(req.url.split('?')[1]);
      const users = await this.service.getUsers(
        Number(qs.take || 10),
        Number(qs.skip || 0)
      );
      const totalUsers = await this.service.getTotalUsers();
      const response = new BaseResponse(
        HTTP_STATUS.OK,
        users,
        totalUsers
      ).get();
      return res.status(response.status).json(response);
    } catch (error) {
      const response = new BaseResponse(
        HTTP_STATUS.BAD_REQUEST,
        null,
        null,
        error as Error
      ).get();
      return res.status(response.status).json(response);
    }
  }
}
