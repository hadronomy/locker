'use client';

import * as React from 'react';
import { useAuth } from '@clerk/nextjs';
import { cva } from 'class-variance-authority';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import invariant from 'tiny-invariant';

import { Button, buttonVariants } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form';

import { cn } from '~/utils/cn';
import { trpc } from '~/utils/trpc';
import { useLockStore } from '~/store';

export const lockActionBarStyle = cva('mt-10 flex gap-x-3');

export type LockActionProps = React.ComponentProps<'div'>;

const lockFormSchema = z.object({
  lockName: z
    .string()
    .min(3, {
      message: 'Lock name must be at least 3 characters'
    })
    .max(15, {
      message: 'Lock name must be at max 15 characters'
    }),
  description: z
    .string()
    .min(3, {
      message: 'Description must be at least 3 characters'
    })
    .max(20, {
      message: 'Description must be at max 20 characters'
    })
});

export function LockActionBar({ className, ...props }: LockActionProps) {
  const addLockMutation = trpc.lock.add.useMutation();
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
    invariant(userId !== undefined, 'the userId is undefined');
    invariant(userId !== null, 'the userId is null');
    addLockMutation.mutate(
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

  return (
    <div className={`${cn(lockActionBarStyle({ className }))}`} {...props}>
      <Input placeholder="Search..." accept="text" disabled />
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          className={`${cn(
            buttonVariants(),
            'w-40 font-extrabold tracking-tighter'
          )}`}
        >
          Add New
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Lock</DialogTitle>
          </DialogHeader>
          <Form {...lockForm}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={lockForm.handleSubmit(onAddLock)}>
              <div className="mb-10 w-full space-y-4">
                <FormField
                  control={lockForm.control}
                  name="lockName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lock Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My lovely lock" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the new lock
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={lockForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="It REALLY is a lovely lock"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
