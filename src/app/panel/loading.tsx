import { LockActionBar } from './_components/lock-action-bar';
import { LockGridSkeleton } from './_components/lock-grid';

export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-5 md:px-10">
      <LockActionBar />
      <div className="flex flex-col py-8">
        <LockGridSkeleton amount={6} />
      </div>
    </main>
  );
}
