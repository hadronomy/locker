import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

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
      return ctx.prisma.smartLock.create({
        data: { ...input }
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.smartLock.findMany({ where: { owner: ctx.auth.userId } });
  }),
  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.smartLock.delete({ where: { id: input.id } });
    })
});
