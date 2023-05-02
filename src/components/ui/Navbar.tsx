'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '~/lib/utils';

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

export type NavbarProps = React.HTMLAttributes<HTMLHeadElement> &
  VariantProps<typeof navbarStyle> & {
    children: React.ReactNode;
  };

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
      {children}
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

export type NavbarLayoutProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof navbarLayoutStyle> & {
    children: React.ReactNode;
  };

export function NavbarLayout({
  className,
  size,
  children,
  ...props
}: NavbarLayoutProps) {
  return (
    <nav className={cn(navbarLayoutStyle({ className, size }))} {...props}>
      {children}
    </nav>
  );
}
