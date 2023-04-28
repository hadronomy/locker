'use client';

import * as RadixSeparator from '@radix-ui/react-separator';
import { cva } from 'class-variance-authority';

import { cn } from '~/lib/utils';

export type SeparatorProps = RadixSeparator.SeparatorProps;

export const separatorStyle = cva('bg-accent mx-[15px]', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px'
    }
  }
});

export function Separator({
  className,
  orientation,
  ...props
}: SeparatorProps) {
  return (
    <RadixSeparator.Root
      className={cn(separatorStyle({ className, orientation }))}
      orientation={orientation}
      {...props}
    />
  );
}
