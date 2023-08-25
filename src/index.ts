import { app } from './app';
import { config } from './config';

// Bootstrap
export const server = app.listen(config.PORT, () => {
  console.log('Server is running on port', config.PORT);
});
