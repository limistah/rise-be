import { app } from './app';

// Bootstrap
const PORT = process.env.PORT || 8000;
export const server = app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
