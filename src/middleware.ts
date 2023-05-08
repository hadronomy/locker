import { authMiddleware } from '@clerk/nextjs';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  publicRoutes: ['/']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)']
};
