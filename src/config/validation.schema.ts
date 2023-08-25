import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.string().default('8000'),
  API_KEY: Joi.string().required(),
});
