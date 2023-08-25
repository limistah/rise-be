import { Router } from 'express';
import * as usersRouter from '../modules/users/router';
import * as postsRouter from '../modules/posts/router';
import * as commentsRouter from '../modules/comments/router';
const router = Router();

const moduleRouters = [usersRouter, postsRouter, commentsRouter];

moduleRouters.forEach((moduleRouter) =>
  router.use(moduleRouter.BASE_PATH, moduleRouter.router)
);

export { router };
