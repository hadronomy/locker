import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

import { mergeRouters } from '~/api/trpc';
import { edgeRouter } from '~/api/edge';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = mergeRouters(edgeRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
