import { Prisma, PrismaClient, Users } from '@prisma/client';
import { prisma } from '../../base-module/prisma';
interface IDBUserWithMostPosts {
  user_id: number;
  user_firstName: string;
  user_comment: string;
  comment_id: number;
  post_id: number;
  post_count?: number;
}

export interface IUserWithMostPosts {
  userId: number;
  firstName: string;
  comment: string;
  commentId: number;
  postId: number;
}
export class UsersService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    return await this.prisma.users.create({ data: data });
  }

  async findOne(query: Prisma.UsersWhereInput): Promise<Users | null> {
    return await this.prisma.users.findFirst({ where: query });
  }

  async getUsers(
    take = 10,
    page = 0,
    query?: Prisma.UsersWhereInput
  ): Promise<Users[]> {
    return await this.prisma.users.findMany({
      where: query,
      take,
      skip: take * page,
    });
  }

  async getTotalUsers(query?: Prisma.UsersWhereInput): Promise<number> {
    return await this.prisma.users.count({ where: query });
  }

  async usersWithMostPosts(): Promise<IUserWithMostPosts[]> {
    const result = await this.prisma.$queryRaw<IDBUserWithMostPosts[]>`
SELECT
    "U"."id" AS "user_id",
    "U"."firstName" AS "user_firstName",
    "C"."content" AS "user_comment",
    "C"."id" AS "comment_id",
    "P".id AS "post_id",
    COUNT("P"."id") AS "post_count"
FROM
    "Users" "U"
    
JOIN (
    SELECT
        "id", "userId"
    FROM
        "Posts"
) "P" ON "U"."id" = "P"."userId"

LEFT JOIN (
    SELECT "C1"."userId", "C1"."content", "C1".id 
    FROM "Comments" "C1" 
    JOIN (
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
        firstName: res.user_firstName,
        postId: res.post_id,
        commentId: res.comment_id,
      };
    });
  }
}
