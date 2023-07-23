import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default authMiddleware({
  signInUrl: '/signin',
  ignoredRoutes: [],
  publicRoutes: ['/', '/pricing', '/signin(.*)', '/api(.*)'],
  afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      // Don't do anything for public routes
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);
    if (!auth.userId) {
      // User is not signed in
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
  clockSkewInMs: 50
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
