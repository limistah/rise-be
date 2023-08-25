import { Application } from 'express';
import { router as userRouter } from './users/router';

const routers = [userRouter];

export const initializeModules = (app: Application) => {
  routers.map((router) => {
    app.use(router);
  });
};
