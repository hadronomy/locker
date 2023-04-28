'use client';

import { cva } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import { UserButton } from '@clerk/nextjs/app-beta';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

import { Button } from './Button';
import { cn } from '~/lib/utils';

type NavbarLoginProps = HTMLAttributes<HTMLDivElement>;

export const navbarLoginStyle = cva('flex');

export function NavbarLogin({ className, ...props }: NavbarLoginProps) {
  const { isSignedIn } = useAuth();

  return (
    <div className={cn(navbarLoginStyle({ className }))} {...props}>
      <div className="flex items-center gap-x-6">
        <UserButton />
        <Button className="w-28 font-bold">
          <Link href={!isSignedIn ? '/signin' : '/panel'} role="none">
            {!isSignedIn && 'Login'}
            {!!isSignedIn && 'Panel'}
          </Link>
        </Button>
      </div>
    </div>
  );
}