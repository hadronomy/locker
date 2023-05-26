'use client';

import * as React from 'react';
import { useAuth } from '@clerk/nextjs';
import { cva } from 'class-variance-authority';

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

export const lockActionBarStyle = cva('mt-10 flex gap-x-3');

export type LockActionProps = React.ComponentProps<'div'>;

export function LockActionBar({ className, ...props }: LockActionProps) {
  const addLock = trpc.lock.add.useMutation();
  const { userId } = useAuth();

  return (
    <div className={`${cn(lockActionBarStyle({ className }))}`} {...props}>
      <Input placeholder="Search..." accept="text" disabled />
      <AlertDialog>
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
          <form
            onSubmit={(_) => {
              // addLock.mutate({
              //   name: 'Kitchen',
              //   description: 'what',
              //   locked: false,
              //   owner: 'Someone'
              // });
            }}
          >
            <div className="mb-10 w-full">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="name" id="name" placeholder="Lock Name" />
              </div>
              <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  type="description"
                  id="description"
                  placeholder="Description"
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
