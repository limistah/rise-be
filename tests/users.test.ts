import request from 'supertest';

import { app } from '../src/app';
import { faker } from '@faker-js/faker';
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
          email: 'aleemisiaka@gmail.com',
        });

      expect(res.status).toBe(400);
      expect(res.body.data.errors[0].msg).toBe('Invalid value');
      expect(res.body.data.errors[0].path).toBe('gender');
    });
    test('should return error if email exists', async () => {
      const email = faker.internet.email();
      const res = await server
        .post(`/api/v1/users`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          gender: 'MALE',
          email: email,
        });

      expect(res.status).toBe(201);

      const errorRes = await server
        .post(`/api/v1/users`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          gender: 'MALE',
          email: email,
        });

      expect(errorRes.body.data.errors[0].msg).toBe(
        'user with email already exists'
      );
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
          email: faker.internet.email(),
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
