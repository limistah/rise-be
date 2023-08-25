import { BaseController } from '../../base-module/controller';
import { BaseResponse } from '../../base-module/response';
import { Request, Response } from 'express';
import { CommentsService } from './service';
import HTTP_STATUS from 'http-status';
import { validationResult } from 'express-validator';
import querystring from 'querystring';
import { UsersService } from '../users/service';
import { PostsService } from '../posts/service';
import { ErrorException } from '../../exceptions/error';

export class CommentsController extends BaseController {
  service: CommentsService;
  usersService: UsersService;
  postsService: PostsService;

  constructor() {
    super();
    this.service = new CommentsService();
    this.usersService = new UsersService();
    this.postsService = new PostsService();
  }

  public async createComment(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        result.throw();
      }
      const user = await this.usersService.findOne({
        id: req.body.userId,
      });
      if (!user) {
        throw new ErrorException('user with id not found');
      }

      const post = await this.postsService.findOne({
        id: req.body.postId,
      });
      if (!post) {
        throw new ErrorException('post with id not found');
      }

      const comment = await this.service.createComment({
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content,
      });

      const response = new BaseResponse(HTTP_STATUS.CREATED, comment).get();
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

  public async getComments(req: Request, res: Response) {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        result.throw();
      }
      const qs = querystring.parse(req.url.split('?')[1]);
      const Comments = await this.service.getComments(
        Number(qs.take || 10),
        Number(qs.skip || 0)
      );
      const totalComments = await this.service.getTotalComments();
      const response = new BaseResponse(
        HTTP_STATUS.OK,
        Comments,
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
}
