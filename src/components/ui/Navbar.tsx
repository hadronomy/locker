'use client';

import * as React from 'react';
import Link from 'next/link';
import { type VariantProps, cva } from 'class-variance-authority';
import { z } from 'zod';

import { cn } from '~/lib/utils';
import { type NavigationMenuProps } from '@radix-ui/react-navigation-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from './NavigationMenu';

export const navbarStyle = cva(
  'z-20 w-full bg-background/60 backdrossssp-blur-[8px]',
  {
    variants: {
      placement: {
        sticky: 'sticky top-0',
        fixed: 'fixed top-0',
        static: 'static'
      },
      border: {
        none: 'border-0',
        bottom: 'border-b',
        onScroll: ''
      }
    },
    defaultVariants: {
      border: 'bottom',
      placement: 'sticky'
    }
  }
);

export type NavbarProps = React.ComponentProps<'header'> &
  VariantProps<typeof navbarStyle>;

const navbarContext = React.createContext({});

export function Navbar({
  className,
  placement,
  border,
  children,
  ...props
}: NavbarProps) {
  return (
    <header
      className={cn(navbarStyle({ className, placement, border }))}
      {...props}
    >
      <navbarContext.Provider value={{}}>{children}</navbarContext.Provider>
    </header>
  );
}

export const navbarLayoutStyle = cva(
  'mx-auto flex items-center justify-between px-6 py-4',
  {
    variants: {
      size: {
        sm: 'max-w-screen-sm',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl'
      }
    },
    defaultVariants: {
      size: 'xl'
    }
  }
);

export type NavbarLayoutProps = React.ComponentProps<'div'> &
  VariantProps<typeof navbarLayoutStyle>;

export function NavbarLayout({
  className,
  size,
  children,
  ...props
}: NavbarLayoutProps) {
  const {} = React.useContext(navbarContext);

  return (
    <nav className={cn(navbarLayoutStyle({ className, size }))} {...props}>
      {children}
    </nav>
  );
}

export const NavbarLink = z.discriminatedUnion('type', [
  z.object({
    label: z.string().max(15),
    type: z.literal('link'),
    href: z.string().nonempty()
  }),
  z.object({
    label: z.string().max(15),
    type: z.literal('dropdown'),
    content: z.object({
      links: z
        .array(
          z.object({
            label: z.string().max(15),
            href: z.string().nonempty()
          })
        )
        .nonempty()
    })
  })
]);

export type NavbarLink = z.infer<typeof NavbarLink>;

export const navbarLinksStyle = cva('relative', { variants: {} });

export type NavbarLinksProps = NavigationMenuProps & {
  links: NavbarLink[];
} & VariantProps<typeof navbarLinksStyle>;

export function NavbarLinks({ className, links, ...props }: NavbarLinksProps) {
  NavbarLink.array().parse(links);
  return (
    <NavigationMenu className={cn(navbarLinksStyle({ className }))} {...props}>
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.label}>
            {link.type === 'dropdown' && (
              <>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {link.content.links.map((dropdownLink) => (
                    <Link
                      key={dropdownLink.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      href={dropdownLink.label}
                    >
                      {dropdownLink.label}
                    </Link>
                  ))}
                </NavigationMenuContent>
              </>
            )}
            {link.type === 'link' && (
              <Link
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                href={link.href}
              >
                {link.label}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
