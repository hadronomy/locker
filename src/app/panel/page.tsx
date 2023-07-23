import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { LockActionBar } from '~/components/panel/lock-action-bar';
import { LockGrid } from '~/components/panel/lock-grid';
import { Button } from '~/components/ui/button';

export const runtime = 'edge';

export const metadata = {
  title: 'Locker - Panel'
};

export default function PanelPage() {
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
          <React.Suspense fallback={<p>Loading...</p>}>
            <LockGrid />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}
