import { lockRouter } from '~/api/routers/lock';
import { createTRPCRouter } from '~/api/trpc';

export const edgeRouter = createTRPCRouter({
  smartLock: lockRouter
});
