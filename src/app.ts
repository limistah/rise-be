import './config';
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { router } from './routes';
import { notFoundMW } from './middlewares/notfound';
import { errorMW } from './middlewares/error';
import { authMW } from './middlewares/auth';

process.on('uncaughtException', function (err) {
  console.error(new Date().toISOString() + ' uncaughtException:', err.message);
  console.error(err.stack);
  process.exit(1);
});
process.on('unhandledRejection', (result, error) => {
  process.exit(1);
});

// Initialize
const app: Application = express();

// Core Middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

// Application
app.disable('x-powered-by');
app.use(authMW);

app.use('/api/v1', router);
app.all('*', notFoundMW);
app.use(errorMW);

export { app };
