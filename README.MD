
# Rise Backend Test

## Stack
 - ExpressJS
 - Postgres(via Prisma)
 - Jest (for unit tests)

## Postman Docs
The postman documentation is published at: https://documenter.getpostman.com/view/5509541/2s9Y5YR2KC

## Deployed Version
The project is deployed on render.com and the the base URL is: https://rise-be.onrender.com/

## Included
- [x] Create and retrieve users
- [x] Create post for a user and retrieve all posts for a user
- [x] Create comment for a post and retrieve all comments for a post
- [x] API Token based authentication middleware
- [x] Dockerfile for containerization
- [x] Docker Compose file for easy dev environment
- [x] Query Optimization

## Performance Solution
The final solution below utilizes the efficiency of subqueries.
This solution has expanded on the LEFT JOIN clause for the comment ensuring they are 
optimized for every user matched in the base query
```sql
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
```

## Setup

Install deps:
`yarn install`

Setup Environment Variables
`cat .env.sample > .env`

Start dev server
`yarn dev`

To run tests:
`yarn test`

To run with Docker Compose
`docker compose up`





