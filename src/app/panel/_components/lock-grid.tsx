'use client';

import * as React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

import { LockCard, LockCardSkeleton } from './lock-card';
import { cn } from '~/utils';
import { useLockStore } from '~/store';
import { type SmartLock } from '~/db/schema/smart-locks';

export const lockGridStyle = cva('grid grid-cols-1 gap-8 md:grid-cols-3');

export type LockGridProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockGridStyle> & {
    smartLocks: SmartLock[];
  };

export function LockGrid({ className, smartLocks, ...props }: LockGridProps) {
  const {
    locks,
    actions: { setLocks }
  } = useLockStore();
  React.useEffect(() => {
    setLocks(smartLocks);
  }, [setLocks, smartLocks]);

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

export const lockGridSkeletonStyle = cva('grid grid-cols1 gap-8 md:grid-cols3');

export type LockGridSkeletonProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockGridSkeletonStyle> & {
    amount?: number;
  };

export function LockGridSkeleton({
  className,
  amount = 10,
  ...props
}: LockGridSkeletonProps) {
  return (
    <div className={`${cn(lockGridStyle({ className }))}`} {...props}>
      {[...Array<typeof amount>(amount)].map((_, i) => (
        <LockCardSkeleton key={i} />
      ))}
    </div>
  );
}
