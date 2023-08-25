import { BaseService } from '../../base-module/service';
import { Prisma } from '@prisma/client';

export class UsersService extends BaseService {
  constructor() {
    super();
  }

  async createUser(data: Prisma.UsersCreateInput) {
    return this.prisma.users.create({ data: data });
  }

  async getUsers(take = '10', page = '0', query?: Prisma.UsersWhereInput) {
    return this.prisma.users.findMany({
      where: query,
      take: Number(take),
      skip: Number(take) * Number(page),
    });
  }
}
