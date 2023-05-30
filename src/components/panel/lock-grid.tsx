'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { LockCard } from '~/components/panel/lock-card';
import { trpc } from '~/utils/trpc';
import { cn } from '~/lib/utils';
import { useLockStore } from '~/store';

export const lockGridStyle = cva('grid grid-cols-1 gap-8 md:grid-cols-3');

export type LockGridProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockGridStyle>;

export function LockGrid({ className, ...props }: LockGridProps) {
  const { locks, setLocks } = useLockStore();
  trpc.lock.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setLocks(data);
    }
  });

  return (
    <div className={`${cn(lockGridStyle({ className }))}`} {...props}>
      {!!locks &&
        locks.map((lock) => (
          <LockCard
            key={lock.id}
            lockId={lock.id}
            name={lock.name}
            description={lock.description}
            locked={lock.locked}
            owner={lock.owner}
          />
        ))}
    </div>
  );
}
