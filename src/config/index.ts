import { config } from 'dotenv';
import { validationSchema } from './validation.schema';
import { getEnvFileName } from './get-env';

config({ path: getEnvFileName() });

const validationResult = validationSchema.validate(process.env, {
  allowUnknown: true,
});

if (validationResult.error) {
  throw new Error(validationResult.error.details[0].message);
}

export { config } from './config';
