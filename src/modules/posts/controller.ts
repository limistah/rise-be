import { BaseController } from '../../base-module/controller';
import { BaseResponse } from '../../base-module/response';
import { Request, Response } from 'express';
import { PostsService } from './service';
import HTTP_STATUS from 'http-status';
import { validationResult } from 'express-validator';
import querystring from 'querystring';
import { UsersService } from '../users/service';
import { CommentsService } from '../comments/service';
import { ErrorException } from '../../exceptions/error';

export class PostsController extends BaseController {
  service: PostsService;
  usersService: UsersService;
  commentsService: CommentsService;

  constructor() {
    super();
    this.service = new PostsService();
    this.usersService = new UsersService();
    this.commentsService = new CommentsService();
  }

  public async createPost(req: Request, res: Response): Promise<Response> {
    try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.throw();
      }
      const user = await this.usersService.findOne({ id: req.body.userId });

      if (!user) {
        throw new ErrorException('user with id not found');
      }

      const post = await this.service.createPost({
        userId: req.body.userId,
        content: req.body.content,
      });

      const response = new BaseResponse(HTTP_STATUS.CREATED, post).get();
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

  public async getPostComments(req: Request, res: Response): Promise<Response> {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        result.throw();
      }

      const post = await this.service.findOne({
        id: Number(req.params.postId),
      });

      if (!post) {
        throw new ErrorException('post with id not found');
      }
      const qs = querystring.parse(req.url.split('?')[1]);
      const comments = await this.commentsService.getComments(
        Number(qs.take || 10),
        Number(qs.skip || 0),
        { postId: Number(req.params.postId) }
      );
      const totalComments = await this.commentsService.getTotalComments({
        postId: Number(req.params.postId),
      });
      const response = new BaseResponse(
        HTTP_STATUS.OK,
        comments,
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

  public async getPosts(req: Request, res: Response): Promise<Response> {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        result.throw();
      }
      const qs = querystring.parse(req.url.split('?')[1]);
      const Posts = await this.service.getPosts(
        Number(qs.take || 10),
        Number(qs.skip || 0)
      );
      const totalPosts = await this.service.getTotalPosts();
      const response = new BaseResponse(
        HTTP_STATUS.OK,
        Posts,
        totalPosts
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
