import { BaseController } from '../../base-module/controller';
import { BaseResponse } from '../../base-module/response';
import { Request, Response } from 'express';
import { PostsService } from './service';
import HTTP_STATUS from 'http-status';
import { validationResult } from 'express-validator';
import querystring from 'querystring';
import { UsersService } from '../users/service';

export class PostsController extends BaseController {
  service: PostsService;
  usersService: UsersService;

  constructor() {
    super();
    this.service = new PostsService();
    this.usersService = new UsersService();
  }

  public async createPost(req: Request, res: Response) {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.throw();
      }
      const user = await this.usersService.findOne({ id: req.body.userId });

      if (!user) {
        throw {
          errors: [
            {
              msg: 'user with id not found',
            },
          ],
        };
      }

      const post = await this.service.createPost({
        userId: req.body.userId,
        content: req.body.content,
      });

      const response = new BaseResponse(201, post).get();
      return res.status(response.status).json(response);
    } catch (error) {
      const response = new BaseResponse(400, null, null, error as Error).get();
      return res.status(response.status).json(response);
    }
  }

  public async getPosts(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const response = new BaseResponse(HTTP_STATUS.BAD_REQUEST, {
          errors: result.array(),
        }).get();
        return res.status(response.status).json(response);
      }
      const qs = querystring.parse(req.url.split('?')[1]);
      const Posts = await this.service.getPosts(
        Number(qs.take || 10),
        Number(qs.skip || 0)
      );
      const totalPosts = await this.service.getTotalPosts();
      const response = new BaseResponse(200, Posts, totalPosts).get();
      return res.status(response.status).json(response);
    } catch (error) {
      const response = new BaseResponse(400, null, null, error as Error).get();
      return res.status(response.status).json(response);
    }
  }
}
