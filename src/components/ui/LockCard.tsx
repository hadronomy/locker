import * as React from 'react';
import { Lock, Unlock, Trash } from 'lucide-react';
import { type VariantProps, cva } from 'class-variance-authority';

import { Button } from '~/components/ui/Button';
import { cn } from '~/lib/utils';

export const lockCardStyle = cva(
  'container flex h-auto w-full flex-col gap-y-6 rounded-md border px-5 py-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'
);

export type LockCardProps = React.ComponentProps<'div'> &
  VariantProps<typeof lockCardStyle> & {
    name: string;
    description: string;
    status: 'Locked' | 'Unlocked';
  };

export default function LockCard({ className, name, status }: LockCardProps) {
  return (
    <div className={`${cn(lockCardStyle({ className }))}`} key={name}>
      <div className="flex flex-col place-items-center justify-center">
        {status === 'Unlocked' && (
          <Unlock
            className="text-green-100 drop-shadow-[0_0px_50px_rgba(0,255,0,1)]"
            size={100}
          />
        )}
        {status === 'Locked' && (
          <Lock
            className="text-red-100 shadow-xl drop-shadow-[0_0px_50px_rgba(255,0,0,1)]"
            size={100}
          />
        )}
      </div>
      <div>
        <div className="flex flex-col place-items-center justify-center">
          <h1 className="text-xl font-extrabold">{status}</h1>
          <h2 className="text-sm text-gray-400">{}</h2>
        </div>
      </div>
      <div className="flex gap-x-2">
        <Button
          variant="outline"
          className="h-12 w-full text-lg font-extrabold tracking-tighter"
        >
          {status === 'Unlocked' && 'Lock'}
          {status === 'Locked' && 'Unlock'}
        </Button>
        <Button
          className="h-12 w-[50px] flex-grow-[0.5] text-lg font-extrabold tracking-tighter"
          variant="destructive"
        >
          <Trash size={32} />
        </Button>
      </div>
    </div>
  );
}
