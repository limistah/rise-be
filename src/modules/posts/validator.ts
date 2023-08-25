import { check, param } from 'express-validator';

export const createPostValidator = () => {
  return [check('userId').isNumeric().notEmpty(), check('content').notEmpty()];
};

export const getPostsValidator = () => {
  return [];
};

export const getUserPostsValidator = () => {
  return [param('userId').isNumeric().notEmpty()];
};
