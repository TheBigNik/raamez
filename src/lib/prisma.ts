// Prisma client is generated to src/generated/prisma (see prisma/schema.prisma)
import { PrismaClient } from "@/generated/prisma";

// Re-use Prisma client across hot reloads in dev to avoid exhausting DB connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // If the generated client expects the Accelerate/Data Proxy engine, provide the URL.
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
