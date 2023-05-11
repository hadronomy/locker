import { Lock, Unlock } from 'lucide-react';

import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';

export const metadata = {
  title: 'Locker - Panel'
};

const locks = [
  {
    name: 'Kitchen',
    description: 'Lorem ipsum',
    status: 'Locked'
  },
  {
    name: 'Bedroom',
    description: 'Lorem ipsum',
    status: 'Unlocked'
  },
  {
    name: 'Livingroom',
    description: 'Lorem ipsum',
    status: 'Locked'
  }
];

export default function PanelPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-screen-xl flex-col px-5 md:px-10">
      <div className="mt-10 flex gap-x-3">
        <Input placeholder="Search..." accept="text" disabled />
        <Button className="w-40 font-extrabold tracking-tighter">
          Add New
        </Button>
      </div>
      <div className="flex flex-col py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {locks.map((lock) => (
            <div
              className="container flex h-auto w-full flex-col gap-y-6 rounded-md border px-5 py-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
              key={lock.name}
            >
              <div className="flex flex-col place-items-center justify-center">
                {lock.status === 'Unlocked' && (
                  <Unlock
                    className="text-green-100 drop-shadow-[0_0px_50px_rgba(0,255,0,1)]"
                    size={100}
                  />
                )}
                {lock.status === 'Locked' && (
                  <Lock
                    className="text-red-100 shadow-xl drop-shadow-[0_0px_50px_rgba(255,0,0,1)]"
                    size={100}
                  />
                )}
              </div>
              <div>
                <p className="flex flex-col place-items-center justify-center">
                  <h1 className="text-xl font-extrabold">{lock.name}</h1>
                  <h2 className="text-sm text-gray-400">{lock.description}</h2>
                </p>
              </div>
              <div className="flex">
                <Button
                  variant="outline"
                  className="h-12 w-full text-lg font-extrabold tracking-tighter"
                >
                  {lock.status === 'Unlocked' && 'Lock'}
                  {lock.status === 'Locked' && 'Unlock'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
