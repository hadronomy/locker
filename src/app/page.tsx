import Link from 'next/link';

import { Button } from '~/components/ui/Button';
import { Navbar } from '~/components/ui/Navbar';

export const metadata = {
  title: 'Locker - Home'
};

const navbarLinks = [
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Pricing',
    href: '/pricing'
  }
];

export default function HomePage() {
  return (
    <>
      <Navbar links={navbarLinks} />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Work <span className="text-[hsl(280,100%,70%)]">In Progress</span>
          </h1>
        </div>
      </main>
    </>
  );
}
