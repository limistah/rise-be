import { Router } from 'express';
import * as usersRouter from '../modules/users/router';
import * as postsRouter from '../modules/posts/router';
const router = Router();

const moduleRouters = [usersRouter, postsRouter];

moduleRouters.forEach((moduleRouter) =>
  router.use(moduleRouter.BASE_PATH, moduleRouter.router)
);

export { router };
