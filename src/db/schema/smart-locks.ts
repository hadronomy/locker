import {
  boolean,
  mysqlTable,
  timestamp,
  varchar
} from 'drizzle-orm/mysql-core';
import { type InferModel, sql } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const smartLocks = mysqlTable('smart_lock', {
  id: varchar('id', { length: 256 }).primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  locked: boolean('locked').default(false).notNull(),
  owner: varchar('owner', { length: 256 }).notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull()
});

export const insertSmartLockSchema = createInsertSchema(smartLocks, {
  id: z.string().optional()
});
export const selectSmartLockSchema = createSelectSchema(smartLocks);

export type SmartLock = InferModel<typeof smartLocks>;
export type InsertSmartLock = z.infer<typeof insertSmartLockSchema>;
export type SelectSmartLock = z.infer<typeof selectSmartLockSchema>;
