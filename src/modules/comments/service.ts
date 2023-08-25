import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../base-module/prisma';

export class CommentsService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async createComment(data: Prisma.CommentsUncheckedCreateInput) {
    return await this.prisma.comments.create({ data: data });
  }

  async getComments(take = 10, page = 0, query?: Prisma.CommentsWhereInput) {
    return await this.prisma.comments.findMany({
      where: query,
      take,
      skip: take * page,
    });
  }

  async getTotalComments(query?: Prisma.CommentsWhereInput) {
    return await this.prisma.comments.count({ where: query });
  }
}
