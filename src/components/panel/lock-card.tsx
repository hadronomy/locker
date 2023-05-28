'use client';

import * as React from 'react';
import { Lock, Unlock, Trash } from 'lucide-react';
import { type VariantProps, cva } from 'class-variance-authority';

import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { trpc } from '~/utils/trpc';

export const lockCardStyle = cva(
  'container flex h-auto w-full flex-col gap-y-6 rounded-md border px-5 py-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_5px_5px_10px_4px_rgba(45,78,255,0.05)]'
);

export type LockCardProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockCardStyle> & {
    lockId: number;
    name: string;
    description: string;
    locked: boolean;
  };

export function LockCard({
  className,
  lockId,
  name,
  description,
  locked,
  ...props
}: LockCardProps) {
  const deleteLock = trpc.lock.remove.useMutation();

  const handleDelete = () => {
    deleteLock.mutate({ id: lockId });
  };

  return (
    <div className={`${cn(lockCardStyle({ className }))}`} {...props}>
      <div className="flex flex-col place-items-center justify-center">
        {!locked && (
          <Unlock
            className="text-green-100 drop-shadow-[0_0px_50px_rgba(0,255,0,1)]"
            size={100}
          />
        )}
        {locked && (
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
        >
          {locked && 'Lock'}
          {!locked && 'Unlock'}
        </Button>
        <Button
          className="h-12 w-[50px] flex-grow-[0.5] text-lg font-extrabold tracking-tighter"
          variant="destructive"
          onClick={handleDelete}
        >
          <Trash size={32} />
        </Button>
      </div>
    </div>
  );
}
