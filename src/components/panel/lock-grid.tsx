'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { LockCard } from '~/components/panel/lock-card';
// import { api } from '~/trpc/client';
import { cn } from '~/utils';
import { useLockStore } from '~/store';

export const lockGridStyle = cva('grid grid-cols-1 gap-8 md:grid-cols-3');

export type LockGridProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockGridStyle>;

export function LockGrid({ className, ...props }: LockGridProps) {
  const { locks } = useLockStore();
  // const locks = await api.smartLock.getAll.query();
  // setLocks(locks);

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
