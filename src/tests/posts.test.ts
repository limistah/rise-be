import request from 'supertest';

import { app } from '../app';
import { faker } from '@faker-js/faker';
import { randomRange } from './util';
const server = request(app);

describe('Posts Tests', () => {
  describe('POST /posts', () => {
    test('should return error if user does not exists', async () => {
      const errorRes = await server
        .post(`/api/v1/posts`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          userId: 34000,
          content: faker.lorem.sentence(3),
        });

      expect(errorRes.body.data.errors[0].msg).toBe('user with id not found');
    });
    test('should return error if validation throws', async () => {
      const res = await server
        .post(`/api/v1/posts`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          userId: 'some',
          content: 'Lorem Ipsum',
        });

      expect(res.status).toBe(400);
      expect(res.body.data.errors[0].msg).toBe('Invalid value');
      expect(res.body.data.errors[0].path).toBe('userId');
    });
    test('should create a post', async () => {
      const user = await server
        .post(`/api/v1/users`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          gender: 'MALE',
          email: faker.internet.email(),
        });
      const res = await server
        .post(`/api/v1/posts`)
        .send({
          content: faker.lorem.sentence(20),
          userId: Number(user.body.data.id),
        })
        .set({
          'X-API-KEY': 'unknown',
        });
      expect(res.status).toBe(201);
    });
  });

  describe('GET /posts', () => {
    test('should GET posts successfully', async () => {
      const res = await server.get(`/api/v1/posts`).set({
        'X-API-KEY': 'unknown',
      });
      expect(res.status).toBe(200);
    });
  });

  describe('GET /posts/:postId/comments', () => {
    test('should return error for an invalid postId', async () => {
      const res = await server.get(`/api/v1/posts/${3200}/comments`).set({
        'X-API-KEY': 'unknown',
      });
      expect(res.status).toBe(400);
      expect(res.body.data.errors[0].msg).toBe('post with id not found');
    });
    test('should get comments for a valid postId', async () => {
      const posts = await server.get(`/api/v1/posts`).set({
        'X-API-KEY': 'unknown',
      });
      expect(posts.status).toBe(200);
      const post = posts.body.data[randomRange(posts.body.data.length)];
      const res = await server.get(`/api/v1/posts/${post.id}/comments`).set({
        'X-API-KEY': 'unknown',
      });
      expect(res.status).toBe(200);
    });
  });
});
