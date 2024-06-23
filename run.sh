#!/bin/bash

bunx prisma migrate deploy
bun run .output/server/index.mjs