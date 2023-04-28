import React from 'react';
import { cva } from 'class-variance-authority';
import { UserButton } from '@clerk/nextjs/app-beta';
import Link from 'next/link';

import { cn } from '~/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from './NavigationMenu';
import { Button } from './Button';
import { Separator } from './Separator';

export type NavBarProps = React.HTMLAttributes<HTMLHeadElement> & {
  links: {
    label: string;
    href: string;
  }[];
};

export const navbarStyle = cva(
  'sticky top-0 max-h-20 w-full border-b bg-background/60 backdrop-blur-[8px]'
);

export function Navbar({ className, links, ...props }: NavBarProps) {
  return (
    <header className={cn(navbarStyle({ className }))} {...props}>
      <nav className="mx-auto flex max-h-20 max-w-screen-xl items-center justify-between p-6">
        <div className="inline-flex">
          <h1 className="text-xl font-extrabold tracking-tighter">Locker</h1>
        </div>
        <NavigationMenu className="items-end justify-end">
          <NavigationMenuList>
            {links.map((link) => (
              <NavigationMenuItem key={link.label}>
                <Link
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Separator className="h-[30px]" orientation="vertical" decorative />
        <div className="flex">
          <UserButton />
          <Button className="font-bold">
            <Link href="/signin" role="none">
              Login
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
