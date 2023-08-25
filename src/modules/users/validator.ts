import { check } from 'express-validator';

export const createUserValidator = () => {
  return [
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('gender').optional().isIn(['Male', 'Female', 'None']),
  ];
};

export const getUsersValidator = () => {
  return [];
};
