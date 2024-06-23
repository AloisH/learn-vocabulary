# syntax = docker/dockerfile:1

FROM oven/bun:1 as base

ENV PORT=$PORT

COPY package.json bun.lockb .
RUN bun install

COPY . .

USER bun
EXPOSE 3000/tcp
CMD [ "./run.sh" ]