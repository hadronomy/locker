import Link from 'next/link';

import { Button } from '~/components/ui/button';

export const metadata = {
  title: 'Locker - Home'
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Work <span className="text-[hsl(280,100%,70%)]">In Progress</span>
        </h1>
      </div>
      <div className="container flex items-center justify-center gap-x-4 text-white">
        <Button variant="link">
          <Link href="/signin">Login</Link>
        </Button>
        <Button variant="link">
          <Link href="/signup">Register</Link>
        </Button>
        <Button variant="link">
          <Link href="/panel">Panel</Link>
        </Button>
      </div>
    </main>
  );
}
