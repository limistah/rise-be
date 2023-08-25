import { Router } from 'express';
import { UsersController } from './controller';
import { createUserValidator } from './validator';

const router = Router();
const controller = new UsersController();

router.post('/users', createUserValidator, controller.createUser);

export { router };
