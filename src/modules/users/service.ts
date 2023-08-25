import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../base-module/service';

export class UsersService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async createUser(data: Prisma.UsersCreateInput) {
    return await this.prisma.users.create({ data: data });
  }

  async findOne(query: Prisma.UsersWhereInput) {
    return this.prisma.users.findFirst({ where: query });
  }

  async getUsers(take = 10, page = 0, query?: Prisma.UsersWhereInput) {
    return await this.prisma.users.findMany({
      where: query,
      take,
      skip: take * page,
    });
  }

  async getTotalUsers(query?: Prisma.UsersWhereInput) {
    return await this.prisma.users.count({ where: query });
  }
}
