'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { LockCard } from '~/components/panel/LockCard';
import { trpc } from '~/utils/trpc';
import { cn } from '~/lib/utils';

export const lockGridStyle = cva('grid grid-cols-1 gap-8 md:grid-cols-3');

export type LockGridProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockGridStyle>;

export function LockGrid({ className }: LockGridProps) {
  const { data } = trpc.lock.getAll.useQuery();
  return (
    <div className={`${cn(lockGridStyle({ className }))}`}>
      {!!data &&
        data.map((data) => (
          <LockCard
            key={data.id}
            lockId={data.id}
            name={data.name}
            description={data.description}
            locked={data.locked}
          />
        ))}
    </div>
  );
}
