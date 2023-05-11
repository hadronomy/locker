import { authMiddleware } from '@clerk/nextjs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  ignoredRoutes: [],
  publicRoutes: ['/', '/signin', '/signup']
});

export const config = {
  matcher: ['/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)', '/']
};
