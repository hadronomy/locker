'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

import { buttonVariants } from './Button';
import { cn } from '~/lib/utils';
import { usePathname } from 'next/navigation';

export const navbarLoginStyle = cva('flex');

export type NavbarLoginProps = React.ComponentProps<'div'> &
  VariantProps<typeof navbarLoginStyle>;

export function NavbarLogin({ className, ...props }: NavbarLoginProps) {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  return (
    <div className={cn(navbarLoginStyle({ className }))} {...props}>
      <div className="flex items-center gap-x-4">
        {!!isSignedIn && <UserButton afterSignOutUrl="/" />}
        {pathname !== '/panel' && (
          <Link
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-28 font-bold'
            )}
            href={!isSignedIn ? '/signin' : '/panel'}
          >
            {!isSignedIn && 'Login'}
            {!!isSignedIn && 'Panel'}
          </Link>
        )}
      </div>
    </div>
  );
}
