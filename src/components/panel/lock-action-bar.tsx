'use client';

import * as React from 'react';
import { useAuth } from '@clerk/nextjs';
import { cva } from 'class-variance-authority';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button, buttonVariants } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel
} from '~/components/ui/alert-dialog';
import { cn } from '~/lib/utils';
import { Label } from '~/components/ui/label';
import { trpc } from '~/utils/trpc';
import { useLockStore } from '~/store';

export const lockActionBarStyle = cva('mt-10 flex gap-x-3');

export type LockActionProps = React.ComponentProps<'div'>;

const lockFormSchema = z.object({
  lockName: z.string().max(15),
  description: z.string().max(20)
});

export function LockActionBar({ className, ...props }: LockActionProps) {
  const addLock = trpc.lock.add.useMutation();
  const { addLock: addStoreLock } = useLockStore();
  const lockForm = useForm<z.infer<typeof lockFormSchema>>({
    resolver: zodResolver(lockFormSchema)
  });
  const { userId } = useAuth();
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  function onAddLock({
    lockName,
    description
  }: z.infer<typeof lockFormSchema>) {
    if (!userId) return;
    addLock.mutate(
      {
        name: lockName,
        description: description,
        locked: true,
        owner: userId
      },
      {
        onSuccess: (lock) => {
          addStoreLock(lock);
        }
      }
    );
    setDialogOpen(false);
  }

  // TODO: Use Dialog instead of AlertDialog
  return (
    <div className={`${cn(lockActionBarStyle({ className }))}`} {...props}>
      <Input placeholder="Search..." accept="text" disabled />
      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger
          className={`${cn(
            buttonVariants(),
            'w-40 font-extrabold tracking-tighter'
          )}`}
        >
          Add New
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add a New Lock</AlertDialogTitle>
          </AlertDialogHeader>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={lockForm.handleSubmit(onAddLock)}>
            <div className="mb-10 w-full">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="name"
                  id="name"
                  placeholder="Lock Name"
                  {...lockForm.register('lockName', { required: true })}
                />
              </div>
              <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  type="description"
                  id="description"
                  placeholder="Description"
                  {...lockForm.register('description', { required: true })}
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Continue</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
