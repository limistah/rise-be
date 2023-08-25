import { Request, Response, Router } from 'express';
import { CommentsController } from './controller';
import { createCommentValidator, getCommentsValidator } from './validator';

const router = Router();
router.post('/', createCommentValidator(), (req: Request, res: Response) => {
  const controller = new CommentsController();
  return controller.createComment(req, res);
});
router.get('/', getCommentsValidator(), (req: Request, res: Response) => {
  const controller = new CommentsController();
  return controller.getComments(req, res);
});

const BASE_PATH = '/comments';
export { router, BASE_PATH };
