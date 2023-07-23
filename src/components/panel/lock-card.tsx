'use client';

import * as React from 'react';
import { Lock, Unlock, Trash } from 'lucide-react';
import { type VariantProps, cva } from 'class-variance-authority';

import { Button } from '~/components/ui/button';
import { cn } from '~/utils/cn';
import { trpc } from '~/utils/trpc';
import { useLockStore } from '~/store';

export const lockCardStyle = cva(
  'container overflow-hidden flex h-auto w-full flex-col gap-y-6 rounded-md border px-5 py-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_5px_5px_10px_4px_rgba(45,78,255,0.05)]'
);

export type LockCardProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockCardStyle> & {
    lockId: string;
    name: string;
    description: string;
    locked: boolean;
    owner: string;
  };

export function LockCard({
  className,
  lockId,
  name,
  description,
  locked,
  owner,
  ...props
}: LockCardProps) {
  const deleteLock = trpc.lock.remove.useMutation();
  const updateLock = trpc.lock.update.useMutation();
  const { removeLock, toggleLock } = useLockStore();

  function handleDelete() {
    deleteLock.mutate(
      { id: lockId },
      {
        onSuccess: (_) => {
          removeLock(lockId);
        }
      }
    );
  }

  function handleToggleLock() {
    updateLock.mutate(
      {
        id: lockId,
        data: {
          name,
          description,
          locked: !locked,
          owner
        }
      },
      {
        onSuccess: (lock) => {
          // setLock({ ...lock, locked: !lock.locked });
          toggleLock(lock.id);
        }
      }
    );
  }

  return (
    <div className={`${cn(lockCardStyle({ className }))}`} {...props}>
      <div className="flex flex-col place-items-center justify-center">
        {locked && (
          <Unlock
            className="text-green-100 drop-shadow-[0_0px_50px_rgba(0,255,0,1)]"
            size={100}
          />
        )}
        {!locked && (
          <Lock
            className="text-red-100 shadow-xl drop-shadow-[0_0px_50px_rgba(255,0,0,1)]"
            size={100}
          />
        )}
      </div>
      <div>
        <div className="flex flex-col place-items-center justify-center">
          <h1 className="text-xl font-extrabold">{name}</h1>
          <h2 className="text-sm text-gray-400">{description}</h2>
        </div>
      </div>
      <div className="flex gap-x-2">
        <Button
          variant="outline"
          className="h-12 w-full text-lg font-extrabold tracking-tighter"
          onClick={handleToggleLock}
        >
          {locked && 'Lock'}
          {!locked && 'Unlock'}
        </Button>
        <Button
          variant="destructive"
          className="h-12 w-[50px] flex-grow-[0.5] text-lg font-extrabold tracking-tighter"
          onClick={handleDelete}
        >
          <Trash size={32} />
        </Button>
      </div>
    </div>
  );
}
