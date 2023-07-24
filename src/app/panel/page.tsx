import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { LockActionBar } from './_components/lock-action-bar';
import { LockGrid } from './_components/lock-grid';
import { Button } from '~/components/ui/button';

import { api } from '~/trpc/server';

export const runtime = 'edge';

export const metadata = {
  title: 'Locker - Panel'
};

export default async function PanelPage() {
  const locks = await api.smartLock.getAll.query();
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-5 md:px-10">
      <LockActionBar />
      <div className="flex flex-col py-8">
        <ErrorBoundary
          fallback={
            <div>
              Oops!
              <Button variant="destructive">Retry</Button>
            </div>
          }
        >
          <LockGrid smartLocks={locks} />
        </ErrorBoundary>
      </div>
    </main>
  );
}
