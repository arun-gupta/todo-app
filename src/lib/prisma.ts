import { PrismaClient } from '@prisma/client'

// Global variable to store the Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a single instance of Prisma client
// In development, use global variable to prevent multiple instances
// In production, create a new instance each time
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // Enable query logging in development
  })

// In development, store the client in global variable
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma