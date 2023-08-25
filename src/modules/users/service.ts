import { Prisma, PrismaClient } from '@prisma/client';

export class UsersService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data: Prisma.UsersCreateInput) {
    return await this.prisma.users.create({ data: data });
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
