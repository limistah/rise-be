import request from 'supertest';

import { app } from '../src/app';
import { faker } from '@faker-js/faker';
import { randomRange } from './util';
const server = request(app);

describe('Comments Tests', () => {
  describe('POST /comments', () => {
    test('should return error if user does not exists', async () => {
      const errorRes = await server
        .post(`/api/v1/comments`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          userId: 34000,
          postId: 3200,
          content: faker.lorem.sentence(3),
        });
      expect(errorRes.status).toBe(400);
      expect(errorRes.body.data.errors[0].msg).toBe('user with id not found');
    });
    test('should return error if validation throws', async () => {
      const res = await server
        .post(`/api/v1/comments`)
        .set({
          'X-API-KEY': 'unknown',
        })
        .send({
          userId: 'some',
          postId: 'some',
          content: 'Lorem Ipsum',
        });

      expect(res.status).toBe(400);
      expect(res.body.data.errors[0].msg).toBe('Invalid value');
      expect(res.body.data.errors[0].path).toBe('userId');
    });
    test('should create a comment', async () => {
      const users = await server.get(`/api/v1/users`).set({
        'X-API-KEY': 'unknown',
      });
      expect(users.status).toBe(200);
      const user = users.body.data[randomRange(users.body.data.length)];

      const posts = await server.get(`/api/v1/posts`).set({
        'X-API-KEY': 'unknown',
      });
      expect(posts.status).toBe(200);
      const post = posts.body.data[randomRange(posts.body.data.length)];

      const res = await server
        .post(`/api/v1/comments`)
        .send({
          content: faker.lorem.sentence(20),
          userId: Number(user.id),
          postId: Number(post.id),
        })
        .set({
          'X-API-KEY': 'unknown',
        });

      expect(res.status).toBe(201);
    });
  });

  describe('GET /comments', () => {
    test('should GET comments successfully', async () => {
      const res = await server.get(`/api/v1/comments`).set({
        'X-API-KEY': 'unknown',
      });
      expect(res.status).toBe(200);
    });
  });
});
