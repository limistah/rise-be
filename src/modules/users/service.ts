import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../../base-module/prisma';

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

  async usersWithMostPosts() {
    const result = await this.prisma.$queryRaw<
      [
        {
          user_id: number;
          user_firstName: string;
          user_comment: string;
          comment_id: number;
          post_id: number;
          post_count: number;
        }
      ]
    >`
SELECT
    "U"."id" AS "user_id",
    "U"."firstName" AS "user_firstName",
    "C"."content" AS "user_comment",
    "C"."id" AS "comment_id",
    "P".id AS "post_id",
    COUNT("P"."id") AS "post_count"
FROM
    "Users" "U"
    
LEFT JOIN "Posts" "P" 
  ON "U"."id" = "P"."userId"

LEFT JOIN (
    SELECT "C1"."userId", "C1"."content", "C1".id 
    FROM "Comments" "C1" 
    INNER JOIN (
        SELECT "userId", MAX("createdAt") AS max_created_at
        FROM "Comments" 
        GROUP BY "userId"
    ) "C2" ON "C1"."createdAt" = "C2"."max_created_at" AND "C1"."userId" = "C2"."userId"
  ) "C"
  ON "U"."id" = "C"."userId"

GROUP BY "U".id, "C"."content", "C"."userId", "P".id, "C"."id"
ORDER BY "post_count" DESC LIMIT 3
`;

    return result.map((res) => {
      return {
        userId: res.user_id,
        comment: res.user_comment,
        postId: res.post_id,
        commentId: res.comment_id,
      };
    });
  }
}
