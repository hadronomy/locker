import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

import { env } from '~/env.mjs';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
//   });

// if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const connection = connect({
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD
});

export const db = drizzle(connection);
