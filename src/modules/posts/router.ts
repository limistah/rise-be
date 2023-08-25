import { NextFunction, Request, Response, Router } from 'express';
import { PostsController } from './controller';
import { createPostValidator, getPostsValidator } from './validator';

const router = Router();
router.post('/', createPostValidator(), (req: Request, res: Response) => {
  const controller = new PostsController();
  return controller.createPost(req, res);
});
router.get('/', getPostsValidator(), (req: Request, res: Response) => {
  const controller = new PostsController();
  return controller.getPosts(req, res);
});

router.get(
  '/:postId/comments',
  getPostsValidator(),
  (req: Request, res: Response) => {
    const controller = new PostsController();
    return controller.getPostComments(req, res);
  }
);
const BASE_PATH = '/posts';
export { router, BASE_PATH };
