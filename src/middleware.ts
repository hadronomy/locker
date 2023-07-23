import { authMiddleware } from '@clerk/nextjs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  ignoredRoutes: [],
  publicRoutes: ['/', '/pricing'],
  apiRoutes: [
    '/api/trpc/lock.getAll',
    '/api/trpc/lock.update',
    '/api/trpc/lock.add',
    '/api/trpc/lock.remove'
  ],
  clockSkewInMs: 50
});

export const config = {
  matcher: ['/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)', '/']
};
