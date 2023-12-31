import { NextFunction, Request, Response, Router } from 'express';
import { UsersController } from './controller';
import { createUserValidator } from './validator';
import { getUserPostsValidator } from '../posts/validator';

const router = Router();
router.post('/', createUserValidator(), (req: Request, res: Response) => {
  const controller = new UsersController();
  return controller.createUser(req, res);
});
router.get('/', (req: Request, res: Response) => {
  const controller = new UsersController();
  return controller.getUsers(req, res);
});

router.get(
  '/:userId/posts',
  getUserPostsValidator(),
  (req: Request, res: Response) => {
    const controller = new UsersController();
    return controller.getUserPosts(req, res);
  }
);


router.get('/most-posts', (req: Request, res: Response) => {
  const controller = new UsersController();
  return controller.getUserWithMostPosts(req, res);
});

const BASE_PATH = '/users';
export { router, BASE_PATH };
