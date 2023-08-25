import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();
import { initializeModules } from './modules';
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
initializeModules(app);
app.all('*', notFoundMW);
app.use(errorMW);

// Bootstrap
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
