import { Router } from 'express';
import * as usersRouter from '../modules/users/router';
const router = Router();

const moduleRouters = [usersRouter];

moduleRouters.forEach((moduleRouter) =>
  router.use(moduleRouter.BASE_PATH, moduleRouter.router)
);

export { router };
