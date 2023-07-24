import { z } from 'zod';
import { eq } from 'drizzle-orm';
import invariant from 'tiny-invariant';
import { createId } from '@paralleldrive/cuid2';

import { createTRPCRouter, protectedProcedure } from '~/api/trpc';
import { smartLocks } from '~/db/schema/smart-locks';

export const lockRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        locked: z.boolean(),
        owner: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      const id = createId();
      return ctx.db.transaction(async (tx) => {
        await tx.insert(smartLocks).values({ id, ...input });
        const [lock] = await tx
          .select()
          .from(smartLocks)
          .where(eq(smartLocks.id, id));
        invariant(
          lock !== undefined,
          'could not find the inserted lock in the database'
        );
        return lock;
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select()
      .from(smartLocks)
      .where(eq(smartLocks.owner, ctx.auth.userId));
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          name: z.string(),
          description: z.string(),
          locked: z.boolean(),
          owner: z.string()
        })
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.transaction(async (tx) => {
        await tx
          .update(smartLocks)
          .set(input.data)
          .where(eq(smartLocks.id, input.id));
        const [lock] = await tx
          .select()
          .from(smartLocks)
          .where(eq(smartLocks.id, input.id));
        invariant(
          lock !== undefined,
          'could not find the updated lock in the database'
        );
        return lock;
      });
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(smartLocks).where(eq(smartLocks.id, input.id));
      return input.id;
    })
});
