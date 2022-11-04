import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma_client: PrismaClient | undefined;
}

let prisma: PrismaClient

if (process.env.NODE_ENV !== "development") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma_client) {
    global.__prisma_client = new PrismaClient();
  }
  prisma = global.__prisma_client;
}

export { prisma }