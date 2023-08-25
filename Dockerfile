FROM node:latest as builder
WORKDIR /app
COPY . /app
RUN yarn install
# RUN yarn test
RUN yarn build
ARG NODE_ENV=development

FROM node:latest as base
WORKDIR /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/entrypoint.sh /app/entrypoint.sh
COPY --from=builder /app/yarn.lock /app/yarn.lock
COPY --from=builder /app/package.json /app/package.json
ENV NODE_ENV="production"
RUN yarn install
ENTRYPOINT [ "entrypoint.sh" ]
EXPOSE 8000
CMD [ "yarn", "start" ]
