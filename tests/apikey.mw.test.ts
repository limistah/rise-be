import request from 'supertest';

import { app } from '../src/app';

const server = request(app);

describe('auth middleware', () => {
  test('should throw if api key is invalid', async () => {
    const users = await server.get(`/api/v1/users`).set({
      'X-API-KEY': 'wrong',
    });
    expect(users.status).toBe(401);
    expect(users.body.data.message).toBe('Unauthorized request');
  });

  test('should throw if api key is invalid', async () => {
    const users = await server.get(`/api/v1/users`).set({
      'X-API-KEY': process.env.API_KEY,
    });
    expect(users.status).toBe(200);
  });
});
