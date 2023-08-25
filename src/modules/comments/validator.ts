import { check } from 'express-validator';

export const createCommentValidator = () => {
  return [
    check('userId').isNumeric().notEmpty(),
    check('postId').isNumeric().notEmpty(),
    check('content').notEmpty(),
  ];
};

export const getCommentsValidator = () => {
  return [];
};
