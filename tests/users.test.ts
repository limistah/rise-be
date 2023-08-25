import request from 'supertest';

import { app } from '../src/app';

const server = request(app);

describe('Users Tests', () => {
  describe('POST /users', () => {
    test('should return error if validation throws', async () => {
      const res = await server
        .post(`/api/v1/users`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          firstName: 'Aleem',
          lastName: 'Isiaka',
          gender: 'Male',
        });

      expect(res.status).toBe(400);
      expect(res.body.error[0].msg).toBe('Invalid value');
      expect(res.body.error[0].path).toBe('gender');
    });
    test('should create a user', async () => {
      const res = await server
        .post(`/api/v1/users`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          firstName: 'Aleem',
          lastName: 'Isiaka',
          gender: 'MALE',
        });
      expect(res.status).toBe(201);
    });
  });

  describe('GET /users', () => {
    test('should GET users successfully', async () => {
      const res = await server.get(`/api/v1/users`).set({
        'X-API-KEY': 'unknown',
      });
      expect(res.status).toBe(200);
    });
  });
});
