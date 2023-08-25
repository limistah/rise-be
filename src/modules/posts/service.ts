import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../base-module/service';

export class PostsService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async createPost(data: Prisma.PostsUncheckedCreateInput) {
    return await this.prisma.posts.create({ data: data });
  }

  async getPosts(take = 10, page = 0, query?: Prisma.PostsWhereInput) {
    return await this.prisma.posts.findMany({
      where: query,
      take,
      skip: take * page,
    });
  }

  async findOne(query: Prisma.PostsWhereInput) {
    return this.prisma.posts.findFirst({ where: query });
  }

  async getTotalPosts(query?: Prisma.PostsWhereInput) {
    return await this.prisma.posts.count({ where: query });
  }
}
